import { Usuario } from "../class/Usuario";

export interface IUsuarioRepository {
  criar(usuario: Usuario): Promise<Usuario>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
  buscarPorId(id: string): Promise<Usuario | null>;
  atualizar(id: string, usuario: Partial<Usuario>): Promise<Usuario>;
}