import { AxiosInstance } from "axios";
import { CriarPedidoDto, PedidoResponse } from "../entities/typePedido";

/**
 * Service para comunicação com a API de Pedidos
 * Baseado na documentação: POST /pedidos
 */
export class PedidoService {
    constructor(private api: AxiosInstance) {
        this.api = api;
    }

    /**
     * Cria um novo pedido na API
     * @param pedido - Dados do pedido a ser criado
     * @returns Pedido criado com ID e informações completas
     */
    async criarPedido(pedido: CriarPedidoDto): Promise<PedidoResponse> {
        try {
            const { data } = await this.api.post<PedidoResponse>('/pedidos', pedido);
            return data;
        } catch (err: any) {
            console.error('Erro ao criar pedido:', err);
            throw new Error(err.response?.data?.message || err.message || 'Erro ao criar pedido');
        }
    }

    /**
     * Busca um pedido específico por ID
     * @param pedidoId - ID do pedido
     * @returns Dados do pedido
     */
    async buscarPedido(pedidoId: string): Promise<PedidoResponse> {
        try {
            const { data } = await this.api.get<PedidoResponse>(`/pedidos/${pedidoId}`);
            return data;
        } catch (err: any) {
            console.error('Erro ao buscar pedido:', err);
            throw new Error(err.response?.data?.message || err.message || 'Erro ao buscar pedido');
        }
    }

    /**
     * Lista todos os pedidos de um usuário
     * @param usuarioId - ID do usuário
     * @returns Lista de pedidos do usuário
     */
    async listarPedidosUsuario(usuarioId: string): Promise<PedidoResponse[]> {
        try {
            const { data } = await this.api.get<PedidoResponse[]>(`/pedidos/usuario/${usuarioId}`);
            return data;
        } catch (err: any) {
            console.error('Erro ao listar pedidos:', err);
            throw new Error(err.response?.data?.message || err.message || 'Erro ao listar pedidos');
        }
    }
}
