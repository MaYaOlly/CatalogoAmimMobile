"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const Usuario_1 = require("../../domain/models/class/Usuario");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Service de gestão de usuários.
 * Implementa a lógica de negócio para operações com usuários, autenticação e atualização de perfil.
 */
class UsuarioService {
    /**
     * Cria uma nova instância do UsuarioService.
     * @param usuarioRepository - Repositório de usuários para persistência de dados
     */
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    /**
     * Cria um novo usuário no sistema.
     * @param dados - Dados do usuário a ser criado
     * @returns Promise que resolve para o usuário criado
     * @throws {Error} Se o e-mail já estiver em uso
     */
    async criarUsuario(dados) {
        const usuarioExistente = await this.usuarioRepository.buscarPorEmail(dados.email);
        if (usuarioExistente) {
            throw new Error('O e-mail fornecido já está em uso.');
        }
        // Criptografar a senha antes de criar a entidade
        const senhaHash = await bcryptjs_1.default.hash(dados.senha, 10);
        const novoUsuario = new Usuario_1.Usuario('', // ID será gerado pelo banco
        dados.nome, dados.email, senhaHash, dados.endereco || null, dados.telefone);
        return this.usuarioRepository.criar(novoUsuario);
    }
    /**
     * Busca um usuário pelo seu ID.
     * @param id - ID do usuário a ser buscado
     * @returns Promise que resolve para o usuário encontrado ou null
     */
    async buscarUsuarioPorId(id) {
        return this.usuarioRepository.buscarPorId(id);
    }
    /**
     * Autentica um usuário verificando suas credenciais (email e senha).
     * @param dados - E-mail e senha do usuário
     * @returns Promise que resolve para o usuário autenticado
     * @throws {Error} Se as credenciais forem inválidas
     */
    async autenticar(dados) {
        const { email, senha } = dados;
        const usuario = await this.usuarioRepository.buscarPorEmail(email);
        if (!usuario) {
            throw new Error('Credenciais inválidas.');
        }
        // Usa o método da entidade para comparar a senha
        const senhaCorreta = await usuario.verificarSenha(senha, bcryptjs_1.default.compare);
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
    async atualizarPerfilUsuario(id, dados) {
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
exports.UsuarioService = UsuarioService;
