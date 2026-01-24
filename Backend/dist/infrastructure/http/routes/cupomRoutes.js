"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cupomRoutes = cupomRoutes;
const container_1 = require("../container");
/**
 * Registra as rotas de cupons na instância Fastify.
 * Define os endpoints para criar cupons de desconto.
 * @param fastify - Instância do Fastify para registrar as rotas
 */
async function cupomRoutes(fastify) {
    /** GET /cupons - Lista todos os cupons de desconto */
    fastify.get('/cupons', container_1.cupomController.listarCupons.bind(container_1.cupomController));
    /** POST /cupons - Cria um novo cupom de desconto */
    fastify.post('/cupons', container_1.cupomController.criarCupom.bind(container_1.cupomController));
}
