"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
/**
 * Representa um usuário do sistema com suas informações pessoais e credenciais.
 * Implementa validações de negócio e encapsulamento de dados.
 */
class Usuario {
    /**
     * Cria uma nova instância de Usuario.
     * @param _id - Identificador único do usuário
     * @param _nome - Nome completo do usuário
     * @param _email - Endereço de e-mail do usuário
     * @param _senhaHash - Hash da senha do usuário (já criptografada)
     * @param _endereco - Endereço físico do usuário (opcional)
     * @param _telefone - Número de telefone do usuário (opcional)
     * @throws {Error} Se os dados fornecidos forem inválidos
     */
    constructor(_id, _nome, _email, _senhaHash, _endereco, _telefone) {
        this._id = _id;
        this._nome = _nome;
        this._email = _email;
        this._senhaHash = _senhaHash;
        this._endereco = _endereco;
        this._telefone = _telefone;
        this.validar();
    }
    /**
     * Valida os dados do usuário.
     * @throws {Error} Se o nome, e-mail ou senha forem inválidos
     * @private
     */
    validar() {
        if (!this._nome || this._nome.trim().length < 2 || this._nome.trim().length > 100)
            throw new Error("Nome invalido");
        if (!this._email || !/\S+@\S+\.\S+/.test(this._email)) {
            throw new Error("Email inválido");
        }
        if (!this._senhaHash || this._senhaHash.trim().length < 4)
            throw new Error("Senha inválida");
    }
    /** Retorna o ID do usuário */
    get id() {
        return this._id;
    }
    /** Retorna o nome do usuário */
    get nome() {
        return this._nome;
    }
    /** Retorna o e-mail do usuário */
    get email() {
        return this._email;
    }
    /** Retorna o endereço do usuário */
    get endereco() {
        return this._endereco;
    }
    /** Retorna o telefone do usuário */
    get telefone() {
        return this._telefone;
    }
    /**
     * Verifica se a senha fornecida corresponde ao hash armazenado.
     * @param senha - Senha em texto plano para verificação
     * @param comparador - Função que compara a senha com o hash
     * @returns Promise que resolve para true se a senha estiver correta, false caso contrário
     */
    verificarSenha(senha, comparador) {
        return comparador(senha, this._senhaHash);
    }
    /**
     * Atualiza as informações de perfil do usuário.
     * @param nome - Novo nome do usuário
     * @param endereco - Novo endereço do usuário (ou null)
     * @param telefone - Novo telefone do usuário (ou null)
     * @throws {Error} Se o nome fornecido for vazio
     */
    atualizarPerfil(nome, endereco, telefone) {
        if (!nome || nome.trim().length < 2 || nome.trim().length > 100)
            throw new Error("Nome invalido");
        this._nome = nome;
        this._endereco = endereco;
        this._telefone = telefone;
    }
    /**
     * Converte o objeto Usuario para um formato adequado à persistência no banco de dados.
     * @returns Objeto com os dados do usuário no formato de persistência
     */
    toPersistence() {
        return {
            id: this._id,
            nome: this._nome,
            email: this._email,
            senha: this._senhaHash,
            endereco: this._endereco,
            telefone: this._telefone
        };
    }
    /**
     * Cria uma instância de Usuario a partir de dados persistidos no banco de dados.
     * @param data - Objeto com os dados do usuário do banco de dados
     * @returns Nova instância de Usuario
     */
    static fromPersistence(data) {
        return new Usuario(data.id, data.nome, data.email, data.senha, data.endereco, data.telefone);
    }
}
exports.Usuario = Usuario;
