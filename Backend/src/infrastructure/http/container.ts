import { prisma } from '../prisma/PrismaClient';

// Repositórios
import { PrismaProdutoRepository } from '../repository/PrismaProdutoRepository';
import { PrismaUsuarioRepository } from '../repository/PrismaUsuarioRepository';
import { PrismaCupomRepository } from '../repository/PrismaCupomRepository';
import { PrismaPedidoRepository } from '../repository/PrismaPedidoRepository';

// Serviços
import { ProdutoService } from '../../application/services/ProdutoService';
import { PedidoService } from '../../application/services/PedidoService';
import { UsuarioService } from '../../application/services/UsuarioService';
import { CupomService } from '../../application/services/CupomService';

// Controllers
import { ProdutoController } from './controllers/ProdutoController';
import { PedidoController } from './controllers/PedidoController';
import { UsuarioController } from './controllers/UsuarioController';
import { CupomController } from './controllers/CupomController';

/**
 * Container de injeção de dependências.
 * 
 * Este arquivo implementa o padrão de Injeção de Dependências (DI),
 * instanciando todas as camadas da aplicação (repositórios, serviços e controllers)
 * e gerenciando suas dependências.
 * 
 * Padrão de instanciação:
 * 1. Repositórios (acessam o banco de dados via Prisma)
 * 2. Serviços (encapsulam lógica de negócio e usam repositórios)
 * 3. Controllers (gerenciam requisições HTTP e usam serviços)
 */

// --- INSTANCIAÇÃO DOS REPOSITÓRIOS ---
/** Repositório de Produtos: acessa dados de produtos no banco */
const produtoRepository = new PrismaProdutoRepository(prisma);

/** Repositório de Usuários: acessa dados de usuários no banco */
const usuarioRepository = new PrismaUsuarioRepository(prisma);

/** Repositório de Cupons: acessa dados de cupons no banco */
const cupomRepository = new PrismaCupomRepository(prisma);

/** Repositório de Pedidos: acessa dados de pedidos no banco */
const pedidoRepository = new PrismaPedidoRepository(prisma);

// --- INSTANCIAÇÃO DOS SERVIÇOS ---
/** Service de Produtos: lógica de negócio para produtos */
const produtoService = new ProdutoService(produtoRepository);

/** Service de Usuários: lógica de negócio para usuários */
const usuarioService = new UsuarioService(usuarioRepository);

/** Service de Cupons: lógica de negócio para cupons */
const cupomService = new CupomService(cupomRepository);

/** Service de Pedidos: lógica de negócio para pedidos com integração de outros services */
const pedidoService = new PedidoService(
  pedidoRepository,
  produtoRepository,
  usuarioRepository,
  cupomService
);

// --- INSTANCIAÇÃO E EXPORTAÇÃO DOS CONTROLLERS ---
/** Controller de Produtos: gerencia requisições HTTP de produtos */
export const produtoController = new ProdutoController(produtoService);

/** Controller de Usuários: gerencia requisições HTTP de usuários */
export const usuarioController = new UsuarioController(usuarioService);

/** Controller de Pedidos: gerencia requisições HTTP de pedidos */
export const pedidoController = new PedidoController(pedidoService);

/** Controller de Cupons: gerencia requisições HTTP de cupons */
export const cupomController = new CupomController(cupomService);