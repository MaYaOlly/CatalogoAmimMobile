/**
 * Servidor HTTP da aplicação usando Fastify.
 * 
 * Este arquivo é o ponto de entrada da aplicação. Configura o servidor Fastify,
 * registra plugins (CORS, Swagger), rotas e inicializa o servidor.
 */

import Fastify from "fastify";
import cors from "@fastify/cors";
import { produtoRoutes } from "./infrastructure/http/routes/produtoRoutes";
import { pedidoRoutes } from "./infrastructure/http/routes/pedidoRoutes";
import { usuarioRoutes } from "./infrastructure/http/routes/usuarioRoutes";
import { cupomRoutes } from "./infrastructure/http/routes/cupomRoutes";

/** Instância do servidor Fastify com logger habilitado */
const app = Fastify({ logger: true });

/**
 * Registra o plugin CORS para permitir requisições cross-origin.
 * Configurado para aceitar requisições de qualquer origem (development).
 */
app.register(cors, {
  origin: true
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

/** Porta em que o servidor irá escutar */
const PORT = 3333;

/** Inicia o servidor na porta especificada */
app.listen({ port: PORT }, () => {
  console.log(`🚀 API Fastify rodando em http://localhost:${PORT}`);
});