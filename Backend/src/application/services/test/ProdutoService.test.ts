import { ProdutoService } from '../ProdutoService';
import { IProdutoRepository } from '../../../domain/models/interfaces/IProdutoRepository';
import { Produto } from '../../../domain/models/class/Produto';

describe('ProdutoService', () => {
  let produtoService: ProdutoService;
  let mockProdutoRepository: jest.Mocked<IProdutoRepository>;

  beforeEach(() => {
    mockProdutoRepository = {
      criar: jest.fn(),
      buscarPorId: jest.fn(),
      listarTodos: jest.fn(),
      atualizar: jest.fn(),
      deletar: jest.fn(),
    } as any;

    produtoService = new ProdutoService(mockProdutoRepository);
  });

  describe('listarProdutosDisponiveis', () => {
    it('deve retornar apenas produtos disponíveis', async () => {
      const disponivel1 = new Produto('1', 'Produto 1', 'Desc', 100, 'Cat', null, true);
      const indisponivel = new Produto('2', 'Produto 2', 'Desc', 200, 'Cat', null, false);
      const disponivel2 = new Produto('3', 'Produto 3', 'Desc', 150, 'Cat', null, true);

      mockProdutoRepository.listarTodos.mockResolvedValue([disponivel1, indisponivel, disponivel2]);

      const resultado = await produtoService.listarProdutos();

      expect(resultado).toHaveLength(2);
      expect(resultado).toContain(disponivel1);
      expect(resultado).toContain(disponivel2);
    });

    it('deve retornar array vazio quando não há produtos disponíveis', async () => {
      mockProdutoRepository.listarTodos.mockResolvedValue([]);

      const resultado = await produtoService.listarProdutos();

      expect(resultado).toHaveLength(0);
    });
  });

  describe('buscarProdutoPorId', () => {
    it('deve retornar produto quando encontrado', async () => {
      const produto = new Produto('1', 'Produto', 'Desc', 100, 'Cat', null, true);
      mockProdutoRepository.buscarPorId.mockResolvedValue(produto);

      const resultado = await produtoService.buscarProdutoPorId('1');

      expect(resultado).toEqual(produto);
    });

    it('deve retornar null quando não encontrado', async () => {
      mockProdutoRepository.buscarPorId.mockResolvedValue(null);

      const resultado = await produtoService.buscarProdutoPorId('999');

      expect(resultado).toBeNull();
    });
  });

  describe('criarProduto', () => {
    it('deve criar um produto com sucesso', async () => {
      const produto = new Produto('1', 'Notebook', 'Notebook Dell', 2500, 'Eletrônicos', 'img.jpg', true);
      mockProdutoRepository.criar.mockResolvedValue(produto);

      const resultado = await produtoService.criarProduto('Notebook', 'Notebook Dell', 2500, 'Eletrônicos', 'img.jpg', true);

      expect(resultado).toEqual(produto);
      expect(mockProdutoRepository.criar).toHaveBeenCalledTimes(1);
    });

    it('deve propagar erro de validação', async () => {
      await expect(produtoService.criarProduto('', 'Desc', 100, 'Cat', '', true))
        .rejects.toThrow('Nome do produto é obrigatório');
    });
  });

  describe('atualizarProduto', () => {
    it('deve atualizar produto com sucesso', async () => {
      const produto = new Produto('1', 'Nome Antigo', 'Desc Antiga', 100, 'Cat', null, true);
      mockProdutoRepository.buscarPorId.mockResolvedValue(produto);
      mockProdutoRepository.atualizar.mockImplementation((id, p) => Promise.resolve(p as Produto));

      const resultado = await produtoService.atualizarProduto('1', { nome: 'Nome Novo', preco: 150 });

      expect(resultado?.nome).toBe('Nome Novo');
      expect(resultado?.preco).toBe(150);
    });

    it('deve retornar null quando produto não existe', async () => {
      mockProdutoRepository.buscarPorId.mockResolvedValue(null);

      const resultado = await produtoService.atualizarProduto('999', { nome: 'Novo' });

      expect(resultado).toBeNull();
    });
  });

  describe('deletarProduto', () => {
    it('deve deletar produto com sucesso', async () => {
      const produto = new Produto('1', 'Produto', 'Desc', 100, 'Cat', null, true);
      mockProdutoRepository.buscarPorId.mockResolvedValue(produto);
      mockProdutoRepository.deletar.mockResolvedValue(undefined);

      const resultado = await produtoService.deletarProduto('1');

      expect(resultado).toBe(true);
      expect(mockProdutoRepository.deletar).toHaveBeenCalledWith('1');
    });

    it('deve retornar false quando não existe', async () => {
      mockProdutoRepository.buscarPorId.mockResolvedValue(null);

      const resultado = await produtoService.deletarProduto('999');

      expect(resultado).toBe(false);
    });
  });
});
