// Tipos para Pedido
export interface ItemPedidoApi {
  produtoId: string;
  quantidade: number;
}

export interface CriarPedidoDto {
  usuarioId: string;
  itens: ItemPedidoApi[];
  formaPagamento: string;
  cupomCodigo?: string;
}

export interface ItemPedidoResponse {
  id: string;
  produtoId: string;
  quantidade: number;
  precoUnitario: number;
}

export interface PedidoResponse {
  id: string;
  usuarioId: string;
  itens: ItemPedidoResponse[];
  precoTotal: number;
  status: string;
  formaPagamento: string;
  cupomId?: string;
  data: string;
}
