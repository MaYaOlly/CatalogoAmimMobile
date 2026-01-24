"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cupomController = exports.pedidoController = exports.usuarioController = exports.produtoController = void 0;
const PrismaClient_1 = require("../prisma/PrismaClient");
// Repositórios
const PrismaProdutoRepository_1 = require("../repository/PrismaProdutoRepository");
const PrismaUsuarioRepository_1 = require("../repository/PrismaUsuarioRepository");
const PrismaCupomRepository_1 = require("../repository/PrismaCupomRepository");
const PrismaPedidoRepository_1 = require("../repository/PrismaPedidoRepository");
// Serviços
const ProdutoService_1 = require("../../application/services/ProdutoService");
const PedidoService_1 = require("../../application/services/PedidoService");
const UsuarioService_1 = require("../../application/services/UsuarioService");
const CupomService_1 = require("../../application/services/CupomService");
// Controllers
const ProdutoController_1 = require("./controllers/ProdutoController");
const PedidoController_1 = require("./controllers/PedidoController");
const UsuarioController_1 = require("./controllers/UsuarioController");
const CupomController_1 = require("./controllers/CupomController");
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
const produtoRepository = new PrismaProdutoRepository_1.PrismaProdutoRepository(PrismaClient_1.prisma);
/** Repositório de Usuários: acessa dados de usuários no banco */
const usuarioRepository = new PrismaUsuarioRepository_1.PrismaUsuarioRepository(PrismaClient_1.prisma);
/** Repositório de Cupons: acessa dados de cupons no banco */
const cupomRepository = new PrismaCupomRepository_1.PrismaCupomRepository(PrismaClient_1.prisma);
/** Repositório de Pedidos: acessa dados de pedidos no banco */
const pedidoRepository = new PrismaPedidoRepository_1.PrismaPedidoRepository(PrismaClient_1.prisma);
// --- INSTANCIAÇÃO DOS SERVIÇOS ---
/** Service de Produtos: lógica de negócio para produtos */
const produtoService = new ProdutoService_1.ProdutoService(produtoRepository);
/** Service de Usuários: lógica de negócio para usuários */
const usuarioService = new UsuarioService_1.UsuarioService(usuarioRepository);
/** Service de Cupons: lógica de negócio para cupons */
const cupomService = new CupomService_1.CupomService(cupomRepository);
/** Service de Pedidos: lógica de negócio para pedidos com integração de outros services */
const pedidoService = new PedidoService_1.PedidoService(pedidoRepository, produtoRepository, usuarioRepository, cupomService);
// --- INSTANCIAÇÃO E EXPORTAÇÃO DOS CONTROLLERS ---
/** Controller de Produtos: gerencia requisições HTTP de produtos */
exports.produtoController = new ProdutoController_1.ProdutoController(produtoService);
/** Controller de Usuários: gerencia requisições HTTP de usuários */
exports.usuarioController = new UsuarioController_1.UsuarioController(usuarioService);
/** Controller de Pedidos: gerencia requisições HTTP de pedidos */
exports.pedidoController = new PedidoController_1.PedidoController(pedidoService);
/** Controller de Cupons: gerencia requisições HTTP de cupons */
exports.cupomController = new CupomController_1.CupomController(cupomService);
