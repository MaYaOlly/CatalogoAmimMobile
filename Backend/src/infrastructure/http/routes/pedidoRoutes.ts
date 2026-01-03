import { FastifyInstance } from 'fastify';
import { pedidoController } from '../container'; 

/**
 * Registra as rotas de pedidos na instância Fastify.
 * Define os endpoints para criar, buscar, listar, confirmar e cancelar pedidos.
 * @param fastify - Instância do Fastify para registrar as rotas
 */
export async function pedidoRoutes(fastify: FastifyInstance) {
  /** POST /pedidos - Cria um novo pedido */
  fastify.post('/pedidos', pedidoController.criar.bind(pedidoController));
  
  /** GET /pedidos/:id - Busca um pedido pelo seu ID */
  fastify.get('/pedidos/:id', pedidoController.buscarPorId.bind(pedidoController));
  
  /** GET /pedidos/usuario/:usuarioId - Lista pedidos de um usuário */
  fastify.get('/pedidos/usuario/:usuarioId', pedidoController.listarPorUsuario.bind(pedidoController));
  
  /** PATCH /pedidos/:id/confirmar - Confirma um pedido */
  fastify.patch('/pedidos/:id/confirmar', pedidoController.confirmar.bind(pedidoController));
  
  /** PATCH /pedidos/:id/cancelar - Cancela um pedido */
  fastify.patch('/pedidos/:id/cancelar', pedidoController.cancelar.bind(pedidoController));
}