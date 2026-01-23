/**
 * Configuração do app Fastify para testes de integração
 * Exporta uma função que cria uma instância do app sem iniciar o servidor
 */

import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { produtoRoutes } from "../infrastructure/http/routes/produtoRoutes";
import { pedidoRoutes } from "../infrastructure/http/routes/pedidoRoutes";
import { usuarioRoutes } from "../infrastructure/http/routes/usuarioRoutes";
import { cupomRoutes } from "../infrastructure/http/routes/cupomRoutes";

/**
 * Cria e configura uma instância do Fastify para testes
 * @returns Instância do Fastify configurada
 */
export async function createApp(): Promise<FastifyInstance> {
  const app = Fastify({ logger: false }); // Desabilita logs nos testes

  // Registra CORS
  await app.register(cors, { origin: true });

  // Registra as rotas
  await app.register(produtoRoutes);
  await app.register(pedidoRoutes);
  await app.register(usuarioRoutes);
  await app.register(cupomRoutes);

  // Rota raiz
  app.get("/", async () => {
    return { message: "Hello World" };
  });

  return app;
}
