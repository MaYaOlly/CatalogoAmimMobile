export class Usuario {
  constructor(
    private _id: string,
    private _nome: string,
    private _email: string,
    private _senhaHash: string,
    private _endereco: string | null
  ) {
    this.validar();
  }

  private validar() {
    if (!this._nome || this._nome.trim().length < 2) throw new Error("Nome invalido");
    if (!this._email || !/\S+@\S+\.\S+/.test(this._email)) {
      throw new Error("Email inválido");
    }
    if (!this._senhaHash) throw new Error("Senha inválida");
  }

  get id() {
    return this._id;
  }

  get nome() {
    return this._nome;
  }

  get email() {
    return this._email;
  }

  get endereco() {
    return this._endereco;
  }

  verificarSenha(senha: string, comparador: (senha: string, hash: string) => Promise<boolean>) {
    return comparador(senha, this._senhaHash);
  }

  atualizarPerfil(nome: string, endereco: string | null) {
    if (!nome) throw new Error("Nome não pode ser vazio.");
    this._nome = nome;
    this._endereco = endereco;
  }

  toPersistence() {
    return {
      id: this._id,
      nome: this._nome,
      email: this._email,
      senha: this._senhaHash, 
      endereco: this._endereco,
    };
  }

  static fromPersistence(data: {
    id: string;
    nome: string;
    email: string;
    senha: string;
    endereco: string | null;
  }) {
    return new Usuario(data.id, data.nome, data.email, data.senha, data.endereco);
  }
}