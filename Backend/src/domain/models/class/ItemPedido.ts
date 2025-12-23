import { Produto } from "./Produto";

export class ItemPedido {
  constructor(
    private _produto: Produto,
    private _quantidade: number,
    private _precoUnitario: number
  ) {
    if (_quantidade <= 0) {
      throw new Error("Quantidade inválida");
    }
  }

  get subtotal() {
    return this._quantidade * this._precoUnitario;
  }

  get produto() {
    return this._produto;
  }

  get quantidade() {
    return this._quantidade;
  }
}
