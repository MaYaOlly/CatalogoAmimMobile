import { Cupom, TipoDesconto } from './Cupom';

describe('Cupom', () => {
  describe('Criação e Validação', () => {
    it('deve criar cupom válido', () => {
      const cupom = new Cupom('1', 'DESCONTO10', 'fixo', 10, new Date('2026-12-31'), true);

      expect(cupom.id).toBe('1');
      expect(cupom.codigo).toBe('DESCONTO10');
      expect(cupom.tipoDesconto).toBe('fixo');
      expect(cupom.valorDesconto).toBe(10);
    });

    it('deve lançar erro com código inválido', () => {
      expect(() => new Cupom('1', '1', 'percentual', 10, new Date('2026-12-31'), true)).toThrow('Código do cupom é inválido');
    });

    it('deve lançar erro com valor inválido', () => {
      expect(() => new Cupom('1', 'CODIGO', 'percentual', 0, new Date('2026-12-31'), true)).toThrow('Valor de desconto inválido');
      expect(() => new Cupom('1', 'CODIGO', 'percentual', -5, new Date('2026-12-31'), true)).toThrow('Valor de desconto inválido');
    });

    it('deve lançar erro com tipo inválido', () => {
      expect(() => new Cupom('1', 'CODIGO', 'invalido' as TipoDesconto, 10, new Date('2026-12-31'), true)).toThrow('Tipo de desconto inválido');
    });
  });

  describe('estaValido', () => {
    it('deve retornar true quando válido', () => {
      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 30);
      const cupom = new Cupom('1', 'VALIDO', 'percentual', 10, dataFutura, true);

      expect(cupom.estaValido()).toBe(true);
    });

    it('deve retornar false quando expirado', () => {
      const dataPassada = new Date();
      dataPassada.setDate(dataPassada.getDate() - 1);
      const cupom = new Cupom('1', 'EXPIRADO', 'percentual', 10, dataPassada, true);

      expect(cupom.estaValido()).toBe(false);
    });

    it('deve retornar false quando inativo', () => {
      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 30);
      const cupom = new Cupom('1', 'INATIVO', 'percentual', 10, dataFutura, false);

      expect(cupom.estaValido()).toBe(false);
    });
  });

  describe('calcularDesconto', () => {
    it('deve calcular desconto percentual', () => {
      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 30);
      const cupom = new Cupom('1', 'DESC10', 'percentual', 10, dataFutura, true);

      const desconto = cupom.calcularDesconto(100);

      expect(desconto).toBe(10);
    });

    it('deve aplicar desconto fixo', () => {
      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 30);
      const cupom = new Cupom('1', 'FIXO20', 'fixo', 20, dataFutura, true);

      const desconto = cupom.calcularDesconto(100);

      expect(desconto).toBe(20);
    });

    it('não deve ultrapassar valor total', () => {
      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + 30);
      const cupom = new Cupom('1', 'FIXO100', 'fixo', 100, dataFutura, true);

      const desconto = cupom.calcularDesconto(50);

      expect(desconto).toBe(50);
    });

    it('deve retornar 0 quando inválido', () => {
      const cupom = new Cupom('1', 'INATIVO', 'fixo', 50, new Date('2026-12-31'), false);

      const desconto = cupom.calcularDesconto(100);

      expect(desconto).toBe(0);
    });
  });
});
