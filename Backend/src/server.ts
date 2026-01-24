/**
 * Servidor HTTP da aplicação usando Fastify.
 * 
 * Este arquivo é o ponto de entrada da aplicação. Configura o servidor Fastify,
 * registra plugins (CORS, Swagger), rotas e inicializa o servidor.
 */

import 'dotenv/config';
import Fastify from "fastify";
import cors from "@fastify/cors";
import { produtoRoutes } from "./infrastructure/http/routes/produtoRoutes";
import { pedidoRoutes } from "./infrastructure/http/routes/pedidoRoutes";
import { usuarioRoutes } from "./infrastructure/http/routes/usuarioRoutes";
import { cupomRoutes } from "./infrastructure/http/routes/cupomRoutes";
import { prisma } from "./infrastructure/prisma/PrismaClient";

/** Instância do servidor Fastify com logger habilitado */
const app = Fastify({ logger: true });

/**
 * Registra o plugin CORS para permitir requisições cross-origin.
 * Em produção, configure CORS_ORIGIN com domínios específicos.
 */
app.register(cors, {
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
app.register(produtoRoutes);

/** Registra as rotas de pedidos */
app.register(pedidoRoutes);

/** Registra as rotas de usuários */
app.register(usuarioRoutes);

/** Registra as rotas de cupons */
app.register(cupomRoutes);

/** Rota raiz para verificar se a API está funcionando */
app.get("/", async () => {
  return { message: "Hello World" };
});

/** Health check endpoint para monitoramento */
app.get("/health", async () => {
  try {
    // Verifica conexão com o banco
    await prisma.$queryRaw`SELECT 1`;
    return { 
      status: "ok", 
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    };
  } catch (error) {
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
const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} recebido. Encerrando aplicação gracefully...`);
  try {
    await app.close();
    await prisma.$disconnect();
    console.log('✅ Aplicação encerrada com sucesso');
    process.exit(0);
  } catch (error) {
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