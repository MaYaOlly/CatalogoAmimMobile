import { FormaPagamento, Pedido } from '../../domain/models/class/Pedido';
import { ItemPedido } from '../../domain/models/class/ItemPedido';
import { IPedidoRepository } from '../../domain/models/interfaces/IPedidoRepository';
import { IProdutoRepository } from '../../domain/models/interfaces/IProdutoRepository';
import { IUsuarioRepository } from '../../domain/models/interfaces/IUsuarioRepository';
import { CupomService } from './CupomService';
import { CriarPedidoDTO, IPedidoService } from '../../domain/models/interfaces/IPedidoService';


export class PedidoService implements IPedidoService {
  /**
   * Cria uma nova instância do PedidoService.
   * @param pedidoRepository - Repositório de pedidos para persistência de dados
   * @param produtoRepository - Repositório de produtos para validação de itens
   * @param usuarioRepository - Repositório de usuários para validação
   * @param cupomService - Service de cupons para aplicação de descontos
   */
  constructor(
    private pedidoRepository: IPedidoRepository,
    private produtoRepository: IProdutoRepository,
    private usuarioRepository: IUsuarioRepository,
    private cupomService: CupomService  
  ) {}

  /**
   * Cria um novo pedido validando usuário, produtos e cupom.
   * @param dados - Dados do pedido a ser criado
   * @returns Promise que resolve para o pedido criado
   * @throws {Error} Se o usuário não for encontrado, produto não existir ou não estiver disponível
   */
  async criarPedido(dados: CriarPedidoDTO): Promise<Pedido> {
    // 1. Validar a existência do usuário
    const usuario = await this.usuarioRepository.buscarPorId(dados.usuarioId);
    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }

    // 2. Validar e buscar cada produto, criando os Itens do Pedido
    const itensPedido: ItemPedido[] = [];
    for (const item of dados.itens) {
      const produto = await this.produtoRepository.buscarPorId(item.produtoId);
      if (!produto) {
        throw new Error(`Produto com ID ${item.produtoId} não encontrado.`);
      }
      if (!produto.disponivel) {
        throw new Error(`O produto "${produto.nome}" não está disponível no momento.`);
      }
      // Criamos a entidade ItemPedido, "congelando" o preço do produto no momento da compra
      const novoItem = new ItemPedido(
        '', // O ID será gerado pelo banco de dados
        produto,
        item.quantidade,
        produto.preco, // Preço no momento da compra
        '' // O ID do pedido será associado pelo repositório
      );
      itensPedido.push(novoItem);
    }

    // 3. Criar a entidade Pedido com os dados validados
    const novoPedido = new Pedido(
      '', // O ID será gerado pelo banco
      dados.usuarioId,
      itensPedido,
      dados.formaPagamento,
      'realizado', // Status inicial do pedido
      new Date()
    );

    // 4. Se um código de cupom foi fornecido, buscar e aplicar
    if (dados.cupomCodigo) {
      const cupom = await this.cupomService.validarCupom(dados.cupomCodigo);
      if (!cupom || cupom.ativo != true) {
        throw new Error('O cupom de desconto informado é inválido ou não esta mais ativo.');
      }
      // A entidade Pedido é responsável por validar e aplicar o cupom
      novoPedido.aplicarCupom(cupom);
      // Após o uso, desativar o cupom
      await this.cupomService.desativarCupom(cupom.codigo);
    }

    // 5. Persistir o pedido completo usando o repositório
    return this.pedidoRepository.criarPedido(novoPedido);
  }

  /**
   * Busca um pedido pelo seu ID.
   * @param id - ID do pedido a ser buscado
   * @returns Promise que resolve para o pedido encontrado
   * @throws {Error} Se o pedido não for encontrado
   */
  async buscarPedidoPorId(id: string): Promise<Pedido | null> {
    const pedido = await this.pedidoRepository.buscarPorId(id);
    if (!pedido) {
      throw new Error('Pedido não encontrado.');
    }
    return pedido;
  }

  /**
   * Lista todos os pedidos de um usuário.
   * @param usuarioId - ID do usuário cujos pedidos serão listados
   * @returns Promise que resolve para um array de pedidos do usuário
   */
  async listarPedidosPorUsuario(usuarioId: string): Promise<Pedido[]> {
    return this.pedidoRepository.listarPorUsuario(usuarioId);
  }

  /**
   * Confirma um pedido alterando seu status para "confirmado".
   * @param id - ID do pedido a ser confirmado
   * @returns Promise que resolve para o pedido confirmado
   * @throws {Error} Se o pedido não for encontrado
   */
  async confirmarPedido(id: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.buscarPorId(id);
    if (!pedido) {
      throw new Error('Pedido não encontrado.');
    }
    pedido.confirmar(); // Lógica de negócio na entidade
    return this.pedidoRepository.atualizarStatus(id, pedido.status);
  }

  /**
   * Cancela um pedido alterando seu status para "cancelado".
   * @param id - ID do pedido a ser cancelado
   * @returns Promise que resolve para o pedido cancelado
   * @throws {Error} Se o pedido não for encontrado
   */
  async cancelarPedido(id: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.buscarPorId(id);
    if (!pedido) {
      throw new Error('Pedido não encontrado.');
    }
    pedido.cancelar(); // Lógica de negócio na entidade
    return this.pedidoRepository.atualizarStatus(id, pedido.status);
  }
}