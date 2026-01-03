export class Produto {
  constructor(
    private _id: string,
    private _nome: string,
    private _descricao: string,
    private _preco: number,
    private _categoria: string,
    private _imagemUrl: string | null,
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
  static fromPersistence(data: {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    imagemUrl: string | null;
    disponivel: boolean;
  }) {
    return new Produto(
      data.id,
      data.nome,
      data.descricao,
      data.preco,
      data.categoria,
      data.imagemUrl,
      data.disponivel
    );
  }
  
  public atualizar(dados: Partial<{ nome: string; descricao: string; preco: number; categoria: string; imagem: string; disponivel: boolean }>) {
    this._nome = dados.nome ?? this._nome;
    this._descricao = dados.descricao ?? this._descricao;
    this._preco = dados.preco ?? this._preco;
    this._categoria = dados.categoria ?? this._categoria;
    this._imagemUrl = dados.imagem ?? this._imagemUrl;
    this._disponivel = dados.disponivel ?? this._disponivel;
  }
   public toPersistence() {
    return {
      id: this._id,
      nome: this._nome,
      descricao: this._descricao,
      preco: this._preco,
      categoria: this._categoria,
      imagemUrl: this._imagemUrl,
      disponivel: this._disponivel,
    };
  }
}

