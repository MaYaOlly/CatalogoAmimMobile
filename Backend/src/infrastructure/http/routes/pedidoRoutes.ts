import { FastifyInstance } from 'fastify';
import { pedidoController } from '../container'; 

export async function pedidoRoutes(fastify: FastifyInstance) {
  fastify.post('/pedidos', pedidoController.criar.bind(pedidoController));
  fastify.get('/pedidos/:id', pedidoController.buscarPorId.bind(pedidoController));
  fastify.get('/pedidos/usuario/:usuarioId', pedidoController.listarPorUsuario.bind(pedidoController));
  fastify.patch('/pedidos/:id/confirmar', pedidoController.confirmar.bind(pedidoController));
  fastify.patch('/pedidos/:id/cancelar', pedidoController.cancelar.bind(pedidoController));
}