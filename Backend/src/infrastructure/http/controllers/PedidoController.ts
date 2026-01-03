import { FastifyRequest, FastifyReply } from 'fastify';
import { PedidoService, CriarPedidoDTO } from '../../../application/services/PedidoService';

export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  // Handler para criar um novo pedido
  async criar(request: FastifyRequest<{ Body: CriarPedidoDTO }>, reply: FastifyReply) {
    try {
      const dadosPedido = request.body;
      const novoPedido = await this.pedidoService.criarPedido(dadosPedido);
      reply.status(201).send(novoPedido);
    } catch (error: any) {
      // Se o erro for por algo não encontrado ou regra de negócio, retorna 400
      if (error.message.includes('não encontrado') || error.message.includes('inválido')) {
        reply.status(400).send({ message: error.message });
      } else {
        // Para outros erros, um erro de servidor
        reply.status(500).send({ message: 'Erro interno ao criar o pedido.', error: error.message });
      }
    }
  }

  // Handler para buscar um pedido pelo seu ID
  async buscarPorId(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const pedido = await this.pedidoService.buscarPedidoPorId(id);
      reply.status(200).send(pedido);
    } catch (error: any) {
      reply.status(404).send({ message: error.message });
    }
  }

  // Handler para listar os pedidos de um usuário específico
  async listarPorUsuario(request: FastifyRequest<{ Params: { usuarioId: string } }>, reply: FastifyReply) {
    try {
      const { usuarioId } = request.params;
      const pedidos = await this.pedidoService.listarPedidosPorUsuario(usuarioId);
      reply.status(200).send(pedidos);
    } catch (error: any) {
      reply.status(500).send({ message: 'Erro interno ao listar os pedidos.', error: error.message });
    }
  }

  // Handler para confirmar um pedido
  async confirmar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const pedidoConfirmado = await this.pedidoService.confirmarPedido(id);
      reply.status(200).send(pedidoConfirmado);
    } catch (error: any) {
      reply.status(400).send({ message: error.message });
    }
  }

  // Handler para cancelar um pedido
  async cancelar(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const pedidoCancelado = await this.pedidoService.cancelarPedido(id);
      reply.status(200).send(pedidoCancelado);
    } catch (error: any) {
      reply.status(400).send({ message: error.message });
    }
  }
}