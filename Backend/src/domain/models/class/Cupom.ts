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

  private validar() {
    if (!this._codigo) throw new Error("Código do cupom é obrigatório");
    if (this._valorDesconto <= 0) throw new Error("Valor de desconto inválido");
    if (this._tipoDesconto !== "percentual" && this._tipoDesconto !== "fixo") {
      throw new Error("Tipo de desconto inválido");
    }
  }

  get id() {
    return this._id;
  }

  get codigo() {
    return this._codigo;
  }
  
  get tipoDesconto() {
    return this._tipoDesconto;
  }

  get valorDesconto() {
    return this._valorDesconto;
  }

  get dataValidade() {
    return this._dataValidade;
  }

  get ativo() {
    return this._ativo;
  }

  estaValido(): boolean {
    const hoje = new Date();
    return this._ativo && hoje <= this._dataValidade;
  }

  calcularDesconto(total: number): number {
    if (!this.estaValido()) return 0;

    if (this._tipoDesconto === "percentual") {
      const desconto = total * (this._valorDesconto / 100);
      return Math.min(desconto, total);
    }

    return Math.min(this._valorDesconto, total);
  }
}