import { FastifyInstance } from 'fastify';
import { ProdutoController } from '../controllers/ProdutoController';
import { PrismaClient } from '@prisma/client';
import { PrismaProdutoRepository } from '../../repository/PrismaProdutoRepository';
import { ProdutoService } from '../../../application/services/ProdutoService';

const prisma = new PrismaClient();
const produtoRepository = new PrismaProdutoRepository(prisma);
const produtoService = new ProdutoService(produtoRepository);
const produtoController = new ProdutoController(produtoService);

export async function produtoRoutes(app: FastifyInstance) {
  app.get('/produtos', (req, reply) => produtoController.listar(req, reply));
  
  app.get('/produtos/:id', (req, reply) => produtoController.buscarPorId(req, reply));

  app.post('/produtos', (req, reply) => produtoController.criar(req, reply));

  app.patch('/produtos/:id', (req, reply) => produtoController.atualizar(req, reply));

  app.delete('/produtos/:id', (req, reply) => produtoController.deletar(req, reply));
}