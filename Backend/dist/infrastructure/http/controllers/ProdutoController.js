"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoController = void 0;
/**
 * Controller de produtos.
 * Gerencia os handlers HTTP para operações com produtos (listar, buscar, criar, atualizar, deletar).
 */
class ProdutoController {
    /**
     * Cria uma nova instância do ProdutoController.
     * @param produtoService - Service de produtos para lógica de negócio
     */
    constructor(produtoService) {
        this.produtoService = produtoService;
    }
    async listar(_req, reply) {
        try {
            const produtos = await this.produtoService.listarProdutos();
            reply.send(produtos);
        }
        catch (error) {
            reply.status(500).send({ message: 'Erro ao listar produtos' });
        }
    }
    /**
     * Handler para buscar um produto pelo seu ID.
     * @param req - Requisição HTTP contendo o ID do produto
     * @param reply - Resposta HTTP
     * @returns Dados do produto encontrado ou erro 404/500
     */
    async buscarPorId(req, reply) {
        try {
            const { id } = req.params;
            const produto = await this.produtoService.buscarProdutoPorId(id);
            if (!produto) {
                return reply.status(404).send({ message: 'Produto não encontrado' });
            }
            reply.send(produto);
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ message: 'Erro ao buscar produto' });
        }
    }
    /**
     * Handler para listar todos os produtos disponíveis.
     * @param _req - Requisição HTTP
     * @param reply - Resposta HTTP
     * @returns Array de produtos disponíveis ou erro 500
     */ /**
    * Handler para criar um novo produto.
    * @param req - Requisição HTTP contendo os dados do produto
    * @param reply - Resposta HTTP
    * @returns Resposta com status 201 e dados do produto criado ou erro 500
    */
    async criar(req, reply) {
        try {
            const { nome, descricao, preco, categoria, imagem, disponivel, } = req.body;
            const novoProduto = await this.produtoService.criarProduto(nome, descricao, preco, categoria, imagem, disponivel);
            reply.status(201).send(novoProduto);
        }
        catch (error) {
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
    async atualizar(req, reply) {
        try {
            const { id } = req.params;
            const dadosAtualizacao = req.body;
            const produtoAtualizado = await this.produtoService.atualizarProduto(id, dadosAtualizacao);
            if (!produtoAtualizado) {
                return reply
                    .status(404)
                    .send({ message: 'Produto não encontrado para atualização' });
            }
            reply.send(produtoAtualizado);
        }
        catch (error) {
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
    async deletar(req, reply) {
        try {
            const { id } = req.params;
            const sucesso = await this.produtoService.deletarProduto(id);
            if (!sucesso) {
                return reply
                    .status(404)
                    .send({ message: 'Produto não encontrado para deleção' });
            }
            reply.status(204).send();
        }
        catch (error) {
            console.error(error);
            reply.status(500).send({ message: 'Erro ao deletar produto' });
        }
    }
}
exports.ProdutoController = ProdutoController;
