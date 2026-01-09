import { Produto } from "../../domain/models/class/Produto";
import { IProdutoRepository } from "../../domain/models/interfaces/IProdutoRepository";
import { IProdutoService } from "../interfaces/IProdutoService";

/**
 * Service de gestão de produtos.
 * Implementa a lógica de negócio para operações com produtos do catálogo.
 */
export class ProdutoService implements IProdutoService {
  /**
   * Cria uma nova instância do ProdutoService.
   * @param produtoRepository - Repositório de produtos para persistência de dados
   */
  constructor(private produtoRepository: IProdutoRepository) { }

  async listarProdutos(): Promise<Produto[]> {
    const todosOsProdutos = await this.produtoRepository.listarTodos();
    // Futuramente, podemos adicionar lógicas como filtrar por estoque, etc.
    return todosOsProdutos.filter(produto => produto.disponivel);
  }

  /**
   * Busca um produto específico pelo seu ID.
   * @param id - ID do produto a ser buscado
   * @returns Promise que resolve para o produto encontrado ou null
   */
  async buscarProdutoPorId(id: string): Promise<Produto | null> {
    return this.produtoRepository.buscarPorId(id);
  }

  /**
   * Cria um novo produto no catálogo.
   * @param nome - Nome do produto
   * @param descricao - Descrição detalhada do produto
   * @param preco - Preço do produto
   * @param categoria - Categoria à qual o produto pertence
   * @param imagem - URL da imagem do produto
   * @param disponivel - Se o produto está disponível para venda
   * @returns Promise que resolve para o produto criado
   */
  async criarProduto(
    nome: string,
    descricao: string,
    preco: number,
    categoria: string,
    imagem: string,
    disponivel: boolean
  ): Promise<Produto> {
    const novoProduto = new Produto(
      '', // ID será gerado pelo banco
      nome,
      descricao,
      preco,
      categoria,
      imagem,
      disponivel
    );
    return this.produtoRepository.criar(novoProduto);
  }

  /**
   * Atualiza um produto existente com novos dados.
   * @param id - ID do produto a ser atualizado
   * @param dados - Objeto com os campos a serem atualizados
   * @returns Promise que resolve para o produto atualizado ou null se não encontrado
   */
  async atualizarProduto(
    id: string,
    dados: Partial<{ nome: string; descricao: string; preco: number; categoria: string; disponivel: boolean, imagem: string }>
  ): Promise<Produto | null> {
    const produtoExistente = await this.produtoRepository.buscarPorId(id);
    if (!produtoExistente) {
      return null;
    }

    //Atualiza o produto se existir
    produtoExistente.atualizar(dados);

    // Persiste a entidade atualizada
    return this.produtoRepository.atualizar(id, produtoExistente);
  }

  /**
   * Deleta um produto do catálogo.
   * @param id - ID do produto a ser deletado
   * @returns Promise que resolve para true se deletado com sucesso, false se não encontrado
   */
  async deletarProduto(id: string): Promise<boolean> {
    const produto = await this.produtoRepository.buscarPorId(id);
    if (!produto) return false;

    await this.produtoRepository.deletar(id);
    return true;
  }
}