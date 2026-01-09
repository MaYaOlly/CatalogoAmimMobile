import { AtualizarPerfilDTO, AutenticarUsuarioDTO, CriarUsuarioDTO } from "../services/UsuarioService";
import { Usuario } from "../../domain/models/class/Usuario";

export interface IUsuarioService {
  criarUsuario(dados: CriarUsuarioDTO): Promise<Usuario>;
  autenticar(dados: AutenticarUsuarioDTO): Promise<Usuario>;
  buscarUsuarioPorId(id: string): Promise<Usuario | null>;
  atualizarPerfilUsuario(id: string, dados: AtualizarPerfilDTO): Promise<Usuario>;
}