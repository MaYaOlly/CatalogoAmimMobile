export class Usuario {
  constructor(
    private _id: number,
    private _nome: string,
    private _email: string,
    private _senhaHash: string,
    private _telefone: string,
    private _endereco: string
  ) {
    this.validar();
  }

  private validar() {
    if (!this._email) throw new Error("Email obrigatório");
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

  get telefone() {
    return this._telefone;
  }

  get endereco() {
    return this._endereco;
  }

  atualizarPerfil(nome: string, telefone: string, endereco: string) {
    this._nome = nome;
    this._telefone = telefone;
    this._endereco = endereco;
  }
}
