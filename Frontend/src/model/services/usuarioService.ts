import { AxiosInstance } from "axios";
import { Usuario, UsuarioRespostaAPI, LoginCredenciais, LoginResposta } from "../entities/typeUsuario";

export class UsuarioService {
    constructor(private url: AxiosInstance){
        this.url = url;
    }    
    
    async criarUsuario(usuario: Usuario): Promise<UsuarioRespostaAPI> {
        try {
            const response = await this.url.post<UsuarioRespostaAPI>('/usuarios', usuario);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async fazerLogin(credenciais: LoginCredenciais): Promise<LoginResposta> {
        try {
            const response = await this.url.post<LoginResposta>('/login', credenciais);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}