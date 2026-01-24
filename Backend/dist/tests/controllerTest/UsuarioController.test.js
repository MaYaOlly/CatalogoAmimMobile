"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioController_1 = require("../../infrastructure/http/controllers/UsuarioController");
const Usuario_1 = require("../../domain/models/class/Usuario");
describe('UsuarioController', () => {
    let usuarioController;
    let mockUsuarioService;
    let mockRequest;
    let mockReply;
    beforeEach(() => {
        mockUsuarioService = {
            criarUsuario: jest.fn(),
            autenticar: jest.fn(),
            atualizarPerfilUsuario: jest.fn(),
            buscarUsuarioPorId: jest.fn(),
        };
        usuarioController = new UsuarioController_1.UsuarioController(mockUsuarioService);
        mockReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
    });
    describe('criar', () => {
        it('deve criar usuário com sucesso', async () => {
            const usuario = new Usuario_1.Usuario('1', 'João', 'joao@email.com', 'hash', 'rua 10', null);
            mockRequest = { body: { nome: 'João', email: 'joao@email.com', senha: 'senha123' } };
            mockUsuarioService.criarUsuario.mockResolvedValue(usuario);
            await usuarioController.criar(mockRequest, mockReply);
            expect(mockUsuarioService.criarUsuario).toHaveBeenCalledWith(mockRequest.body);
            expect(mockReply.status).toHaveBeenCalledWith(201);
            expect(mockReply.send).toHaveBeenCalledWith({ id: '1', nome: 'João', email: 'joao@email.com', endereco: "rua 10" });
        });
        it('deve retornar erro 400 quando falha', async () => {
            mockRequest = { body: { nome: 'João', email: 'invalido', senha: '123' } };
            mockUsuarioService.criarUsuario.mockRejectedValue(new Error('Email inválido'));
            await usuarioController.criar(mockRequest, mockReply);
            expect(mockReply.status).toHaveBeenCalledWith(400);
            expect(mockReply.send).toHaveBeenCalledWith({ message: 'Email inválido' });
        });
    });
    describe('autenticar', () => {
        it('deve autenticar usuário com sucesso', async () => {
            const usuario = new Usuario_1.Usuario('1', 'João', 'joao@email.com', 'hash', 'rua 10', null);
            mockRequest = { body: { email: 'joao@email.com', senha: 'senha123' } };
            mockUsuarioService.autenticar.mockResolvedValue(usuario);
            await usuarioController.autenticar(mockRequest, mockReply);
            expect(mockUsuarioService.autenticar).toHaveBeenCalledWith(mockRequest.body);
            expect(mockReply.status).toHaveBeenCalledWith(200);
            expect(mockReply.send).toHaveBeenCalledWith({
                id: '1',
                nome: 'João',
                email: 'joao@email.com',
                endereco: 'rua 10',
                message: 'Login bem-sucedido!',
            });
        });
        it('deve retornar erro 401 quando credenciais inválidas', async () => {
            mockRequest = { body: { email: 'joao@email.com', senha: 'errada' } };
            mockUsuarioService.autenticar.mockRejectedValue(new Error('Credenciais inválidas'));
            await usuarioController.autenticar(mockRequest, mockReply);
            expect(mockReply.status).toHaveBeenCalledWith(401);
            expect(mockReply.send).toHaveBeenCalledWith({ message: 'Credenciais inválidas' });
        });
    });
    describe('atualizarPerfil', () => {
        it('deve atualizar perfil com sucesso', async () => {
            const usuario = new Usuario_1.Usuario('1', 'João Silva', 'joao@email.com', 'hash', 'Rua A', '11999999999');
            mockRequest = { params: { id: '1' }, body: { nome: 'João Silva', endereco: 'Rua A', telefone: '11999999999' } };
            mockUsuarioService.atualizarPerfilUsuario.mockResolvedValue(usuario);
            await usuarioController.atualizarPerfil(mockRequest, mockReply);
            expect(mockUsuarioService.atualizarPerfilUsuario).toHaveBeenCalledWith('1', mockRequest.body);
            expect(mockReply.status).toHaveBeenCalledWith(200);
        });
        it('deve retornar erro 404 quando usuário não encontrado', async () => {
            mockRequest = { params: { id: '999' }, body: { nome: 'João' } };
            mockUsuarioService.atualizarPerfilUsuario.mockRejectedValue(new Error('Usuário não encontrado'));
            await usuarioController.atualizarPerfil(mockRequest, mockReply);
            expect(mockReply.status).toHaveBeenCalledWith(404);
            expect(mockReply.send).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
        });
        it('deve retornar erro 400 para outros erros', async () => {
            mockRequest = { params: { id: '1' }, body: { nome: '' } };
            mockUsuarioService.atualizarPerfilUsuario.mockRejectedValue(new Error('Nome inválido'));
            await usuarioController.atualizarPerfil(mockRequest, mockReply);
            expect(mockReply.status).toHaveBeenCalledWith(400);
            expect(mockReply.send).toHaveBeenCalledWith({ message: 'Nome inválido' });
        });
    });
});
