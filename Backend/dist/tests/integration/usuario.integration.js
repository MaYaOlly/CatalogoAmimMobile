"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioService_1 = require("../../application/services/UsuarioService");
const PrismaUsuarioRepository_1 = require("../../infrastructure/repository/PrismaUsuarioRepository");
const PrismaClient_1 = require("../../infrastructure/prisma/PrismaClient");
describe('Usuários - Integração (Service + Repository + DB)', () => {
    let usuarioService;
    let repository;
    beforeAll(() => {
        repository = new PrismaUsuarioRepository_1.PrismaUsuarioRepository(PrismaClient_1.prisma);
        usuarioService = new UsuarioService_1.UsuarioService(repository);
    });
    afterAll(async () => {
        await PrismaClient_1.prisma.$disconnect();
    });
    it('deve criar usuário no banco', async () => {
        const emailUnico = `joao${Date.now()}@teste.com`;
        const usuario = await usuarioService.criarUsuario({
            nome: 'João Silva',
            email: emailUnico,
            senha: 'senha123',
            endereco: 'Rua Teste, 123',
            telefone: null
        });
        expect(usuario).toHaveProperty('id');
        expect(usuario.nome).toBe('João Silva');
        const usuarioNoBanco = await PrismaClient_1.prisma.usuario.findUnique({
            where: { email: emailUnico }
        });
        expect(usuarioNoBanco).toBeTruthy();
    });
    it('deve autenticar usuário com senha correta', async () => {
        const emailUnico = `maria${Date.now()}@teste.com`;
        await usuarioService.criarUsuario({
            nome: 'Maria',
            email: emailUnico,
            senha: 'senha123',
            endereco: 'Rua X',
            telefone: null
        });
        const usuario = await usuarioService.autenticar({
            email: emailUnico,
            senha: 'senha123'
        });
        expect(usuario).toHaveProperty('id');
        expect(usuario.email).toBe(emailUnico);
    });
    it('deve rejeitar senha incorreta', async () => {
        const emailUnico = `pedro${Date.now()}@teste.com`;
        await usuarioService.criarUsuario({
            nome: 'Pedro',
            email: emailUnico,
            senha: 'senha123',
            endereco: 'Rua Y',
            telefone: null
        });
        await expect(usuarioService.autenticar({
            email: emailUnico,
            senha: 'senhaErrada'
        })).rejects.toThrow();
    });
});
