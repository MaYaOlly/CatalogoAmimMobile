import { UsuarioService } from '../../application/services/UsuarioService';
import { PrismaUsuarioRepository } from '../../infrastructure/repository/PrismaUsuarioRepository';
import { prisma } from '../../infrastructure/prisma/PrismaClient';

describe('Usuários - Integração (Service + Repository + DB)', () => {
  let usuarioService: UsuarioService;
  let repository: PrismaUsuarioRepository;

  beforeAll(() => {
    repository = new PrismaUsuarioRepository(prisma);
    usuarioService = new UsuarioService(repository);
  });

  afterAll(async () => {
    await prisma.$disconnect();
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

    const usuarioNoBanco = await prisma.usuario.findUnique({
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

    await expect(
      usuarioService.autenticar({
        email: emailUnico,
        senha: 'senhaErrada'
      })
    ).rejects.toThrow();
  });
});
