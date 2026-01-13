import axios, { AxiosInstance } from "axios";
import { Usuario, UsuarioRespostaAPI } from "../../entities/typeUsuario";
import { UsuarioService } from "../usuarioService";

describe("UsuarioService", () => {
    it("deve criar um novo usuário", async () => {
        // Dados simulados
        const novoUsuario: Usuario = {
            nome: "user3",
            email: "user3@email.com",
            senha: "user3",
            endereco: "qualquer",
            telefone: "6543210"
        };
        
        // Resposta esperada da API (apenas id, nome e email)
        const respostaEsperada : UsuarioRespostaAPI = {
            id: "asnm-1jg5",
            nome: "user3",
            email: "user3@email.com"
        };
        
        // Mock para simular a resposta do axios
        const mockedAxios = {
            post: jest.fn().mockResolvedValue({ data: respostaEsperada })
        } as unknown as AxiosInstance;
        // Instancia o serviço com o axios mockado
        const usuarioService = new UsuarioService(mockedAxios);
        // Chamada do método a ser testado 
        const response = await usuarioService.criarUsuario(novoUsuario);
        // Verificações
        expect(response).toEqual(respostaEsperada);
        expect(response).toHaveProperty('id');
        expect(response).toHaveProperty('nome', 'user3');
        expect(response).toHaveProperty('email', 'user3@email.com');
        expect(mockedAxios.post).toHaveBeenCalledWith('/usuarios', novoUsuario);
    });
    it("deve retornar um erro ao criar usuario com emial invalido", async () => {
        // Dados simulados
        const novoUsuario : Usuario= {   
            nome: "user3",
            email: "user3email.com",
            senha: "user3",
            endereco: "qualquer",
            telefone: "6543210"
        };
        // Mock para simular a resposta do axios
        const mockedAxios = {
            post: jest.fn().mockRejectedValue(new Error("Email inválido"))
        } as unknown as AxiosInstance;
        // Instancia o serviço com o axios mockado
        const usuarioService = new UsuarioService(mockedAxios);
        // Chamada do método a ser testado e verificação de erro
        await expect(usuarioService.criarUsuario(novoUsuario)).rejects.toThrow("Email inválido");
        expect(mockedAxios.post).toHaveBeenCalledWith('/usuarios', novoUsuario);
    });
});