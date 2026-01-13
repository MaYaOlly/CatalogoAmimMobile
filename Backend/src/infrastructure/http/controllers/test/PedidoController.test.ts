import { PedidoController } from '../PedidoController';
import { PedidoService } from '../../../../application/services/PedidoService';
import { Pedido } from '../../../../domain/models/class/Pedido';
import { FastifyRequest, FastifyReply } from 'fastify';

describe('PedidoController', () => {
  let pedidoController: PedidoController;
  let mockPedidoService: jest.Mocked<PedidoService>;
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    mockPedidoService = {
      criarPedido: jest.fn(),
      buscarPedidoPorId: jest.fn(),
      listarPedidosPorUsuario: jest.fn(),
      confirmarPedido: jest.fn(),
      cancelarPedido: jest.fn(),
    } as any;

    pedidoController = new PedidoController(mockPedidoService);

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  describe('criar', () => {
    it('deve criar pedido com sucesso', async () => {
      const mockPedido = { id: '1', usuarioID: 'user1', status: 'realizado' } as any;
      mockRequest = { body: { usuarioId: 'user1', itens: [], pagamento: 'pix' } };
      mockPedidoService.criarPedido.mockResolvedValue(mockPedido);

      await pedidoController.criar(mockRequest as any, mockReply as any);

      expect(mockPedidoService.criarPedido).toHaveBeenCalledWith(mockRequest.body);
      expect(mockReply.status).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith(mockPedido);
    });

    it('deve retornar erro 400 quando não encontrado', async () => {
      mockRequest = { body: { usuarioId: '999', itens: [], pagamento: 'pix' } };
      mockPedidoService.criarPedido.mockRejectedValue(new Error('Usuário não encontrado'));

      await pedidoController.criar(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
    });

    it('deve retornar erro 500 para outros erros', async () => {
      mockRequest = { body: { usuarioId: 'user1', itens: [], pagamento: 'pix' } };
      mockPedidoService.criarPedido.mockRejectedValue(new Error('Erro desconhecido'));

      await pedidoController.criar(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(500);
    });
  });

  describe('buscarPorId', () => {
    it('deve buscar pedido por id', async () => {
      const mockPedido = { id: '1', usuarioID: 'user1' } as any;
      mockRequest = { params: { id: '1' } };
      mockPedidoService.buscarPedidoPorId.mockResolvedValue(mockPedido);

      await pedidoController.buscarPorId(mockRequest as any, mockReply as any);

      expect(mockPedidoService.buscarPedidoPorId).toHaveBeenCalledWith('1');
      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(mockPedido);
    });

    it('deve retornar 404 quando não encontrado', async () => {
      mockRequest = { params: { id: '999' } };
      mockPedidoService.buscarPedidoPorId.mockRejectedValue(new Error('Pedido não encontrado'));

      await pedidoController.buscarPorId(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(404);
    });
  });

  describe('listarPorUsuario', () => {
    it('deve listar pedidos do usuário', async () => {
      const mockPedidos = [{ id: '1' }, { id: '2' }] as any;
      mockRequest = { params: { usuarioId: 'user1' } };
      mockPedidoService.listarPedidosPorUsuario.mockResolvedValue(mockPedidos);

      await pedidoController.listarPorUsuario(mockRequest as any, mockReply as any);

      expect(mockPedidoService.listarPedidosPorUsuario).toHaveBeenCalledWith('user1');
      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(mockPedidos);
    });
  });

  describe('confirmar', () => {
    it('deve confirmar pedido com sucesso', async () => {
      const mockPedido = { id: '1', status: 'confirmado' } as any;
      mockRequest = { params: { id: '1' } };
      mockPedidoService.confirmarPedido.mockResolvedValue(mockPedido);

      await pedidoController.confirmar(mockRequest as any, mockReply as any);

      expect(mockPedidoService.confirmarPedido).toHaveBeenCalledWith('1');
      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith(mockPedido);
    });

    it('deve retornar erro 400 quando falha', async () => {
      mockRequest = { params: { id: '1' } };
      mockPedidoService.confirmarPedido.mockRejectedValue(new Error('Pedido já confirmado'));

      await pedidoController.confirmar(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(400);
    });
  });

  describe('cancelar', () => {
    it('deve cancelar pedido com sucesso', async () => {
      const mockPedido = { id: '1', status: 'cancelado' } as any;
      mockRequest = { params: { id: '1' } };
      mockPedidoService.cancelarPedido.mockResolvedValue(mockPedido);

      await pedidoController.cancelar(mockRequest as any, mockReply as any);

      expect(mockPedidoService.cancelarPedido).toHaveBeenCalledWith('1');
      expect(mockReply.status).toHaveBeenCalledWith(200);
    });

    it('deve retornar erro 400 quando falha', async () => {
      mockRequest = { params: { id: '1' } };
      mockPedidoService.cancelarPedido.mockRejectedValue(new Error('Não pode cancelar'));

      await pedidoController.cancelar(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(400);
    });
  });
});
