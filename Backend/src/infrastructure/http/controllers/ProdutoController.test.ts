import { ProdutoController } from './ProdutoController';
import { ProdutoService } from '../../../application/services/ProdutoService';
import { Produto } from '../../../domain/models/class/Produto';
import { FastifyRequest, FastifyReply } from 'fastify';

describe('ProdutoController', () => {
  let produtoController: ProdutoController;
  let mockProdutoService: jest.Mocked<ProdutoService>;
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    mockProdutoService = {
      listarProdutos: jest.fn(),
      buscarProdutoPorId: jest.fn(),
      criarProduto: jest.fn(),
      atualizarProduto: jest.fn(),
      deletarProduto: jest.fn(),
    } as any;

    produtoController = new ProdutoController(mockProdutoService);

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  describe('listar', () => {
    it('deve listar produtos disponíveis', async () => {
      const produtos = [
        new Produto('1', 'Notebook', 'Desc', 2500, 'Eletrônicos', null, true),
        new Produto('2', 'Mouse', 'Desc', 50, 'Periféricos', null, true),
      ];
      mockRequest = {};
      mockProdutoService.listarProdutos.mockResolvedValue(produtos);

      await produtoController.listar(mockRequest as any, mockReply as any);

      expect(mockProdutoService.listarProdutos).toHaveBeenCalled();
      expect(mockReply.send).toHaveBeenCalledWith(produtos);
    });

    it('deve retornar erro 500 quando falha', async () => {
      mockRequest = {};
      mockProdutoService.listarProdutos.mockRejectedValue(new Error('Erro no banco'));

      await produtoController.listar(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Erro ao listar produtos' });
    });
  });

  describe('buscarPorId', () => {
    it('deve buscar produto por id', async () => {
      const produto = new Produto('1', 'Notebook', 'Desc', 2500, 'Eletrônicos', null, true);
      mockRequest = { params: { id: '1' } };
      mockProdutoService.buscarProdutoPorId.mockResolvedValue(produto);

      await produtoController.buscarPorId(mockRequest as any, mockReply as any);

      expect(mockProdutoService.buscarProdutoPorId).toHaveBeenCalledWith('1');
      expect(mockReply.send).toHaveBeenCalledWith(produto);
    });

    it('deve retornar 404 quando produto não encontrado', async () => {
      mockRequest = { params: { id: '999' } };
      mockProdutoService.buscarProdutoPorId.mockResolvedValue(null);

      await produtoController.buscarPorId(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Produto não encontrado' });
    });
  });

  describe('criar', () => {
    it('deve criar produto com sucesso', async () => {
      const produto = new Produto('1', 'Notebook', 'Notebook Dell', 2500, 'Eletrônicos', 'img.jpg', true);
      mockRequest = {
        body: {
          nome: 'Notebook',
          descricao: 'Notebook Dell',
          preco: 2500,
          categoria: 'Eletrônicos',
          imagem: 'img.jpg',
          disponivel: true,
        },
      };
      mockProdutoService.criarProduto.mockResolvedValue(produto);

      await produtoController.criar(mockRequest as any, mockReply as any);

      expect(mockProdutoService.criarProduto).toHaveBeenCalledWith('Notebook', 'Notebook Dell', 2500, 'Eletrônicos', 'img.jpg', true);
      expect(mockReply.status).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith(produto);
    });
  });

  describe('atualizar', () => {
    it('deve atualizar produto com sucesso', async () => {
      const produto = new Produto('1', 'Notebook Novo', 'Desc', 3000, 'Eletrônicos', null, true);
      mockRequest = { params: { id: '1' }, body: { nome: 'Notebook Novo', preco: 3000 } };
      mockProdutoService.atualizarProduto.mockResolvedValue(produto);

      await produtoController.atualizar(mockRequest as any, mockReply as any);

      expect(mockProdutoService.atualizarProduto).toHaveBeenCalledWith('1', mockRequest.body);
      expect(mockReply.send).toHaveBeenCalledWith(produto);
    });

    it('deve retornar 404 quando produto não encontrado', async () => {
      mockRequest = { params: { id: '999' }, body: { nome: 'Nome' } };
      mockProdutoService.atualizarProduto.mockResolvedValue(null);

      await produtoController.atualizar(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(404);
    });
  });

  describe('deletar', () => {
    it('deve deletar produto com sucesso', async () => {
      mockRequest = { params: { id: '1' } };
      mockProdutoService.deletarProduto.mockResolvedValue(true);

      await produtoController.deletar(mockRequest as any, mockReply as any);

      expect(mockProdutoService.deletarProduto).toHaveBeenCalledWith('1');
      expect(mockReply.status).toHaveBeenCalledWith(204);
    });

    it('deve retornar 404 quando produto não encontrado', async () => {
      mockRequest = { params: { id: '999' } };
      mockProdutoService.deletarProduto.mockResolvedValue(false);

      await produtoController.deletar(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(404);
    });
  });
});
