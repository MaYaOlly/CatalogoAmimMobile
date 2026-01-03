import { FastifyRequest, FastifyReply } from 'fastify';
import { UsuarioService, CriarUsuarioDTO, AutenticarUsuarioDTO, AtualizarPerfilDTO } from '../../../application/services/UsuarioService';

/**
 * Controller de usuários.
 * Gerencia os handlers HTTP para operações com usuários (criar, autenticar, atualizar perfil).
 */
export class UsuarioController {
  /**
   * Cria uma nova instância do UsuarioController.
   * @param usuarioService - Service de usuários para lógica de negócio
   */
  constructor(private usuarioService: UsuarioService) {}

  // Handler para criar um novo usuário (registro)
  async criar(request: FastifyRequest<{ Body: CriarUsuarioDTO }>, reply: FastifyReply) {
    try {
      const dadosUsuario = request.body;
      const novoUsuario = await this.usuarioService.criarUsuario(dadosUsuario);
      
      const resposta = {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      };

      reply.status(201).send(resposta);
    } catch (error: any) {
      reply.status(400).send({ message: error.message });
    }
  }

  /**
   * Handler para autenticar um usuário (login).
   * @param request - Requisição HTTP contendo email e senha
   * @param reply - Resposta HTTP
   * @returns Resposta com status 200 e dados do usuário autenticado ou erro 401
   */
  async autenticar(request: FastifyRequest<{ Body: AutenticarUsuarioDTO }>, reply: FastifyReply) {
    try {
      const credenciais = request.body;
      const usuario = await this.usuarioService.autenticar(credenciais);
      
      const resposta = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        message: "Login bem-sucedido!"
      };

      reply.status(200).send(resposta);

    } catch (error: any) {
      reply.status(401).send({ message: error.message });
    }
  }

  /**
   * Handler para atualizar o perfil de um usuário.
   * @param request - Requisição HTTP contendo o ID do usuário e dados a atualizar
   * @param reply - Resposta HTTP
   * @returns Resposta com status 200 e dados atualizados, ou erro 404/400
   */
  async atualizarPerfil(request: FastifyRequest<{ Params: { id: string }, Body: AtualizarPerfilDTO }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      const dados = request.body;

      const usuarioAtualizado = await this.usuarioService.atualizarPerfilUsuario(id, dados);

      const resposta = {
        id: usuarioAtualizado.id,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        endereco: usuarioAtualizado.endereco,
        telefone: usuarioAtualizado.telefone,
      };

      reply.status(200).send(resposta);
    } catch (error: any) {
      if (error.message.includes('não encontrado')) {
        reply.status(404).send({ message: error.message });
      } else {
        reply.status(400).send({ message: error.message });
      }
    }
  }
}