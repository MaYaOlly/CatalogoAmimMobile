"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaProdutoRepository = void 0;
const Produto_1 = require("../../domain/models/class/Produto");
/**
 * Implementação de PrismaProdutoRepository usando Prisma ORM.
 * Fornece acesso aos dados de produtos no banco de dados.
 */
class PrismaProdutoRepository {
    /**
     * Cria uma nova instância do repositório de produtos.
     * @param prisma - Cliente Prisma para acesso ao banco de dados
     */
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listarTodos() {
        const produtosData = await this.prisma.produto.findMany();
        return produtosData.map(Produto_1.Produto.fromPersistence);
    }
    /**
     * Busca um produto no banco de dados pelo seu ID.
     * @param id - ID do produto a ser buscado
     * @returns Promise que resolve para o produto encontrado ou null
     */
    async buscarPorId(id) {
        const produtoData = await this.prisma.produto.findUnique({ where: { id } });
        return produtoData ? Produto_1.Produto.fromPersistence(produtoData) : null;
    }
    /**
     * Cria um novo produto no banco de dados.
     * @param produto - Entidade Produto a ser persistida
     * @returns Promise que resolve para o produto criado com ID gerado
     */
    async criar(produto) {
        const produtoData = await this.prisma.produto.create({
            data: {
                nome: produto.nome,
                descricao: produto.descricao,
                preco: produto.preco,
                categoria: produto.categoria,
                imagemUrl: produto.imagemUrl,
                disponivel: produto.disponivel,
            },
        });
        return Produto_1.Produto.fromPersistence(produtoData);
    }
    /**
     * Atualiza um produto existente no banco de dados.
     * @param id - ID do produto a ser atualizado
     * @param produto - Entidade Produto com os dados atualizados
     * @returns Promise que resolve para o produto atualizado
     */
    async atualizar(id, produto) {
        const produtoData = await this.prisma.produto.update({
            where: { id },
            data: produto.toPersistence(),
        });
        return Produto_1.Produto.fromPersistence(produtoData);
    }
    /**
     * Deleta um produto do banco de dados.
     * @param id - ID do produto a ser deletado
     * @returns Promise que resolve quando o produto é deletado
     */
    async deletar(id) {
        await this.prisma.produto.delete({ where: { id } });
    }
}
exports.PrismaProdutoRepository = PrismaProdutoRepository;
