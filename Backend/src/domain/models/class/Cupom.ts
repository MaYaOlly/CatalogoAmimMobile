/** Representa os tipos de desconto que um cupom pode oferecer */
export type TipoDesconto = "percentual" | "fixo";

export class Cupom {
  constructor(
    private _id: string,
    private _codigo: string,
    private _tipoDesconto: TipoDesconto,
    private _valorDesconto: number,
    private _dataValidade: Date,
    private _ativo: boolean
  ) {
    this.validar();
  }

  /**
   * Valida os dados do cupom.
   * @throws {Error} Se o código não estiver definido, valor de desconto for inválido ou tipo de desconto for inválido
   * @private
   */
  private validar() {
    if (!this._codigo || this._codigo.trim().length < 2) throw new Error("Código do cupom é inválido");
    if (this._valorDesconto <= 0) throw new Error("Valor de desconto inválido");
    if (this._tipoDesconto != "percentual" && this._tipoDesconto != "fixo") {
      throw new Error("Tipo de desconto inválido");
    }
  }

  /** Retorna o ID do cupom */
  get id() {
    return this._id;
  }

  /** Retorna o código do cupom */
  get codigo() {
    return this._codigo;
  }
  
  /** Retorna o tipo de desconto do cupom */
  get tipoDesconto() {
    return this._tipoDesconto;
  }

  /** Retorna o valor do desconto */
  get valorDesconto() {
    return this._valorDesconto;
  }

  /** Retorna a data de validade do cupom */
  get dataValidade() {
    return this._dataValidade;
  }

  /** Retorna se o cupom está ativo */
  get ativo() {
    return this._ativo;
  }

  /**
   * Verifica se o cupom está válido (ativo e não expirado).
   * @returns true se o cupom está válido, false caso contrário
   */
  estaValido(): boolean {
    const hoje = new Date();
    return this._ativo && hoje <= this._dataValidade;
  }

  /**
   * Calcula o valor do desconto a ser aplicado ao total.
   * @param total - Valor total em que o desconto será aplicado
   * @returns Valor do desconto calculado, ou 0 se o cupom não estiver válido
   */
  calcularDesconto(total: number): number {
    if (!this.estaValido()) return 0;

    if (this._tipoDesconto == "percentual") {
      const desconto = total * (this._valorDesconto / 100);
      return Math.min(desconto, total);
    }

    return Math.min(this._valorDesconto, total);
  }
}