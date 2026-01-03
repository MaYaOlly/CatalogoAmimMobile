import { ItemPedido } from "./ItemPedido";
import { Usuario } from "./Usuario";
import { Cupom } from "./Cupom";

export type StatusPedido = "realizado" | "pendente" | "confirmado" | "enviado" | "entregue" | "cancelado";

export class Pedido {
  private _precoTotal: number = 0;
  private _cupom: Cupom | null = null;

  constructor(
    private _id: string,
    private _usuarioID: string,
    private _itens: ItemPedido[],
    private _status: StatusPedido,
    private _data: Date
  ) {
    this.validar();
    this.calcularPrecoTotal();
  }

  private validar() {
    if (!this._usuarioID) throw new Error("Usuário é obrigatório");
    if (!this._itens || this._itens.length === 0) {
      throw new Error("O pedido deve ter pelo menos um item");
    }
  }

  private calcularPrecoTotal() {
    this._precoTotal = this._itens.reduce((total, item) => total + item.subtotal, 0);
    if (this._cupom) {
      const desconto = this._cupom.calcularDesconto(this._precoTotal);
      this._precoTotal -= desconto;
    }
  }

  aplicarCupom(cupom: Cupom) {
    if (!cupom.estaValido()) {
      throw new Error("Cupom inválido ou expirado");
    }
    this._cupom = cupom;
    this.calcularPrecoTotal();
  }

  confirmar() {
    if (this._status !== "realizado") {
      throw new Error("Apenas pedidos realizados podem ser confirmados");
    }
    this._status = "confirmado";
  }

  cancelar() {
    if (this._status !== "pendente" && this._status !== "confirmado" && this._status !== "realizado") {
      throw new Error("Este pedido não pode mais ser cancelado");
    }
    this._status = "cancelado";
  }

  get id() {
    return this._id;
  }

  get usuarioID() {
    return this._usuarioID;
  }

  get itens() {
    return this._itens;
  }

  get status() {
    return this._status;
  }

  get data() {
    return this._data;
  }

  get precoTotal() {
    return this._precoTotal;
  }

  get cupom() {
    return this._cupom;
  }
}