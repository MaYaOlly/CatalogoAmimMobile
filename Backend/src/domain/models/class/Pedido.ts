import { ItemPedido } from "./ItemPedido";

export type FormaPagamento = "PIX" | "DINHEIRO" | "CARTAO";

export class Pedido {
  private _total: number = 0;

  constructor(
    private _id: number,
    private _usuarioId: number,
    private _itens: ItemPedido[],
    private _formaPagamento: FormaPagamento,
    private _enderecoEntrega: string,
    private _observacoes?: string
  ) {
    this.calcularTotal();
  }

  private calcularTotal() {
    for(let i : number = 0; i < this._itens.length; i++) {
        this._total += this._itens[i].subtotal;
    }
  }

  get total() {
    return this._total;
  }

  get itens() {
    return this._itens;
  }
}
