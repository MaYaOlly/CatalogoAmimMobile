import { Produto } from './Produto';

describe('Produto', () => {
  describe('Criação e Validação', () => {
    it('deve criar produto válido', () => {
      const produto = new Produto('1', 'Bolo de Chocolate', 'Bolo a base de chocolate', 25, 'bolos', 'img.jpg', true);

      expect(produto.id).toBe('1');
      expect(produto.nome).toBe('Bolo de Chocolate');
      expect(produto.preco).toBe(25);
    });

    it('deve lançar erro com nome vazio', () => {
      expect(() => new Produto('1', '', 'Desc', 100, 'teste', null, true)).toThrow('Nome do produto é obrigatório');
    });

    it('deve lançar erro com preço inválido', () => {
      expect(() => new Produto('1', 'Produto', 'Desc', 0, 'teste', null, true)).toThrow('Preço inválido');
      expect(() => new Produto('1', 'Produto', 'Desc', -10, 'teste', null, true)).toThrow('Preço inválido');
    });
  });

  describe('alterarNome', () => {
    it('deve alterar nome com sucesso', () => {
      const produto = new Produto('1', 'Nome Antigo', 'Desc', 100, 'teste', null, true);

      produto.alterarNome('Nome Novo');

      expect(produto.nome).toBe('Nome Novo');
    });

    it('deve lançar erro com nome vazio', () => {
      const produto = new Produto('1', 'Nome', 'Desc', 100, 'teste', null, true);

      expect(() => produto.alterarNome('')).toThrow('Nome inválido');
    });
  });

  describe('alterarPreco', () => {
    it('deve alterar preço com sucesso', () => {
      const produto = new Produto('1', 'Produto', 'Desc', 100, 'teste', null, true);

      produto.alterarPreco(150);

      expect(produto.preco).toBe(150);
    });

    it('deve lançar erro com preço inválido', () => {
      const produto = new Produto('1', 'Produto', 'Desc', 100, 'teste', null, true);

      expect(() => produto.alterarPreco(0)).toThrow('Preço inválido');
      expect(() => produto.alterarPreco(-50)).toThrow('Preço inválido');
    });
  });

  describe('alterarDisponibilidade', () => {
    it('deve alterar disponibilidade', () => {
      const produto = new Produto('1', 'Produto', 'Desc', 100, 'teste', null, true);

      produto.alterarDisponibilidade(false);

      expect(produto.disponivel).toBe(false);
    });
  });

  describe('atualizar', () => {
    it('deve atualizar múltiplos campos', () => {
      const produto = new Produto('1', 'Nome', 'Desc', 100, 'teste', null, true);

      produto.atualizar({ nome: 'Nome Novo', preco: 200, categoria: 'Novo teste' });

      expect(produto.nome).toBe('Nome Novo');
      expect(produto.preco).toBe(200);
      expect(produto.categoria).toBe('Novo teste');
    });

    it('deve atualizar apenas campos fornecidos', () => {
      const produto = new Produto('1', 'Nome', 'Desc', 100, 'teste', 'img.jpg', true);

      produto.atualizar({ nome: 'Nome Novo' });

      expect(produto.nome).toBe('Nome Novo');
      expect(produto.preco).toBe(100);
    });
  });
});
