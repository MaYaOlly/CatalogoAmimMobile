"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PedidoService_1 = require("../../application/services/PedidoService");
const PrismaPedidoRepository_1 = require("../../infrastructure/repository/PrismaPedidoRepository");
const PrismaProdutoRepository_1 = require("../../infrastructure/repository/PrismaProdutoRepository");
const PrismaUsuarioRepository_1 = require("../../infrastructure/repository/PrismaUsuarioRepository");
const CupomService_1 = require("../../application/services/CupomService");
const PrismaCupomRepository_1 = require("../../infrastructure/repository/PrismaCupomRepository");
const PrismaClient_1 = require("../../infrastructure/prisma/PrismaClient");
describe('Pedidos - Integração (Service + Repository + DB)', () => {
    let pedidoService;
    let usuarioId;
    let produtoId;
    beforeAll(async () => {
        const pedidoRepo = new PrismaPedidoRepository_1.PrismaPedidoRepository(PrismaClient_1.prisma);
        const produtoRepo = new PrismaProdutoRepository_1.PrismaProdutoRepository(PrismaClient_1.prisma);
        const usuarioRepo = new PrismaUsuarioRepository_1.PrismaUsuarioRepository(PrismaClient_1.prisma);
        const cupomRepo = new PrismaCupomRepository_1.PrismaCupomRepository(PrismaClient_1.prisma);
        const cupomService = new CupomService_1.CupomService(cupomRepo);
        pedidoService = new PedidoService_1.PedidoService(pedidoRepo, produtoRepo, usuarioRepo, cupomService);
        // Cria usuário de teste
        const usuario = await PrismaClient_1.prisma.usuario.create({
            data: {
                nome: 'Cliente Teste',
                email: `cliente${Date.now()}@teste.com`,
                senha: '$2a$10$hashedpassword',
                endereco: 'Rua Teste',
                telefone: null
            }
        });
        usuarioId = usuario.id;
        // Usa um produto existente
        const produto = await PrismaClient_1.prisma.produto.findFirst();
        if (produto) {
            produtoId = produto.id;
        }
    });
    afterAll(async () => {
        await PrismaClient_1.prisma.$disconnect();
    });
    it('deve criar pedido com sucesso', async () => {
        if (!produtoId) {
            console.log('Nenhum produto disponível, pulando teste');
            return;
        }
        const pedido = await pedidoService.criarPedido({
            usuarioId,
            itens: [
                {
                    produtoId,
                    quantidade: 2
                }
            ],
            formaPagamento: 'pix'
        });
        expect(pedido).toHaveProperty('id');
        expect(pedido.usuarioID).toBe(usuarioId);
        expect(pedido.itens.length).toBeGreaterThan(0);
    });
    it('deve listar pedidos do usuário', async () => {
        const pedidos = await pedidoService.listarPedidosPorUsuario(usuarioId);
        expect(Array.isArray(pedidos)).toBe(true);
    });
    it('deve rejeitar pedido com usuário inexistente', async () => {
        await expect(pedidoService.criarPedido({
            usuarioId: 'id-invalido',
            itens: [{ produtoId, quantidade: 1 }],
            formaPagamento: 'pix'
        })).rejects.toThrow();
    });
});
