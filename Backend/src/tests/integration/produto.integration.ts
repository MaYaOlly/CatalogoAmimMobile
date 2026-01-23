import { ProdutoService } from '../../application/services/ProdutoService';
import { PrismaProdutoRepository } from '../../infrastructure/repository/PrismaProdutoRepository';
import { prisma } from '../../infrastructure/prisma/PrismaClient';

describe('Produtos - Integração (Service + Repository + DB)', () => {
  let produtoService: ProdutoService;
  let repository: PrismaProdutoRepository;

  beforeAll(() => {
    repository = new PrismaProdutoRepository(prisma);
    produtoService = new ProdutoService(repository);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('deve listar produtos do banco', async () => {
    const produtos = await produtoService.listarProdutos();
    expect(Array.isArray(produtos)).toBe(true);
    expect(produtos.length).toBeGreaterThan(0);
  });

  it('deve criar produto no banco', async () => {
    const produto = await produtoService.criarProduto(
      'Produto Teste',
      'Descrição',
      15.99,
      'Teste',
      'img.jpg',
      true
    );

    expect(produto).toHaveProperty('id');
    expect(produto.nome).toBe('Produto Teste');

    const produtoNoBanco = await prisma.produto.findUnique({
      where: { id: produto.id }
    });
    expect(produtoNoBanco).toBeTruthy();
  });

  it('deve buscar produto por ID', async () => {
    const criado = await prisma.produto.create({
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
