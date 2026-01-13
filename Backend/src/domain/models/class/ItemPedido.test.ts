import { ItemPedido } from './ItemPedido';
import { Produto } from './Produto';

describe('ItemPedido', () => {
  const mockProduto = new Produto('1', 'Notebook', 'Notebook Dell', 2500, 'Eletrônicos', 'img.jpg', true);

  describe('Criação e Validação', () => {
    it('deve criar item de pedido válido', () => {
      const item = new ItemPedido('1', mockProduto, 2, 2500, 'pedido1');

      expect(item.id).toBe('1');
      expect(item.produto).toBe(mockProduto);
      expect(item.quantidade).toBe(2);
      expect(item.precoUnitario).toBe(2500);
      expect(item.pedidoId).toBe('pedido1');
    });

    it('deve lançar erro sem produto', () => {
      expect(() => new ItemPedido('1', null as any, 2, 100, 'pedido1')).toThrow('Produto é obrigatório');
    });

    it('deve lançar erro com quantidade inválida', () => {
      expect(() => new ItemPedido('1', mockProduto, 0, 100, 'pedido1')).toThrow('Quantidade deve ser maior que zero');
      expect(() => new ItemPedido('1', mockProduto, -1, 100, 'pedido1')).toThrow('Quantidade deve ser maior que zero');
    });

    it('deve lançar erro com preço unitário inválido', () => {
      expect(() => new ItemPedido('1', mockProduto, 2, 0, 'pedido1')).toThrow('Preço unitário inválido');
      expect(() => new ItemPedido('1', mockProduto, 2, -100, 'pedido1')).toThrow('Preço unitário inválido');
    });
  });

  describe('Cálculo de Subtotal', () => {
    it('deve calcular subtotal corretamente', () => {
      const item = new ItemPedido('1', mockProduto, 3, 100, 'pedido1');

      expect(item.subtotal).toBe(300);
    });

    it('deve calcular subtotal com quantidade 1', () => {
      const item = new ItemPedido('1', mockProduto, 1, 250, 'pedido1');

      expect(item.subtotal).toBe(250);
    });

    it('deve calcular subtotal com valores decimais', () => {
      const item = new ItemPedido('1', mockProduto, 2, 99.99, 'pedido1');

      expect(item.subtotal).toBeCloseTo(199.98, 2);
    });
  });
});
