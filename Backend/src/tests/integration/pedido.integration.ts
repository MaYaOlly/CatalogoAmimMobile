import { PedidoService } from '../../application/services/PedidoService';
import { PrismaPedidoRepository } from '../../infrastructure/repository/PrismaPedidoRepository';
import { PrismaProdutoRepository } from '../../infrastructure/repository/PrismaProdutoRepository';
import { PrismaUsuarioRepository } from '../../infrastructure/repository/PrismaUsuarioRepository';
import { CupomService } from '../../application/services/CupomService';
import { PrismaCupomRepository } from '../../infrastructure/repository/PrismaCupomRepository';
import { prisma } from '../../infrastructure/prisma/PrismaClient';

describe('Pedidos - Integração (Service + Repository + DB)', () => {
  let pedidoService: PedidoService;
  let usuarioId: string;
  let produtoId: string;

  beforeAll(async () => {
    const pedidoRepo = new PrismaPedidoRepository(prisma);
    const produtoRepo = new PrismaProdutoRepository(prisma);
    const usuarioRepo = new PrismaUsuarioRepository(prisma);
    const cupomRepo = new PrismaCupomRepository(prisma);
    const cupomService = new CupomService(cupomRepo);
    
    pedidoService = new PedidoService(pedidoRepo, produtoRepo, usuarioRepo, cupomService);

    // Cria usuário de teste
    const usuario = await prisma.usuario.create({
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
    const produto = await prisma.produto.findFirst();
    if (produto) {
      produtoId = produto.id;
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
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
    await expect(
      pedidoService.criarPedido({
        usuarioId: 'id-invalido',
        itens: [{ produtoId, quantidade: 1 }],
        formaPagamento: 'pix'
      })
    ).rejects.toThrow();
  });
});
