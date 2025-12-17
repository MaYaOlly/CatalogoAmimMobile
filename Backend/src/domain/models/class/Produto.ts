export class Produto {
  constructor(
    private _id: number,
    private _nome: string,
    private _descricao: string,
    private _preco: number,
    private _categoria: string,
    private _imagemUrl: string,
    private _disponivel: boolean
  ) {
    this.validar();
  }

  private validar() {
    if (!this._nome) throw new Error("Nome do produto é obrigatório");
    if (this._preco <= 0) throw new Error("Preço inválido");
  }

  get id() {
    return this._id;
  }

  get nome() {
    return this._nome;
  }

  get descricao() {
    return this._descricao;
  }

  get preco() {
    return this._preco;
  }

  get categoria() {
    return this._categoria;
  }

  get imagemUrl() {
    return this._imagemUrl;
  }

  get disponivel() {
    return this._disponivel;
  }

  alterarNome(novoNome: string) {
    if (!novoNome) throw new Error("Nome inválido");
    this._nome = novoNome;
  }

  alterarPreco(novoPreco: number) {
    if (novoPreco <= 0) throw new Error("Preço inválido");
    this._preco = novoPreco;
  }

  alterarDisponibilidade(status: boolean) {
    this._disponivel = status;
  }
}

