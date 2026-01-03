import { FastifyInstance } from 'fastify';
import { produtoController } from '../container';

/**
 * Registra as rotas de produtos na instância Fastify.
 * Define os endpoints para listar, buscar, criar, atualizar e deletar produtos.
 * @param app - Instância do Fastify para registrar as rotas
 */
export async function produtoRoutes(app: FastifyInstance) {
  /** GET /produtos - Lista todos os produtos disponíveis */
  app.get('/produtos', produtoController.listar.bind(produtoController));
  
  /** GET /produtos/:id - Busca um produto pelo seu ID */
  app.get('/produtos/:id', produtoController.buscarPorId.bind(produtoController));
  
  /** POST /produtos - Cria um novo produto */
  app.post('/produtos', produtoController.criar.bind(produtoController));
  
  /** PATCH /produtos/:id - Atualiza um produto existente */
  app.patch('/produtos/:id', produtoController.atualizar.bind(produtoController));
  
  /** DELETE /produtos/:id - Deleta um produto */
  app.delete('/produtos/:id', produtoController.deletar.bind(produtoController));
}