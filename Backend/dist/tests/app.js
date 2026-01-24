"use strict";
/**
 * Configuração do app Fastify para testes de integração
 * Exporta uma função que cria uma instância do app sem iniciar o servidor
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const produtoRoutes_1 = require("../infrastructure/http/routes/produtoRoutes");
const pedidoRoutes_1 = require("../infrastructure/http/routes/pedidoRoutes");
const usuarioRoutes_1 = require("../infrastructure/http/routes/usuarioRoutes");
const cupomRoutes_1 = require("../infrastructure/http/routes/cupomRoutes");
/**
 * Cria e configura uma instância do Fastify para testes
 * @returns Instância do Fastify configurada
 */
async function createApp() {
    const app = (0, fastify_1.default)({ logger: false }); // Desabilita logs nos testes
    // Registra CORS
    await app.register(cors_1.default, { origin: true });
    // Registra as rotas
    await app.register(produtoRoutes_1.produtoRoutes);
    await app.register(pedidoRoutes_1.pedidoRoutes);
    await app.register(usuarioRoutes_1.usuarioRoutes);
    await app.register(cupomRoutes_1.cupomRoutes);
    // Rota raiz
    app.get("/", async () => {
        return { message: "Hello World" };
    });
    return app;
}
