"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPedidoRepository = void 0;
const Pedido_1 = require("../../domain/models/class/Pedido");
const ItemPedido_1 = require("../../domain/models/class/ItemPedido");
const Produto_1 = require("../../domain/models/class/Produto");
const Cupom_1 = require("../../domain/models/class/Cupom");
/**
 * Implementação de PrismaPedidoRepository usando Prisma ORM.
 * Fornece acesso aos dados de pedidos no banco de dados.
 */
class PrismaPedidoRepository {
    /**
     * Cria uma nova instância do repositório de pedidos.
     * @param prisma - Cliente Prisma para acesso ao banco de dados
     */
    constructor(prisma) {
        this.prisma = prisma;
    }
    // Método auxiliar para buscar um pedido com todas as suas relações
    findCompletoById(id) {
        return this.prisma.pedido.findUnique({
            where: { id },
            include: {
                // Não precisamos mais do 'usuario' aqui para o mapeamento principal
                cupom: true,
                itens: {
                    include: {
                        produto: true,
                    },
                },
            },
        });
    }
    /**
     * Método privado para mapear dados do Prisma para a entidade de domínio Pedido.
     * Reconstrói todos os objetos de domínio a partir dos dados persistidos.
     * @param prismaPedido - Dados do pedido retornados pelo Prisma
     * @returns Entidade Pedido do domínio ou null
     * @private
     */
    mapToDomain(prismaPedido) {
        if (!prismaPedido) {
            return null;
        }
        const itens = prismaPedido.itens.map(item => {
            const produto = new Produto_1.Produto(item.produto.id, item.produto.nome, item.produto.descricao, item.produto.preco, item.produto.categoria, item.produto.imagemUrl, item.produto.disponivel);
            return new ItemPedido_1.ItemPedido(item.id, produto, item.quantidade, item.precoUnitario, item.pedidoId);
        });
        // Agora passamos o `usuarioId` diretamente, como string
        const pedido = new Pedido_1.Pedido(prismaPedido.id, prismaPedido.usuarioId, // Alterado de objeto para ID
        itens, prismaPedido.formaPagamento, prismaPedido.status, prismaPedido.data);
        if (prismaPedido.cupom) {
            const cupom = new Cupom_1.Cupom(prismaPedido.cupom.id, prismaPedido.cupom.codigo, prismaPedido.cupom.tipoDesconto, prismaPedido.cupom.valorDesconto, prismaPedido.cupom.dataValidade, prismaPedido.cupom.ativo);
            pedido.aplicarCupom(cupom);
        }
        return pedido;
    }
    /**
     * Cria um novo pedido no banco de dados.
     * @param pedido - Entidade Pedido a ser persistida
     * @returns Promise que resolve para o pedido criado com ID gerado
     */
    async criarPedido(pedido) {
        const novoPedidoPrisma = await this.prisma.pedido.create({
            data: {
                // Conectamos usando o `usuarioId` da entidade Pedido
                usuario: { connect: { id: pedido.usuarioID } }, // Supondo que o getter seja `usuarioID`
                status: pedido.status,
                formaPagamento: pedido.pagamento,
                precoTotal: pedido.precoTotal,
                data: pedido.data,
                cupom: pedido.cupom ? { connect: { id: pedido.cupom.id } } : undefined,
                itens: {
                    create: pedido.itens.map(item => ({
                        quantidade: item.quantidade,
                        precoUnitario: item.precoUnitario,
                        produto: { connect: { id: item.produto.id } },
                    })),
                },
            },
        });
        // Buscamos o pedido recém-criado para retornar o objeto de domínio completo
        const pedidoCompleto = await this.findCompletoById(novoPedidoPrisma.id);
        return this.mapToDomain(pedidoCompleto);
    }
    /**
     * Busca um pedido no banco de dados pelo seu ID.
     * @param id - ID do pedido a ser buscado
     * @returns Promise que resolve para o pedido encontrado ou null
     */
    async buscarPorId(id) {
        const prismaPedido = await this.findCompletoById(id);
        return this.mapToDomain(prismaPedido);
    }
    /**
     * Lista todos os pedidos de um usuário específico.
     * Os pedidos são ordenados por data em ordem decrescente (mais recentes primeiro).
     * @param usuarioId - ID do usuário cujos pedidos serão listados
     * @returns Promise que resolve para um array de pedidos do usuário
     */
    async listarPorUsuario(usuarioId) {
        const prismaPedidos = await this.prisma.pedido.findMany({
            where: { usuarioId },
            include: {
                cupom: true,
                itens: {
                    include: {
                        produto: true,
                    },
                },
            },
            orderBy: {
                data: 'desc',
            },
        });
        return prismaPedidos.map(p => this.mapToDomain(p)).filter(p => p !== null);
    }
    /**
     * Atualiza o status de um pedido existente no banco de dados.
     * @param id - ID do pedido a ser atualizado
     * @param status - Novo status para o pedido
     * @returns Promise que resolve para o pedido com status atualizado
     */
    async atualizarStatus(id, status) {
        await this.prisma.pedido.update({
            where: { id },
            data: { status },
        });
        const pedidoAtualizado = await this.findCompletoById(id);
        return this.mapToDomain(pedidoAtualizado);
    }
}
exports.PrismaPedidoRepository = PrismaPedidoRepository;
