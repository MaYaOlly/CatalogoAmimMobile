import { prisma } from '../prisma/PrismaClient';

// Repositórios
import { PrismaProdutoRepository } from '../repository/PrismaProdutoRepository';
import { PrismaUsuarioRepository } from '../repository/PrismaUsuarioRepository';
import { PrismaCupomRepository } from '../repository/PrismaCupomRepository';
import { PrismaPedidoRepository } from '../repository/PrismaPedidoRepository';

// Serviços
import { ProdutoService } from '../../application/services/ProdutoService';
import { PedidoService } from '../../application/services/PedidoService';

// Controllers
import { ProdutoController } from './controllers/ProdutoController';
import { PedidoController } from './controllers/PedidoController';

// --- INSTANCIAÇÃO DOS REPOSITÓRIOS ---
const produtoRepository = new PrismaProdutoRepository(prisma);
const usuarioRepository = new PrismaUsuarioRepository(prisma);
const cupomRepository = new PrismaCupomRepository(prisma);
const pedidoRepository = new PrismaPedidoRepository(prisma);

// --- INSTANCIAÇÃO DOS SERVIÇOS ---
const produtoService = new ProdutoService(produtoRepository);
const pedidoService = new PedidoService(
  pedidoRepository,
  produtoRepository,
  usuarioRepository,
  cupomRepository
);

// --- INSTANCIAÇÃO E EXPORTAÇÃO DOS CONTROLLERS ---
export const produtoController = new ProdutoController(produtoService);
export const pedidoController = new PedidoController(pedidoService);