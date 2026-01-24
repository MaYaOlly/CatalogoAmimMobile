"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoController = void 0;
/**
 * Controller de pedidos.
 * Gerencia os handlers HTTP para operações com pedidos (criar, buscar, listar, confirmar, cancelar).
 */
class PedidoController {
    /**
     * Cria uma nova instância do PedidoController.
     * @param pedidoService - Service de pedidos para lógica de negócio
     */
    constructor(pedidoService) {
        this.pedidoService = pedidoService;
    }
    // Handler para criar um novo pedido
    async criar(request, reply) {
        try {
            const dadosPedido = request.body;
            const novoPedido = await this.pedidoService.criarPedido(dadosPedido);
            reply.status(201).send(novoPedido);
        }
        catch (error) {
            // Se o erro for por algo não encontrado ou regra de negócio, retorna 400
            if (error.message.includes('não encontrado') || error.message.includes('inválido')) {
                reply.status(400).send({ message: error.message });
            }
            else {
                // Para outros erros, um erro de servidor
                reply.status(500).send({ message: 'Erro interno ao criar o pedido.', error: error.message });
            }
        }
    }
    /**
     * Handler para buscar um pedido pelo seu ID.
     * @param request - Requisição HTTP contendo o ID do pedido
     * @param reply - Resposta HTTP
     * @returns Dados do pedido encontrado com status 200 ou erro 404
     */
    async buscarPorId(request, reply) {
        try {
            const { id } = request.params;
            const pedido = await this.pedidoService.buscarPedidoPorId(id);
            reply.status(200).send(pedido);
        }
        catch (error) {
            reply.status(404).send({ message: error.message });
        }
    }
    /**
     * Handler para listar os pedidos de um usuário específico.
     * @param request - Requisição HTTP contendo o ID do usuário
     * @param reply - Resposta HTTP
     * @returns Array de pedidos do usuário com status 200 ou erro 500
     */
    async listarPorUsuario(request, reply) {
        try {
            const { usuarioId } = request.params;
            const pedidos = await this.pedidoService.listarPedidosPorUsuario(usuarioId);
            reply.status(200).send(pedidos);
        }
        catch (error) {
            reply.status(500).send({ message: 'Erro interno ao listar os pedidos.', error: error.message });
        }
    }
    /**
     * Handler para confirmar um pedido.
     * @param request - Requisição HTTP contendo o ID do pedido
     * @param reply - Resposta HTTP
     * @returns Dados do pedido confirmado com status 200 ou erro 400
     */
    async confirmar(request, reply) {
        try {
            const { id } = request.params;
            const pedidoConfirmado = await this.pedidoService.confirmarPedido(id);
            reply.status(200).send(pedidoConfirmado);
        }
        catch (error) {
            reply.status(400).send({ message: error.message });
        }
    }
    /**
     * Handler para cancelar um pedido.
     * @param request - Requisição HTTP contendo o ID do pedido
     * @param reply - Resposta HTTP
     * @returns Dados do pedido cancelado com status 200 ou erro 400
     */
    async cancelar(request, reply) {
        try {
            const { id } = request.params;
            const pedidoCancelado = await this.pedidoService.cancelarPedido(id);
            reply.status(200).send(pedidoCancelado);
        }
        catch (error) {
            reply.status(400).send({ message: error.message });
        }
    }
}
exports.PedidoController = PedidoController;
