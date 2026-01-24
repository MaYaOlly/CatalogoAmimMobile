"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProdutoService_1 = require("../../application/services/ProdutoService");
const PrismaProdutoRepository_1 = require("../../infrastructure/repository/PrismaProdutoRepository");
const PrismaClient_1 = require("../../infrastructure/prisma/PrismaClient");
describe('Produtos - Integração (Service + Repository + DB)', () => {
    let produtoService;
    let repository;
    beforeAll(() => {
        repository = new PrismaProdutoRepository_1.PrismaProdutoRepository(PrismaClient_1.prisma);
        produtoService = new ProdutoService_1.ProdutoService(repository);
    });
    afterAll(async () => {
        await PrismaClient_1.prisma.$disconnect();
    });
    it('deve listar produtos do banco', async () => {
        const produtos = await produtoService.listarProdutos();
        expect(Array.isArray(produtos)).toBe(true);
        expect(produtos.length).toBeGreaterThan(0);
    });
    it('deve criar produto no banco', async () => {
        const produto = await produtoService.criarProduto('Produto Teste', 'Descrição', 15.99, 'Teste', 'img.jpg', true);
        expect(produto).toHaveProperty('id');
        expect(produto.nome).toBe('Produto Teste');
        const produtoNoBanco = await PrismaClient_1.prisma.produto.findUnique({
            where: { id: produto.id }
        });
        expect(produtoNoBanco).toBeTruthy();
    });
    it('deve buscar produto por ID', async () => {
        const criado = await PrismaClient_1.prisma.produto.create({
            data: {
                nome: 'Produto X',
                descricao: 'Descrição',
                preco: 20.00,
                categoria: 'Teste'
            }
        });
        const produto = await produtoService.buscarProdutoPorId(criado.id);
        expect(produto?.id).toBe(criado.id);
        expect(produto?.nome).toBe('Produto X');
    });
});
