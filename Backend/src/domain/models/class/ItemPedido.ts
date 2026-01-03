import { Produto } from "./Produto";

export class ItemPedido {
  constructor(
    private _id: string,
    private _produto: Produto,
    private _quantidade: number,
    private _precoUnitario: number,
    private _pedidoId: string
  ) {
    this.validar();
  }

  private validar() {
    if (!this._produto) throw new Error("Produto é obrigatório");
    if (this._quantidade <= 0) {
      throw new Error("Quantidade deve ser maior que zero");
    }
    if (this._precoUnitario <= 0) {
      throw new Error("Preço unitário inválido");
    }
  }

  get id() {
    return this._id;
  }

  get produto() {
    return this._produto;
  }

  get quantidade() {
    return this._quantidade;
  }

  get precoUnitario() {
    return this._precoUnitario;
  }
  
  get pedidoId() {
    return this._pedidoId;
  }

  get subtotal() {
    return this._quantidade * this._precoUnitario;
  }
}