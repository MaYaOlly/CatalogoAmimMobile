import { Usuario } from "../class/Usuario";

/**
 * Interface para o repositório de Usuários.
 * Define os métodos necessários para operações de persistência com usuários.
 */
export interface IUsuarioRepository {
  /**
   * Cria um novo usuário no repositório.
   * @param usuario - Objeto Usuario a ser criado
   * @returns Promise que resolve para o usuário criado com ID gerado
   */
  criar(usuario: Usuario): Promise<Usuario>;
  
  /**
   * Busca um usuário pelo seu e-mail.
   * @param email - E-mail do usuário a ser buscado
   * @returns Promise que resolve para o usuário encontrado ou null se não existir
   */
  buscarPorEmail(email: string): Promise<Usuario | null>;
  
  /**
   * Busca um usuário pelo seu ID.
   * @param id - ID do usuário a ser buscado
   * @returns Promise que resolve para o usuário encontrado ou null se não existir
   */
  buscarPorId(id: string): Promise<Usuario | null>;
  
  /**
   * Atualiza um usuário existente no repositório.
   * @param usuario - Objeto Usuario com os dados atualizados
   * @returns Promise que resolve para o usuário atualizado
   */
  atualizar(usuario: Usuario): Promise<Usuario>;
}