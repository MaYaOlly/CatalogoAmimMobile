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
        
        const usuarioService = new UsuarioService(mockedAxios);
        
        await expect(usuarioService.criarUsuario(novoUsuario)).rejects.toThrow("Email inválido");
    });

    it("deve fazer login com sucesso", async () => {
        const credenciais = {
            email: "user@email.com",
            senha: "senha123"
        };
        
        const respostaEsperada = {
            token: "token123",
            usuario: {
                id: "1",
                nome: "Usuario",
                email: "user@email.com"
            }
        };
        
        const mockedAxios = {
            post: jest.fn().mockResolvedValue({ data: respostaEsperada })
        } as unknown as AxiosInstance;
        
        const usuarioService = new UsuarioService(mockedAxios);
        const response = await usuarioService.fazerLogin(credenciais);
        
        expect(response).toEqual(respostaEsperada);
        expect(mockedAxios.post).toHaveBeenCalledWith('/login', credenciais);
    });

    it("deve retornar erro ao fazer login com credenciais inválidas", async () => {
        const credenciais = {
            email: "user@email.com",
            senha: "senhaErrada"
        };
        
        const mockedAxios = {
            post: jest.fn().mockRejectedValue(new Error("Credenciais inválidas"))
        } as unknown as AxiosInstance;
        
        const usuarioService = new UsuarioService(mockedAxios);
        
        await expect(usuarioService.fazerLogin(credenciais)).rejects.toThrow("Credenciais inválidas");
    });
});