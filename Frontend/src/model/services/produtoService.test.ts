import axios, { AxiosInstance } from "axios";
import { Produto } from "../entities/typeProduto"

const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('ProdutoService', () => {
    it('deve retornar uma lista de produtos', async () => {
        // Dados simulados
        const mockProdutos: Produto[] = [
            {
               id: '1',
               nome: 'Produto 1',
               descricao: 'Descrição do Produto 1',
               preco: 10.0,
               categoria: 'Categoria A',
               imagem: 'imagem1.png',
               disponivel: true
            },
            {
                id: '2',
                nome: 'Produto 2',
                descricao: 'Descrição do Produto 2',
                preco: 20.0,
                categoria: 'Categoria B',
                imagem: null,
                disponivel: false
            }
        ];
        // Mock para simular a resposta do axios
        const mockedAxios = {
            get : jest.fn().mockResolvedValue({data: mockProdutos})
        } as Partial<AxiosInstance>;
        // Injeção de dependência do axios mockado
        const produtoService = new ProdutoService(mockedAxios);
        // Chamada do método a ser testado 
        const response = await produtoService.getProdutos();
        // Verificações
        expect(response).toEqual(mockProdutos);
        expect(mockedAxios.get).toHaveBeenCalledWith('/produtos');
    });
})
