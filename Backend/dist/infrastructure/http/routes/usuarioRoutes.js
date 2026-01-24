"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRoutes = usuarioRoutes;
const container_1 = require("../container");
/**
 * Registra as rotas de usuários na instância Fastify.
 * Define os endpoints para criar usuário, autenticar (login) e atualizar perfil.
 * @param fastify - Instância do Fastify para registrar as rotas
 */
async function usuarioRoutes(fastify) {
    /** POST /usuarios - Cria um novo usuário (registro) */
    fastify.post('/usuarios', container_1.usuarioController.criar.bind(container_1.usuarioController));
    /** POST /login - Autentica um usuário (login) */
    fastify.post('/login', container_1.usuarioController.autenticar.bind(container_1.usuarioController));
    /** PATCH /usuarios/:id - Atualiza o perfil de um usuário */
    fastify.patch('/usuarios/:id', container_1.usuarioController.atualizarPerfil.bind(container_1.usuarioController));
}
