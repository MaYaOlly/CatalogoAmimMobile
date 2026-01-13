import { Pedido, StatusPedido, FormaPagamento } from './Pedido';
import { ItemPedido } from './ItemPedido';
import { Cupom } from './Cupom';

describe('Pedido', () => {
  const mockItem1 = { subtotal: 100 } as ItemPedido;
  const mockItem2 = { subtotal: 50 } as ItemPedido;
  const dataAtual = new Date();

  describe('Criação e Validação', () => {
    it('deve criar pedido válido', () => {
      const pedido = new Pedido('1', 'user123', [mockItem1], 'pix', 'realizado', dataAtual);

      expect(pedido.id).toBe('1');
      expect(pedido.usuarioID).toBe('user123');
      expect(pedido.status).toBe('realizado');
      expect(pedido.precoTotal).toBe(100);
    });

    it('deve lançar erro com usuário vazio', () => {
      expect(() => new Pedido('1', '', [mockItem1], 'pix', 'realizado', dataAtual)).toThrow('Usuário é obrigatório');
    });

    it('deve lançar erro com itens vazios', () => {
      expect(() => new Pedido('1', 'user123', [], 'pix', 'realizado', dataAtual)).toThrow('O pedido deve ter pelo menos um item');
    });
  });

  describe('Cálculo de Preço', () => {
    it('deve calcular total com múltiplos itens', () => {
      const pedido = new Pedido('1', 'user123', [mockItem1, mockItem2], 'pix', 'realizado', dataAtual);

      expect(pedido.precoTotal).toBe(150);
    });
  });

  describe('Aplicar Cupom', () => {
    it('deve aplicar cupom válido', () => {
      const pedido = new Pedido('1', 'user123', [mockItem1], 'pix', 'realizado', dataAtual);
      const mockCupom = {
        estaValido: jest.fn().mockReturnValue(true),
        calcularDesconto: jest.fn().mockReturnValue(20),
      } as unknown as Cupom;

      pedido.aplicarCupom(mockCupom);

      expect(pedido.cupom).toBe(mockCupom);
      expect(pedido.precoTotal).toBe(80);
    });

    it('deve lançar erro com cupom inválido', () => {
      const pedido = new Pedido('1', 'user123', [mockItem1], 'pix', 'realizado', dataAtual);
      const mockCupom = {
        estaValido: jest.fn().mockReturnValue(false),
      } as unknown as Cupom;

      expect(() => pedido.aplicarCupom(mockCupom)).toThrow('Cupom inválido ou expirado');
    });
  });

  describe('Confirmar Pedido', () => {
    it('deve confirmar pedido realizado', () => {
      const pedido = new Pedido('1', 'user123', [mockItem1], 'pix', 'realizado', dataAtual);

      pedido.confirmar();

      expect(pedido.status).toBe('confirmado');
    });

    it('deve lançar erro ao confirmar pedido não realizado', () => {
      const pedido = new Pedido('1', 'user123', [mockItem1], 'pix', 'pendente', dataAtual);

      expect(() => pedido.confirmar()).toThrow('Apenas pedidos realizados podem ser confirmados');
    });
  });

  describe('Cancelar Pedido', () => {
    it('deve cancelar pedido pendente', () => {
      const pedido = new Pedido('1', 'user123', [mockItem1], 'pix', 'pendente', dataAtual);

      pedido.cancelar();

      expect(pedido.status).toBe('cancelado');
    });

    it('deve cancelar pedido realizado', () => {
      const pedido = new Pedido('1', 'user123', [mockItem1], 'pix', 'realizado', dataAtual);

      pedido.cancelar();

      expect(pedido.status).toBe('cancelado');
    });

    it('deve lançar erro ao cancelar pedido enviado', () => {
      const pedido = new Pedido('1', 'user123', [mockItem1], 'pix', 'enviado', dataAtual);

      expect(() => pedido.cancelar()).toThrow('Este pedido não pode mais ser cancelado');
    });

    it('deve lançar erro ao cancelar pedido já cancelado', () => {
      const pedido = new Pedido('1', 'user123', [mockItem1], 'pix', 'cancelado', dataAtual);

      expect(() => pedido.cancelar()).toThrow('Este pedido não pode mais ser cancelado');
    });
  });
});