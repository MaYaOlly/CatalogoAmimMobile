import { Usuario } from '../../domain/models/class/Usuario';
import { IUsuarioRepository } from '../../domain/models/interfaces/IUsuarioRepository';
import bcrypt from 'bcryptjs';
import { IUsuarioService } from '../../domain/models/interfaces/IUsuarioService';

/**
 * Interface para definir os dados esperados na criação de um usuário.
 * Contém as informações pessoais e credenciais do novo usuário.
 */
export interface CriarUsuarioDTO {
  nome: string;
  email: string;
  senha: string;
  endereco: string | null;
  telefone: string | null;
}

/**
 * DTO para os dados de autenticação de um usuário.
 */
export interface AutenticarUsuarioDTO {
  email: string;
  senha: string;
}

/**
 * DTO para atualização do perfil de um usuário.
 */
export interface AtualizarPerfilDTO {
  nome: string;
  endereco: string | null;
  telefone: string | null;
}

/**
 * Service de gestão de usuários.
 * Implementa a lógica de negócio para operações com usuários, autenticação e atualização de perfil.
 */
export class UsuarioService implements IUsuarioService{
  /**
   * Cria uma nova instância do UsuarioService.
   * @param usuarioRepository - Repositório de usuários para persistência de dados
   */
  constructor(private usuarioRepository: IUsuarioRepository) {}

  /**
   * Cria um novo usuário no sistema.
   * @param dados - Dados do usuário a ser criado
   * @returns Promise que resolve para o usuário criado
   * @throws {Error} Se o e-mail já estiver em uso
   */
  async criarUsuario(dados: CriarUsuarioDTO): Promise<Usuario> {
    const usuarioExistente = await this.usuarioRepository.buscarPorEmail(dados.email);
    if (usuarioExistente) {
      throw new Error('O e-mail fornecido já está em uso.');
    }

    // Criptografar a senha antes de criar a entidade
    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const novoUsuario = new Usuario(
      '', // ID será gerado pelo banco
      dados.nome,
      dados.email,
      senhaHash,
      dados.endereco || null,
      dados.telefone
    );

    return this.usuarioRepository.criar(novoUsuario);
  }

  /**
   * Busca um usuário pelo seu ID.
   * @param id - ID do usuário a ser buscado
   * @returns Promise que resolve para o usuário encontrado ou null
   */
  async buscarUsuarioPorId(id: string): Promise<Usuario | null> {
    return this.usuarioRepository.buscarPorId(id);
  }

  /**
   * Autentica um usuário verificando suas credenciais (email e senha).
   * @param dados - E-mail e senha do usuário
   * @returns Promise que resolve para o usuário autenticado
   * @throws {Error} Se as credenciais forem inválidas
   */
  async autenticar(dados: AutenticarUsuarioDTO): Promise<Usuario> {
    const { email, senha } = dados;

    const usuario = await this.usuarioRepository.buscarPorEmail(email);
    if (!usuario) {
      throw new Error('Credenciais inválidas.');
    }

    // Usa o método da entidade para comparar a senha
    const senhaCorreta = await usuario.verificarSenha(senha, bcrypt.compare);
    if (!senhaCorreta) {
      throw new Error('Credenciais inválidas.');
    }

    return usuario;
  }

  /**
   * Atualiza o perfil de um usuário.
   * @param id - ID do usuário a ser atualizado
   * @param dados - Novos dados do perfil do usuário
   * @returns Promise que resolve para o usuário com perfil atualizado
   * @throws {Error} Se o usuário não for encontrado
   */
   async atualizarPerfilUsuario(id: string, dados: AtualizarPerfilDTO): Promise<Usuario> {
    const usuario = await this.usuarioRepository.buscarPorId(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }

    // Usamos o método da própria entidade para atualizar os dados
    usuario.atualizarPerfil(dados.nome, dados.endereco, dados.telefone);

    const usuarioAtualizado = await this.usuarioRepository.atualizar(usuario);
    return usuarioAtualizado;
  }

}