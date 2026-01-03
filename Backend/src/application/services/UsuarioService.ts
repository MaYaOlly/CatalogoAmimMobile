import { Usuario } from '../../domain/models/class/Usuario';
import { IUsuarioRepository } from '../../domain/models/interfaces/IUsuarioRepository';
import bcrypt from 'bcryptjs';

// Interface para definir os dados esperados na criação de um usuário
interface CriarUsuarioDTO {
  nome: string;
  email: string;
  senha: string;
  endereco: string | null;
  telefone: string | null;
}

export class UsuarioService {
  constructor(private usuarioRepository: IUsuarioRepository) {}

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

  async buscarUsuarioPorId(id: string): Promise<Usuario | null> {
    return this.usuarioRepository.buscarPorId(id);
  }
  
  // Outros métodos como 'atualizarUsuario', 'login', etc. podem ser adicionados aqui.
}