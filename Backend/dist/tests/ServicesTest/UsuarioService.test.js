"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioService_1 = require("../../application/services/UsuarioService");
const Usuario_1 = require("../../domain/models/class/Usuario");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
jest.mock('bcryptjs');
describe('UsuarioService', () => {
    let usuarioService;
    let mockUsuarioRepository;
    beforeEach(() => {
        mockUsuarioRepository = {
            criar: jest.fn(),
            buscarPorId: jest.fn(),
            buscarPorEmail: jest.fn(),
            atualizar: jest.fn(),
        };
        usuarioService = new UsuarioService_1.UsuarioService(mockUsuarioRepository);
        jest.clearAllMocks();
    });
    describe('criarUsuario', () => {
        it('deve criar um usuário com sucesso', async () => {
            const dadosUsuario = { nome: 'João', email: 'joao@email.com', senha: 'senha123', endereco: 'Rua A', telefone: '11999999999' };
            const usuario = new Usuario_1.Usuario('1', 'João', 'joao@email.com', 'hash', 'Rua A', '11999999999');
            mockUsuarioRepository.buscarPorEmail.mockResolvedValue(null);
            bcryptjs_1.default.hash.mockResolvedValue('hash');
            mockUsuarioRepository.criar.mockResolvedValue(usuario);
            const resultado = await usuarioService.criarUsuario(dadosUsuario);
            expect(resultado).toEqual(usuario);
            expect(bcryptjs_1.default.hash).toHaveBeenCalledWith('senha123', 10);
        });
        it('deve lançar erro quando email já está em uso', async () => {
            const usuarioExistente = new Usuario_1.Usuario('1', 'Outro', 'joao@email.com', 'hash', null, null);
            mockUsuarioRepository.buscarPorEmail.mockResolvedValue(usuarioExistente);
            await expect(usuarioService.criarUsuario({ nome: 'João', email: 'joao@email.com', senha: 'senha123', endereco: null, telefone: null }))
                .rejects.toThrow('O e-mail fornecido já está em uso.');
        });
        it('deve criptografar a senha antes de criar', async () => {
            mockUsuarioRepository.buscarPorEmail.mockResolvedValue(null);
            bcryptjs_1.default.hash.mockResolvedValue('hash_criptografado');
            mockUsuarioRepository.criar.mockImplementation((usuario) => Promise.resolve(usuario));
            await usuarioService.criarUsuario({ nome: 'Carlos', email: 'carlos@email.com', senha: 'minhasenha', endereco: null, telefone: null });
            expect(bcryptjs_1.default.hash).toHaveBeenCalledWith('minhasenha', 10);
        });
    });
    describe('buscarUsuarioPorId', () => {
        it('deve retornar usuário quando encontrado', async () => {
            const usuario = new Usuario_1.Usuario('1', 'João', 'joao@email.com', 'hash', null, null);
            mockUsuarioRepository.buscarPorId.mockResolvedValue(usuario);
            const resultado = await usuarioService.buscarUsuarioPorId('1');
            expect(resultado).toEqual(usuario);
        });
        it('deve retornar null quando não encontrado', async () => {
            mockUsuarioRepository.buscarPorId.mockResolvedValue(null);
            const resultado = await usuarioService.buscarUsuarioPorId('999');
            expect(resultado).toBeNull();
        });
    });
    describe('autenticar', () => {
        it('deve autenticar usuário com credenciais corretas', async () => {
            const usuario = new Usuario_1.Usuario('1', 'João', 'joao@email.com', 'hash', null, null);
            mockUsuarioRepository.buscarPorEmail.mockResolvedValue(usuario);
            bcryptjs_1.default.compare.mockResolvedValue(true);
            const resultado = await usuarioService.autenticar({ email: 'joao@email.com', senha: 'senha123' });
            expect(resultado).toEqual(usuario);
            expect(bcryptjs_1.default.compare).toHaveBeenCalledWith('senha123', 'hash');
        });
        it('deve lançar erro quando usuário não é encontrado', async () => {
            mockUsuarioRepository.buscarPorEmail.mockResolvedValue(null);
            await expect(usuarioService.autenticar({ email: 'naoexiste@email.com', senha: 'senha123' }))
                .rejects.toThrow('Credenciais inválidas.');
            expect(bcryptjs_1.default.compare).not.toHaveBeenCalled();
        });
        it('deve lançar erro quando senha está incorreta', async () => {
            const usuario = new Usuario_1.Usuario('1', 'João', 'joao@email.com', 'hash', null, null);
            mockUsuarioRepository.buscarPorEmail.mockResolvedValue(usuario);
            bcryptjs_1.default.compare.mockResolvedValue(false);
            await expect(usuarioService.autenticar({ email: 'joao@email.com', senha: 'senha_errada' }))
                .rejects.toThrow('Credenciais inválidas.');
        });
    });
    describe('atualizarPerfilUsuario', () => {
        it('deve atualizar perfil do usuário com sucesso', async () => {
            const usuario = new Usuario_1.Usuario('1', 'Nome Original', 'email@test.com', 'hash', 'Endereço Original', '11111111111');
            const dadosAtualizacao = { nome: 'Nome Atualizado', endereco: 'Novo Endereço', telefone: '22222222222' };
            mockUsuarioRepository.buscarPorId.mockResolvedValue(usuario);
            mockUsuarioRepository.atualizar.mockImplementation((u) => Promise.resolve(u));
            const resultado = await usuarioService.atualizarPerfilUsuario('1', dadosAtualizacao);
            expect(resultado.nome).toBe('Nome Atualizado');
            expect(resultado.endereco).toBe('Novo Endereço');
        });
        it('deve lançar erro quando usuário não é encontrado', async () => {
            mockUsuarioRepository.buscarPorId.mockResolvedValue(null);
            await expect(usuarioService.atualizarPerfilUsuario('999', { nome: 'Nome', endereco: null, telefone: null }))
                .rejects.toThrow('Usuário não encontrado.');
        });
        it('não deve alterar email do usuário', async () => {
            const usuario = new Usuario_1.Usuario('1', 'João', 'joao@email.com', 'hash', null, null);
            mockUsuarioRepository.buscarPorId.mockResolvedValue(usuario);
            mockUsuarioRepository.atualizar.mockImplementation((u) => Promise.resolve(u));
            const resultado = await usuarioService.atualizarPerfilUsuario('1', { nome: 'João Santos', endereco: 'Nova Rua', telefone: '11999999999' });
            expect(resultado.email).toBe('joao@email.com');
        });
    });
});
