"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pedidoRoutes = pedidoRoutes;
const container_1 = require("../container");
/**
 * Registra as rotas de pedidos na instância Fastify.
 * Define os endpoints para criar, buscar, listar, confirmar e cancelar pedidos.
 * @param fastify - Instância do Fastify para registrar as rotas
 */
async function pedidoRoutes(fastify) {
    /** POST /pedidos - Cria um novo pedido */
    fastify.post('/pedidos', container_1.pedidoController.criar.bind(container_1.pedidoController));
    /** GET /pedidos/:id - Busca um pedido pelo seu ID */
    fastify.get('/pedidos/:id', container_1.pedidoController.buscarPorId.bind(container_1.pedidoController));
    /** GET /pedidos/usuario/:usuarioId - Lista pedidos de um usuário */
    fastify.get('/pedidos/usuario/:usuarioId', container_1.pedidoController.listarPorUsuario.bind(container_1.pedidoController));
    /** PATCH /pedidos/:id/confirmar - Confirma um pedido */
    fastify.patch('/pedidos/:id/confirmar', container_1.pedidoController.confirmar.bind(container_1.pedidoController));
    /** PATCH /pedidos/:id/cancelar - Cancela um pedido */
    fastify.patch('/pedidos/:id/cancelar', container_1.pedidoController.cancelar.bind(container_1.pedidoController));
}
