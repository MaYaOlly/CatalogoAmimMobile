import { FastifyRequest, FastifyReply } from 'fastify';
import { ProdutoService } from '../../../application/services/ProdutoService';

export class ProdutoController {
  constructor(private produtoService: ProdutoService) { }

  async listar(_req: FastifyRequest, reply: FastifyReply) {
    try {
      const produtos = await this.produtoService.listarProdutosDisponiveis();
      reply.send(produtos);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Erro ao listar produtos' });
    }
  }

  async buscarPorId(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };
      const produto = await this.produtoService.buscarProdutoPorId(id);
      if (!produto) {
        return reply.status(404).send({ message: 'Produto não encontrado' });
      }

      reply.send(produto);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Erro ao buscar produto' });
    }
  }

  async criar(req: FastifyRequest, reply: FastifyReply) {
    try {
      const {
        nome,
        descricao,
        preco,
        categoria,
        imagem,
        disponivel,
      } = req.body as {
        nome: string;
        descricao: string;
        preco: number;
        categoria: string;
        imagem: string;
        disponivel: boolean;
      };

      const novoProduto = await this.produtoService.criarProduto(
        nome,
        descricao,
        preco,
        categoria,
        imagem,
        disponivel
      );

      reply.status(201).send(novoProduto);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Erro ao criar produto' });
    }
  }

  async atualizar(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };
      const dadosAtualizacao = req.body as Partial<{
        nome: string;
        descricao: string;
        preco: number;
        categoria: string;
        imagem: string;
        disponivel: boolean;
      }>;

      const produtoAtualizado =
        await this.produtoService.atualizarProduto(id, dadosAtualizacao);

      if (!produtoAtualizado) {
        return reply
          .status(404)
          .send({ message: 'Produto não encontrado para atualização' });
      }

      reply.send(produtoAtualizado);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Erro ao atualizar produto' });
    }
  }

  async deletar(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };

      const sucesso = await this.produtoService.deletarProduto(id);
      if (!sucesso) {
        return reply
          .status(404)
          .send({ message: 'Produto não encontrado para deleção' });
      }

      reply.status(204).send();
    } catch (error) {
      console.error(error);
      reply.status(500).send({ message: 'Erro ao deletar produto' });
    }
  }
}
