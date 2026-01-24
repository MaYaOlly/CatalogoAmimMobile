import { ItemPedido } from "./ItemPedido";
import { Cupom } from "./Cupom";

/** Representa os possíveis status de um pedido durante seu ciclo de vida */
export type StatusPedido = "realizado" | "pendente" | "confirmado" | "enviado" | "entregue" | "cancelado";
export type FormaPagamento = "pix" | "especie" | "Credito" | "Debito";

/**
 * Representa um pedido do sistema com seus itens, status e validações.
 * Implementa regras de negócio para gestão de pedidos e cálculo de preços.
 */
export class Pedido {
  private _precoTotal: number = 0;
  private _cupom: Cupom | null = null;

  /**
   * Cria uma nova instância de Pedido.
   * @param _id - Identificador único do pedido
   * @param _usuarioID - ID do usuário que realizou o pedido
   * @param _itens - Lista de itens que compõem o pedido
   * @param _status - Status atual do pedido
   * @param _data - Data em que o pedido foi criado
   * @throws {Error} Se os dados fornecidos forem inválidos
   */
  constructor(
    private _id: string,
    private _usuarioID: string,
    private _itens: ItemPedido[],
    private _pagamento: FormaPagamento,
    private _status: StatusPedido,
    private _data: Date
  ) {
    this.validar();
    this.calcularPrecoTotal();
  }

  /**
   * Valida os dados do pedido.
   * @throws {Error} Se o usuário não estiver definido ou não houver itens
   * @private
   */
  private validar() {
    if (!this._usuarioID) throw new Error("Usuário é obrigatório");
    if (!this._itens || this._itens.length == 0) {
      throw new Error("O pedido deve ter pelo menos um item");
    }
  }

  /**
   * Calcula o preço total do pedido, considerando os itens e desconto do cupom (se houver).
   * @private
   */
  private calcularPrecoTotal() {
    this._precoTotal = this._itens.reduce((total, item) => total + item.subtotal, 0);
    if (this._cupom) {
      const desconto = this._cupom.calcularDesconto(this._precoTotal);
      this._precoTotal -= desconto;
    }
  }

  /**
   * Aplica um cupom de desconto ao pedido.
   * @param cupom - Cupom a ser aplicado
   * @throws {Error} Se o cupom não estiver válido ou estiver expirado
   */
  aplicarCupom(cupom: Cupom) {
    if (!cupom.estaValido()) {
      throw new Error("Cupom inválido ou expirado");
    }
    this._cupom = cupom;
    this.calcularPrecoTotal();
  }

  /**
   * Confirma um pedido que estava em status "realizado".
   * @throws {Error} Se o pedido não estiver em status "realizado"
   */
  confirmar() {
    if (this._status != "realizado") {
      throw new Error("Apenas pedidos realizados podem ser confirmados");
    }
    this._status = "confirmado";
  }

  /**
   * Cancela um pedido nos status permitidos para cancelamento.
   * @throws {Error} Se o pedido não puder mais ser cancelado
   */
  cancelar() {
    if (this._status != "pendente" && this._status != "confirmado" && this._status != "realizado") {
      throw new Error("Este pedido não pode mais ser cancelado");
    }
    this._status = "cancelado";
  }

  /** Retorna o ID do pedido */
  get id() {
    return this._id;
  }

  /** Retorna o ID do usuário que realizou o pedido */
  get usuarioID() {
    return this._usuarioID;
  }

  /** Retorna a lista de itens do pedido */
  get itens() {
    return this._itens;
  }

  /** Retorna o status atual do pedido */
  get status() {
    return this._status;
  }

  /** Retorna a data de criação do pedido */
  get data() {
    return this._data;
  }

  /** Retorna o preço total do pedido com descontos aplicados */
  get precoTotal() {
    return this._precoTotal;
  }

  /** Retorna o cupom aplicado ao pedido (se houver) */
  get cupom() {
    return this._cupom;
  }

  get pagamento(){
    return this._pagamento
  }
}