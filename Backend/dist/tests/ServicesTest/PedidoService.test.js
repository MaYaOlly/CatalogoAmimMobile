"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PedidoService_1 = require("../../application/services/PedidoService");
const Pedido_1 = require("../../domain/models/class/Pedido");
const Produto_1 = require("../../domain/models/class/Produto");
const Usuario_1 = require("../../domain/models/class/Usuario");
const Cupom_1 = require("../../domain/models/class/Cupom");
const ItemPedido_1 = require("../../domain/models/class/ItemPedido");
describe('PedidoService', () => {
    let pedidoService;
    let mockPedidoRepository;
    let mockProdutoRepository;
    let mockUsuarioRepository;
    let mockCupomService;
    let mockUsuario;
    let mockProduto;
    let mockCupom;
    beforeEach(() => {
        mockPedidoRepository = {
            criarPedido: jest.fn(),
            buscarPorId: jest.fn(),
            listarPorUsuario: jest.fn(),
            atualizarStatus: jest.fn(),
        };
        mockProdutoRepository = {
            buscarPorId: jest.fn(),
        };
        mockUsuarioRepository = {
            buscarPorId: jest.fn(),
        };
        mockCupomService = {
            validarCupom: jest.fn(),
            desativarCupom: jest.fn(),
        };
        pedidoService = new PedidoService_1.PedidoService(mockPedidoRepository, mockProdutoRepository, mockUsuarioRepository, mockCupomService);
        mockUsuario = new Usuario_1.Usuario('user123', 'João', 'joao@email.com', '123456', '11987654321', 'Rua A');
        mockProduto = new Produto_1.Produto('prod1', 'Produto 1', 'Descrição', 100, 'Categoria', null, true);
        mockCupom = new Cupom_1.Cupom('cupom1', 'DESC10', 'percentual', 10, new Date(Date.now() + 86400000), true);
    });
    describe('criarPedido', () => {
        it('deve criar um pedido com sucesso', async () => {
            const dadosPedido = {
                usuarioId: 'user123',
                itens: [{ produtoId: 'prod1', quantidade: 2 }],
                formaPagamento: 'pix',
            };
            mockUsuarioRepository.buscarPorId.mockResolvedValue(mockUsuario);
            mockProdutoRepository.buscarPorId.mockResolvedValue(mockProduto);
            const pedidoCriado = new Pedido_1.Pedido('pedido123', 'user123', [new ItemPedido_1.ItemPedido('item1', mockProduto, 2, 100, 'pedido123')], 'pix', 'realizado', new Date());
            mockPedidoRepository.criarPedido.mockResolvedValue(pedidoCriado);
            const resultado = await pedidoService.criarPedido(dadosPedido);
            expect(mockUsuarioRepository.buscarPorId).toHaveBeenCalledWith('user123');
            expect(mockProdutoRepository.buscarPorId).toHaveBeenCalledWith('prod1');
            expect(mockPedidoRepository.criarPedido).toHaveBeenCalled();
            expect(resultado.precoTotal).toBe(200);
        });
        it('deve lançar erro quando usuário não for encontrado', async () => {
            mockUsuarioRepository.buscarPorId.mockResolvedValue(null);
            await expect(pedidoService.criarPedido({
                usuarioId: 'user_inexistente',
                itens: [{ produtoId: 'prod1', quantidade: 1 }],
                formaPagamento: 'pix',
            })).rejects.toThrow('Usuário não encontrado.');
        });
        it('deve lançar erro quando produto não for encontrado', async () => {
            mockUsuarioRepository.buscarPorId.mockResolvedValue(mockUsuario);
            mockProdutoRepository.buscarPorId.mockResolvedValue(null);
            await expect(pedidoService.criarPedido({
                usuarioId: 'user123',
                itens: [{ produtoId: 'prod_inexistente', quantidade: 1 }],
                formaPagamento: 'pix',
            })).rejects.toThrow('Produto com ID prod_inexistente não encontrado.');
        });
        it('deve lançar erro quando produto não estiver disponível', async () => {
            const produtoIndisponivel = new Produto_1.Produto('prod2', 'Produto', 'Desc', 100, 'Cat', null, false);
            mockUsuarioRepository.buscarPorId.mockResolvedValue(mockUsuario);
            mockProdutoRepository.buscarPorId.mockResolvedValue(produtoIndisponivel);
            await expect(pedidoService.criarPedido({
                usuarioId: 'user123',
                itens: [{ produtoId: 'prod2', quantidade: 1 }],
                formaPagamento: 'pix',
            })).rejects.toThrow('não está disponível');
        });
        it('deve criar pedido com cupom aplicado', async () => {
            mockUsuarioRepository.buscarPorId.mockResolvedValue(mockUsuario);
            mockProdutoRepository.buscarPorId.mockResolvedValue(mockProduto);
            mockCupomService.validarCupom.mockResolvedValue(mockCupom);
            mockCupomService.desativarCupom.mockResolvedValue({ ...mockCupom, ativo: false });
            const pedidoComCupom = new Pedido_1.Pedido('pedido123', 'user123', [new ItemPedido_1.ItemPedido('item1', mockProduto, 2, 100, 'pedido123')], 'pix', 'realizado', new Date());
            pedidoComCupom.aplicarCupom(mockCupom);
            mockPedidoRepository.criarPedido.mockResolvedValue(pedidoComCupom);
            const resultado = await pedidoService.criarPedido({
                usuarioId: 'user123',
                itens: [{ produtoId: 'prod1', quantidade: 2 }],
                formaPagamento: 'pix',
                cupomCodigo: 'DESC10',
            });
            expect(mockCupomService.validarCupom).toHaveBeenCalledWith('DESC10');
            expect(mockCupomService.desativarCupom).toHaveBeenCalledWith('DESC10');
            expect(resultado.cupom).toBeTruthy();
        });
        it('deve lançar erro quando cupom for inválido', async () => {
            mockUsuarioRepository.buscarPorId.mockResolvedValue(mockUsuario);
            mockProdutoRepository.buscarPorId.mockResolvedValue(mockProduto);
            mockCupomService.validarCupom.mockRejectedValue(new Error('O cupom de desconto informado é inválido.'));
            await expect(pedidoService.criarPedido({
                usuarioId: 'user123',
                itens: [{ produtoId: 'prod1', quantidade: 1 }],
                formaPagamento: 'pix',
                cupomCodigo: 'INVALIDO',
            })).rejects.toThrow('cupom de desconto informado é inválido');
        });
    });
    describe('buscarPedidoPorId', () => {
        it('deve retornar pedido quando encontrado', async () => {
            const mockPedido = new Pedido_1.Pedido('pedido123', 'user123', [new ItemPedido_1.ItemPedido('item1', mockProduto, 2, 100, 'pedido123')], 'pix', 'realizado', new Date());
            mockPedidoRepository.buscarPorId.mockResolvedValue(mockPedido);
            const resultado = await pedidoService.buscarPedidoPorId('pedido123');
            expect(resultado).toBe(mockPedido);
            expect(mockPedidoRepository.buscarPorId).toHaveBeenCalledWith('pedido123');
        });
        it('deve lançar erro quando pedido não for encontrado', async () => {
            mockPedidoRepository.buscarPorId.mockResolvedValue(null);
            await expect(pedidoService.buscarPedidoPorId('pedido_inexistente')).rejects.toThrow('Pedido não encontrado.');
        });
    });
    describe('listarPedidosPorUsuario', () => {
        it('deve retornar lista de pedidos do usuário', async () => {
            const mockPedidos = [
                new Pedido_1.Pedido('pedido1', 'user123', [new ItemPedido_1.ItemPedido('item1', mockProduto, 1, 100, 'pedido1')], 'pix', 'realizado', new Date()),
                new Pedido_1.Pedido('pedido2', 'user123', [new ItemPedido_1.ItemPedido('item2', mockProduto, 2, 100, 'pedido2')], 'especie', 'confirmado', new Date()),
            ];
            mockPedidoRepository.listarPorUsuario.mockResolvedValue(mockPedidos);
            const resultado = await pedidoService.listarPedidosPorUsuario('user123');
            expect(resultado).toHaveLength(2);
            expect(mockPedidoRepository.listarPorUsuario).toHaveBeenCalledWith('user123');
        });
        it('deve retornar lista vazia quando usuário não tiver pedidos', async () => {
            mockPedidoRepository.listarPorUsuario.mockResolvedValue([]);
            const resultado = await pedidoService.listarPedidosPorUsuario('user_sem_pedidos');
            expect(resultado).toEqual([]);
        });
    });
    describe('confirmarPedido', () => {
        it('deve confirmar pedido com sucesso', async () => {
            const mockPedido = new Pedido_1.Pedido('pedido123', 'user123', [new ItemPedido_1.ItemPedido('item1', mockProduto, 1, 100, 'pedido123')], 'pix', 'realizado', new Date());
            const mockPedidoConfirmado = new Pedido_1.Pedido('pedido123', 'user123', [new ItemPedido_1.ItemPedido('item1', mockProduto, 1, 100, 'pedido123')], 'pix', 'confirmado', new Date());
            mockPedidoRepository.buscarPorId.mockResolvedValue(mockPedido);
            mockPedidoRepository.atualizarStatus.mockResolvedValue(mockPedidoConfirmado);
            const resultado = await pedidoService.confirmarPedido('pedido123');
            expect(resultado.status).toBe('confirmado');
            expect(mockPedidoRepository.atualizarStatus).toHaveBeenCalledWith('pedido123', 'confirmado');
        });
        it('deve lançar erro quando pedido não for encontrado', async () => {
            mockPedidoRepository.buscarPorId.mockResolvedValue(null);
            await expect(pedidoService.confirmarPedido('pedido_inexistente')).rejects.toThrow('Pedido não encontrado.');
        });
        it('deve lançar erro ao confirmar pedido com status inválido', async () => {
            const mockPedido = new Pedido_1.Pedido('pedido123', 'user123', [new ItemPedido_1.ItemPedido('item1', mockProduto, 1, 100, 'pedido123')], 'pix', 'pendente', new Date());
            mockPedidoRepository.buscarPorId.mockResolvedValue(mockPedido);
            await expect(pedidoService.confirmarPedido('pedido123')).rejects.toThrow('Apenas pedidos realizados podem ser confirmados');
        });
    });
    describe('cancelarPedido', () => {
        it('deve cancelar pedido com sucesso', async () => {
            const mockPedido = new Pedido_1.Pedido('pedido123', 'user123', [new ItemPedido_1.ItemPedido('item1', mockProduto, 1, 100, 'pedido123')], 'pix', 'realizado', new Date());
            const mockPedidoCancelado = new Pedido_1.Pedido('pedido123', 'user123', [new ItemPedido_1.ItemPedido('item1', mockProduto, 1, 100, 'pedido123')], 'pix', 'cancelado', new Date());
            mockPedidoRepository.buscarPorId.mockResolvedValue(mockPedido);
            mockPedidoRepository.atualizarStatus.mockResolvedValue(mockPedidoCancelado);
            const resultado = await pedidoService.cancelarPedido('pedido123');
            expect(resultado.status).toBe('cancelado');
        });
        it('deve lançar erro quando pedido não for encontrado', async () => {
            mockPedidoRepository.buscarPorId.mockResolvedValue(null);
            await expect(pedidoService.cancelarPedido('pedido_inexistente')).rejects.toThrow('Pedido não encontrado.');
        });
        it('deve lançar erro ao cancelar pedido enviado', async () => {
            const mockPedido = new Pedido_1.Pedido('pedido123', 'user123', [new ItemPedido_1.ItemPedido('item1', mockProduto, 1, 100, 'pedido123')], 'pix', 'enviado', new Date());
            mockPedidoRepository.buscarPorId.mockResolvedValue(mockPedido);
            await expect(pedidoService.cancelarPedido('pedido123')).rejects.toThrow('Este pedido não pode mais ser cancelado');
        });
    });
});
