import { AxiosInstance } from "axios";
import { Usuario, UsuarioRespostaAPI, LoginCredenciais, LoginResposta } from "../entities/typeUsuario";
import { formatarMensagemErro } from "../infrastructure/errorUtils";

export class UsuarioService {
    constructor(private url: AxiosInstance){
        this.url = url;
    }    
    
    async criarUsuario(usuario: Usuario): Promise<UsuarioRespostaAPI> {
        try {
            const response = await this.url.post<UsuarioRespostaAPI>('/usuarios', usuario);
            return response.data;
        } catch (error: any) {
            throw new Error(formatarMensagemErro(error));
        }
    }

    async fazerLogin(credenciais: LoginCredenciais): Promise<LoginResposta> {
        try {
            const response = await this.url.post<LoginResposta>('/login', credenciais);
            return response.data;
        } catch (error: any) {
            throw new Error(formatarMensagemErro(error));
        }
    }
}