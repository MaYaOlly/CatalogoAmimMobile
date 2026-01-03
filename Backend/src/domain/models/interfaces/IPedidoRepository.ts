import { Pedido } from "../class/Pedido";

/**
 * Interface para o repositório de Pedidos.
 * Define os métodos necessários para operações de persistência com pedidos.
 */
export interface IPedidoRepository {
  /**
   * Cria um novo pedido no repositório.
   * @param pedido - Objeto Pedido a ser criado
   * @returns Promise que resolve para o pedido criado com ID gerado
   */
  criar(pedido: Pedido): Promise<Pedido>;
  
  /**
   * Busca um pedido pelo seu ID.
   * @param id - ID do pedido a ser buscado
   * @returns Promise que resolve para o pedido encontrado ou null se não existir
   */
  buscarPorId(id: string): Promise<Pedido | null>;
  
  /**
   * Lista todos os pedidos de um usuário específico.
   * @param usuarioId - ID do usuário cujos pedidos serão listados
   * @returns Promise que resolve para um array de pedidos do usuário
   */
  listarPorUsuario(usuarioId: string): Promise<Pedido[]>;
  
  /**
   * Atualiza o status de um pedido.
   * @param id - ID do pedido a ser atualizado
   * @param status - Novo status para o pedido
   * @returns Promise que resolve para o pedido com status atualizado
   */
  atualizarStatus(id: string, status: string): Promise<Pedido>;
}