import { AxiosInstance } from "axios";
import { PedidoService } from "../pedidoService";
import { CriarPedidoDto, PedidoResponse } from "../../entities/typePedido";

describe("PedidoService", () => {
    it("deve criar um novo pedido", async () => {
        const novoPedido: CriarPedidoDto = {
            usuarioId: "user123",
            itens: [
                { produtoId: "prod1", quantidade: 2 }
            ],
            formaPagamento: "PIX"
        };
        
        const respostaEsperada: PedidoResponse = {
            id: "pedido123",
            usuarioId: "user123",
            itens: [
                { id: "item1", produtoId: "prod1", quantidade: 2, precoUnitario: 10.00 }
            ],
            precoTotal: 20.00,
            status: "PENDENTE",
            formaPagamento: "PIX",
            data: "2026-01-23"
        };
        
        const mockedAxios = {
            post: jest.fn().mockResolvedValue({ data: respostaEsperada })
        } as unknown as AxiosInstance;
        
        const pedidoService = new PedidoService(mockedAxios);
        const response = await pedidoService.criarPedido(novoPedido);
        
        expect(response).toEqual(respostaEsperada);
        expect(response).toHaveProperty('id');
        expect(response.precoTotal).toBe(20.00);
        expect(mockedAxios.post).toHaveBeenCalledWith('/pedidos', novoPedido);
    });

    it("deve retornar erro ao criar pedido com dados inválidos", async () => {
        const novoPedido: CriarPedidoDto = {
            usuarioId: "",
            itens: [],
            formaPagamento: "PIX"
        };
        
        const mockedAxios = {
            post: jest.fn().mockRejectedValue(new Error("Dados inválidos"))
        } as unknown as AxiosInstance;
        
        const pedidoService = new PedidoService(mockedAxios);
        
        await expect(pedidoService.criarPedido(novoPedido)).rejects.toThrow("Dados inválidos");
    });
});
