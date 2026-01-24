"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.produtoRoutes = produtoRoutes;
const container_1 = require("../container");
/**
 * Registra as rotas de produtos na instância Fastify.
 * Define os endpoints para listar, buscar, criar, atualizar e deletar produtos.
 * @param app - Instância do Fastify para registrar as rotas
 */
async function produtoRoutes(app) {
    /** GET /produtos - Lista todos os produtos disponíveis */
    app.get('/produtos', container_1.produtoController.listar.bind(container_1.produtoController));
    /** GET /produtos/:id - Busca um produto pelo seu ID */
    app.get('/produtos/:id', container_1.produtoController.buscarPorId.bind(container_1.produtoController));
    /** POST /produtos - Cria um novo produto */
    app.post('/produtos', container_1.produtoController.criar.bind(container_1.produtoController));
    /** PATCH /produtos/:id - Atualiza um produto existente */
    app.patch('/produtos/:id', container_1.produtoController.atualizar.bind(container_1.produtoController));
    /** DELETE /produtos/:id - Deleta um produto */
    app.delete('/produtos/:id', container_1.produtoController.deletar.bind(container_1.produtoController));
}
