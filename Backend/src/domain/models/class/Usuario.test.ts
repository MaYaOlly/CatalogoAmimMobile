import { Usuario } from './Usuario';

describe('Usuario', () => {
  describe('Criação e Validação', () => {
    it('deve criar usuário válido', () => {
      const usuario = new Usuario('1', 'João Silva', 'joao@email.com', 'hash_senha', 'Rua A, 123', '11999999999');

      expect(usuario.id).toBe('1');
      expect(usuario.nome).toBe('João Silva');
      expect(usuario.email).toBe('joao@email.com');
    });

    it('deve lançar erro com nome inválido', () => {
      expect(() => new Usuario('1', '', 'email@test.com', 'hash', null, null)).toThrow('Nome invalido');
      expect(() => new Usuario('1', 'A', 'email@test.com', 'hash', null, null)).toThrow('Nome invalido');
    });

    it('deve lançar erro com email inválido', () => {
      expect(() => new Usuario('1', 'João', '', 'hash', null, null)).toThrow('Email inválido');
      expect(() => new Usuario('1', 'João', 'invalido', 'hash', null, null)).toThrow('Email inválido');
    });

    it('deve lançar erro com senha inválida', () => {
      expect(() => new Usuario('1', 'João', 'joao@email.com', '', null, null)).toThrow('Senha inválida');
      expect(() => new Usuario('1', 'João', 'joao@email.com', '123', null, null)).toThrow('Senha inválida');
    });
  });

  describe('verificarSenha', () => {
    it('deve verificar senha correta', async () => {
      const usuario = new Usuario('1', 'João', 'joao@email.com', 'hash_senha', null, null);
      const comparador = jest.fn().mockResolvedValue(true);

      const resultado = await usuario.verificarSenha('senha123', comparador);

      expect(resultado).toBe(true);
      expect(comparador).toHaveBeenCalledWith('senha123', 'hash_senha');
    });

    it('deve retornar false quando incorreta', async () => {
      const usuario = new Usuario('1', 'João', 'joao@email.com', 'hash', null, null);
      const comparador = jest.fn().mockResolvedValue(false);

      const resultado = await usuario.verificarSenha('senha_errada', comparador);

      expect(resultado).toBe(false);
    });
  });

  describe('atualizarPerfil', () => {
    it('deve atualizar perfil com sucesso', () => {
      const usuario = new Usuario('1', 'Nome', 'email@test.com', 'hash', 'End', '111');

      usuario.atualizarPerfil('Nome Novo', 'End Novo', '222');

      expect(usuario.nome).toBe('Nome Novo');
      expect(usuario.endereco).toBe('End Novo');
      expect(usuario.telefone).toBe('222');
    });

    it('deve lançar erro com nome inválido', () => {
      const usuario = new Usuario('1', 'João', 'joao@email.com', 'hash', null, null);

      expect(() => usuario.atualizarPerfil('', 'End', '111')).toThrow('Nome invalido');
    });

    it('não deve alterar email', () => {
      const usuario = new Usuario('1', 'João', 'joao@email.com', 'hash', null, null);

      usuario.atualizarPerfil('João Santos', 'Nova Rua', '999');

      expect(usuario.email).toBe('joao@email.com');
    });
  });

    it('não deve permitir alteração do email após criação', () => {
      const usuario = new Usuario(
        '1',
        'João Silva',
        'joao@email.com',
        'hash',
        null,
        null
      );

      const emailOriginal = usuario.email;
      expect(usuario.email).toBe(emailOriginal);
    });
});
