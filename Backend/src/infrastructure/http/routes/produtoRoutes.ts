import { FastifyInstance } from 'fastify';
import { produtoController } from '../container'; // Importa o controller pronto!

export async function produtoRoutes(app: FastifyInstance) {
  app.get('/produtos', produtoController.listar.bind(produtoController));
  app.get('/produtos/:id', produtoController.buscarPorId.bind(produtoController));
  app.post('/produtos', produtoController.criar.bind(produtoController));
  app.patch('/produtos/:id', produtoController.atualizar.bind(produtoController));
  app.delete('/produtos/:id', produtoController.deletar.bind(produtoController));
}