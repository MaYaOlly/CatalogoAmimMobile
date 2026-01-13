import { FormaPagamento, Pedido } from "../class/Pedido";
/**
 * DTO (Data Transfer Object) para definição de dados para criar um pedido.
 * Contém o usuário, itens a serem pedidos, forma de pagamento e cupom de desconto (opcional).
 */
export interface CriarPedidoDTO {
  usuarioId: string;
  itens: Array<{
    produtoId: string;
    quantidade: number;
  }>;
  formaPagamento: FormaPagamento;
  cupomCodigo?: string;
}

export interface IPedidoService {
  criarPedido(dados: CriarPedidoDTO): Promise<Pedido>;
  buscarPedidoPorId(pedidoId: string, usuarioId: string): Promise<Pedido | null>;
  listarPedidosPorUsuario(usuarioId: string): Promise<Pedido[]>;
  confirmarPedido(pedidoId: string): Promise<Pedido>;
  cancelarPedido(pedidoId: string): Promise<Pedido>;
}