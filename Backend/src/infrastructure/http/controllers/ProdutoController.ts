import { FastifyRequest, FastifyReply } from 'fastify';
import { ProdutoService } from '../../../application/services/ProdutoService';

/**
 * Controller de produtos.
 * Gerencia os handlers HTTP para operações com produtos (listar, buscar, criar, atualizar, deletar).
 */
export class ProdutoController {
  /**
   * Cria uma nova instância do ProdutoController.
   * @param produtoService - Service de produtos para lógica de negócio
   */
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

  /**
   * Handler para buscar um produto pelo seu ID.
   * @param req - Requisição HTTP contendo o ID do produto
   * @param reply - Resposta HTTP
   * @returns Dados do produto encontrado ou erro 404/500
   */
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
  /**
   * Handler para listar todos os produtos disponíveis.
   * @param _req - Requisição HTTP
   * @param reply - Resposta HTTP
   * @returns Array de produtos disponíveis ou erro 500
   */  /**
   * Handler para criar um novo produto.
   * @param req - Requisição HTTP contendo os dados do produto
   * @param reply - Resposta HTTP
   * @returns Resposta com status 201 e dados do produto criado ou erro 500
   */
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

  /**
   * Handler para atualizar um produto existente.
   * @param req - Requisição HTTP contendo o ID e dados a atualizar
   * @param reply - Resposta HTTP
   * @returns Dados do produto atualizado ou erro 404/500
   */
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

  /**
   * Handler para deletar um produto.
   * @param req - Requisição HTTP contendo o ID do produto
   * @param reply - Resposta HTTP
   * @returns Resposta com status 204 ao deletar com sucesso ou erro 404/500
   */
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
