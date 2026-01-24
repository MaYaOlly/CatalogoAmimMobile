"use strict";
/**
 * Servidor HTTP da aplicação usando Fastify.
 *
 * Este arquivo é o ponto de entrada da aplicação. Configura o servidor Fastify,
 * registra plugins (CORS, Swagger), rotas e inicializa o servidor.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const produtoRoutes_1 = require("./infrastructure/http/routes/produtoRoutes");
const pedidoRoutes_1 = require("./infrastructure/http/routes/pedidoRoutes");
const usuarioRoutes_1 = require("./infrastructure/http/routes/usuarioRoutes");
const cupomRoutes_1 = require("./infrastructure/http/routes/cupomRoutes");
const PrismaClient_1 = require("./infrastructure/prisma/PrismaClient");
/** Instância do servidor Fastify com logger habilitado */
const app = (0, fastify_1.default)({ logger: true });
/**
 * Registra o plugin CORS para permitir requisições cross-origin.
 * Em produção, configure CORS_ORIGIN com domínios específicos.
 */
app.register(cors_1.default, {
    origin: process.env.CORS_ORIGIN || true
});
// Registrar Swagger
app.register(require('@fastify/swagger'), {
    openapi: {
        info: {
            title: 'API Catálogo Amim',
            description: 'API para gerenciamento de catálogo de produtos, pedidos e usuários',
            version: '1.0.0'
        },
        servers: [
            { url: 'http://localhost:3333', description: 'Servidor de desenvolvimento' }
        ],
        tags: [
            { name: 'produtos', description: 'Endpoints de produtos' },
            { name: 'pedidos', description: 'Endpoints de pedidos' },
            { name: 'usuarios', description: 'Endpoints de usuários' },
            { name: 'cupons', description: 'Endpoints de cupons' }
        ]
    }
});
app.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false
    }
});
/** Registra as rotas de produtos */
app.register(produtoRoutes_1.produtoRoutes);
/** Registra as rotas de pedidos */
app.register(pedidoRoutes_1.pedidoRoutes);
/** Registra as rotas de usuários */
app.register(usuarioRoutes_1.usuarioRoutes);
/** Registra as rotas de cupons */
app.register(cupomRoutes_1.cupomRoutes);
/** Rota raiz para verificar se a API está funcionando */
app.get("/", async () => {
    return { message: "Hello World" };
});
/** Health check endpoint para monitoramento */
app.get("/health", async () => {
    try {
        // Verifica conexão com o banco
        await PrismaClient_1.prisma.$queryRaw `SELECT 1`;
        return {
            status: "ok",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development'
        };
    }
    catch (error) {
        return {
            status: "error",
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
});
/** Porta e host configuráveis via variáveis de ambiente */
const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || '0.0.0.0';
/**
 * Graceful shutdown - Fecha conexões adequadamente ao desligar
 */
const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} recebido. Encerrando aplicação gracefully...`);
    try {
        await app.close();
        await PrismaClient_1.prisma.$disconnect();
        console.log('✅ Aplicação encerrada com sucesso');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Erro ao encerrar aplicação:', error);
        process.exit(1);
    }
};
// Listeners para sinais de término
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    gracefulShutdown('uncaughtException');
});
/** Inicia o servidor na porta especificada */
app.listen({ port: PORT, host: HOST }, (err, address) => {
    if (err) {
        console.error('❌ Erro ao iniciar servidor:', err);
        process.exit(1);
    }
    console.log(`🚀 API Fastify rodando em ${address}`);
    console.log(`📚 Documentação Swagger em ${address}/docs`);
    console.log(`🏥 Health check em ${address}/health`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
