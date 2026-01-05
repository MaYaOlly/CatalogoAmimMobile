import { FastifyInstance } from 'fastify';
import { usuarioController } from '../container';

/**
 * Registra as rotas de usuários na instância Fastify.
 * Define os endpoints para criar usuário, autenticar (login) e atualizar perfil.
 * @param fastify - Instância do Fastify para registrar as rotas
 */
export async function usuarioRoutes(fastify: FastifyInstance) {
  /** POST /usuarios - Cria um novo usuário (registro) */
  fastify.post('/usuarios', usuarioController.criar.bind(usuarioController));
  
  /** POST /login - Autentica um usuário (login) */
  fastify.post('/login', usuarioController.autenticar.bind(usuarioController));
  
  /** PATCH /usuarios/:id - Atualiza o perfil de um usuário */
  fastify.patch('/usuarios/:id', usuarioController.atualizarPerfil.bind(usuarioController));
}