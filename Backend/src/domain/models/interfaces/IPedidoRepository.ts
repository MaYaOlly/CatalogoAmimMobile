import { Pedido } from "../class/Pedido";

export interface IPedidoRepository {
  criar(pedido: Pedido): Promise<Pedido>;
  buscarPorId(id: string): Promise<Pedido | null>;
  listarPorUsuario(usuarioId: string): Promise<Pedido[]>;
  atualizarStatus(id: string, status: string): Promise<Pedido>;
}