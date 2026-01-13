import axios, { AxiosInstance } from "axios";
import { Produto } from "../../entities/typeProduto"
import { ProdutoService } from "../produtoService";

describe('ProdutoService', () => {
    it('deve retornar uma lista de produtos', async () => {
        // Dados simulados
        const mockProdutos: Produto[] = [
            {
                _id: '1',
                _nome: 'Produto 1',
                _descricao: 'Descrição do Produto 1',
                _preco: 10.0,
                _categoria: 'Categoria A',
                _imagemUrl: 'imagem1.png',
                _disponivel: true
            },
            {
                _id: '2',
                _nome: 'Produto 2',
                _descricao: 'Descrição do Produto 2',
                _preco: 20.0,
                _categoria: 'Categoria B',
                _imagemUrl: null,
                _disponivel: false
            }
        ];
        // Mock para simular a resposta do axios
        const mockedAxios = {
            get: jest.fn().mockResolvedValue({ data: mockProdutos })
        } as unknown as AxiosInstance;
        // Injeção de dependência do axios mockado
        const produtoService = new ProdutoService(mockedAxios);
        // Chamada do método a ser testado 
        const response = await produtoService.getProdutos();
        // Verificações
        expect(response).toEqual(mockProdutos);
        console.log(mockProdutos)
        expect(mockedAxios.get).toHaveBeenCalledWith('/produtos');
    });
})
