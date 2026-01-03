import { Produto } from "./Produto";

/**
 * Representa um item individual em um pedido.
 * Encapsula as informações de um produto dentro de um pedido, incluindo quantidade e preço.
 */
export class ItemPedido {
  /**
   * Cria uma nova instância de ItemPedido.
   * @param _id - Identificador único do item
   * @param _produto - Referência do produto
   * @param _quantidade - Quantidade do produto neste item
   * @param _precoUnitario - Preço unitário do produto no momento da compra
   * @param _pedidoId - ID do pedido ao qual este item pertence
   * @throws {Error} Se os dados fornecidos forem inválidos
   */
  constructor(
    private _id: string,
    private _produto: Produto,
    private _quantidade: number,
    private _precoUnitario: number,
    private _pedidoId: string
  ) {
    this.validar();
  }

  /**
   * Valida os dados do item do pedido.
   * @throws {Error} Se o produto não estiver definido, quantidade for inválida ou preço for inválido
   * @private
   */
  private validar() {
    if (!this._produto) throw new Error("Produto é obrigatório");
    if (this._quantidade <= 0) {
      throw new Error("Quantidade deve ser maior que zero");
    }
    if (this._precoUnitario <= 0) {
      throw new Error("Preço unitário inválido");
    }
  }

  /** Retorna o ID do item do pedido */
  get id() {
    return this._id;
  }

  /** Retorna o produto referenciado neste item */
  get produto() {
    return this._produto;
  }

  /** Retorna a quantidade do produto neste item */
  get quantidade() {
    return this._quantidade;
  }

  /** Retorna o preço unitário do produto no momento da compra */
  get precoUnitario() {
    return this._precoUnitario;
  }
  
  /** Retorna o ID do pedido ao qual este item pertence */
  get pedidoId() {
    return this._pedidoId;
  }

  /** Retorna o subtotal do item (quantidade * preço unitário) */
  get subtotal() {
    return this._quantidade * this._precoUnitario;
  }
}