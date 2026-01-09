import { UsuarioController } from './UsuarioController';
import { UsuarioService } from '../../../application/services/UsuarioService';
import { Usuario } from '../../../domain/models/class/Usuario';
import { FastifyRequest, FastifyReply } from 'fastify';

describe('UsuarioController', () => {
  let usuarioController: UsuarioController;
  let mockUsuarioService: jest.Mocked<UsuarioService>;
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    mockUsuarioService = {
      criarUsuario: jest.fn(),
      autenticar: jest.fn(),
      atualizarPerfilUsuario: jest.fn(),
      buscarUsuarioPorId: jest.fn(),
    } as any;

    usuarioController = new UsuarioController(mockUsuarioService);

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  describe('criar', () => {
    it('deve criar usuário com sucesso', async () => {
      const usuario = new Usuario('1', 'João', 'joao@email.com', 'hash', null, null);
      mockRequest = { body: { nome: 'João', email: 'joao@email.com', senha: 'senha123' } };
      mockUsuarioService.criarUsuario.mockResolvedValue(usuario);

      await usuarioController.criar(mockRequest as any, mockReply as any);

      expect(mockUsuarioService.criarUsuario).toHaveBeenCalledWith(mockRequest.body);
      expect(mockReply.status).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith({ id: '1', nome: 'João', email: 'joao@email.com' });
    });

    it('deve retornar erro 400 quando falha', async () => {
      mockRequest = { body: { nome: 'João', email: 'invalido', senha: '123' } };
      mockUsuarioService.criarUsuario.mockRejectedValue(new Error('Email inválido'));

      await usuarioController.criar(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Email inválido' });
    });
  });

  describe('autenticar', () => {
    it('deve autenticar usuário com sucesso', async () => {
      const usuario = new Usuario('1', 'João', 'joao@email.com', 'hash', null, null);
      mockRequest = { body: { email: 'joao@email.com', senha: 'senha123' } };
      mockUsuarioService.autenticar.mockResolvedValue(usuario);

      await usuarioController.autenticar(mockRequest as any, mockReply as any);

      expect(mockUsuarioService.autenticar).toHaveBeenCalledWith(mockRequest.body);
      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        id: '1',
        nome: 'João',
        email: 'joao@email.com',
        message: 'Login bem-sucedido!',
      });
    });

    it('deve retornar erro 401 quando credenciais inválidas', async () => {
      mockRequest = { body: { email: 'joao@email.com', senha: 'errada' } };
      mockUsuarioService.autenticar.mockRejectedValue(new Error('Credenciais inválidas'));

      await usuarioController.autenticar(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(401);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Credenciais inválidas' });
    });
  });

  describe('atualizarPerfil', () => {
    it('deve atualizar perfil com sucesso', async () => {
      const usuario = new Usuario('1', 'João Silva', 'joao@email.com', 'hash', 'Rua A', '11999999999');
      mockRequest = { params: { id: '1' }, body: { nome: 'João Silva', endereco: 'Rua A', telefone: '11999999999' } };
      mockUsuarioService.atualizarPerfilUsuario.mockResolvedValue(usuario);

      await usuarioController.atualizarPerfil(mockRequest as any, mockReply as any);

      expect(mockUsuarioService.atualizarPerfilUsuario).toHaveBeenCalledWith('1', mockRequest.body);
      expect(mockReply.status).toHaveBeenCalledWith(200);
    });

    it('deve retornar erro 404 quando usuário não encontrado', async () => {
      mockRequest = { params: { id: '999' }, body: { nome: 'João' } };
      mockUsuarioService.atualizarPerfilUsuario.mockRejectedValue(new Error('Usuário não encontrado'));

      await usuarioController.atualizarPerfil(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
    });

    it('deve retornar erro 400 para outros erros', async () => {
      mockRequest = { params: { id: '1' }, body: { nome: '' } };
      mockUsuarioService.atualizarPerfilUsuario.mockRejectedValue(new Error('Nome inválido'));

      await usuarioController.atualizarPerfil(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Nome inválido' });
    });
  });
});
