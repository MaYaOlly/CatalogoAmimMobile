export type TipoDesconto = "PERCENTUAL" | "VALOR";

export class Cupom {
  constructor(
    private _id: number,
    private _codigo: string,
    private _tipo: TipoDesconto,
    private _valor: number,
    private _validade: Date,
    private _ativo: boolean
  ) {}

  get codigo() {
    return this._codigo;
  }

  get ativo() {
    return this._ativo;
  }

  estaValido(): boolean {
    const hoje = new Date();
    return this._ativo && hoje <= this._validade;
  }

  calcularDesconto(total: number): number {
    if (!this.estaValido()) return 0;

    if (this._tipo == "PERCENTUAL") {
      return total * (this._valor / 100);
    }

    return this._valor;
  }
}
