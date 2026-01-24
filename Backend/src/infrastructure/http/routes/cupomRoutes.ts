import { FastifyInstance } from 'fastify';
import { cupomController } from '../container'; 

/**
 * Registra as rotas de cupons na instância Fastify.
 * Define os endpoints para criar cupons de desconto.
 * @param fastify - Instância do Fastify para registrar as rotas
 */
export async function cupomRoutes(fastify: FastifyInstance) {
  /** GET /cupons - Lista todos os cupons de desconto */
  fastify.get('/cupons', cupomController.listarCupons.bind(cupomController));
  /** POST /cupons - Cria um novo cupom de desconto */
  fastify.post('/cupons', cupomController.criarCupom.bind(cupomController));
}