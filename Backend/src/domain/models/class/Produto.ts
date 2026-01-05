/**
 * Representa um produto do catálogo com suas informações e regras de negócio.
 * Implementa validações e encapsulamento de dados do produto.
 */
export class Produto {
  /**
   * Cria uma nova instância de Produto.
   * @param _id - Identificador único do produto
   * @param _nome - Nome do produto
   * @param _descricao - Descrição detalhada do produto
   * @param _preco - Preço do produto em valor decimal
   * @param _categoria - Categoria à qual o produto pertence
   * @param _imagemUrl - URL da imagem do produto (opcional)
   * @param _disponivel - Indica se o produto está disponível para venda
   * @throws {Error} Se os dados fornecidos forem inválidos
   */
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

  /**
   * Valida os dados do produto.
   * @throws {Error} Se o nome estiver vazio ou o preço for inválido
   * @private
   */
  private validar() {
    if (!this._nome) throw new Error("Nome do produto é obrigatório");
    if (this._preco <= 0) throw new Error("Preço inválido");
  }

  /** Retorna o ID do produto */
  get id() {
    return this._id;
  }

  /** Retorna o nome do produto */
  get nome() {
    return this._nome;
  }

  /** Retorna a descrição do produto */
  get descricao() {
    return this._descricao;
  }

  /** Retorna o preço do produto */
  get preco() {
    return this._preco;
  }

  /** Retorna a categoria do produto */
  get categoria() {
    return this._categoria;
  }

  /** Retorna a URL da imagem do produto */
  get imagemUrl() {
    return this._imagemUrl;
  }

  /** Retorna se o produto está disponível */
  get disponivel() {
    return this._disponivel;
  }

  /**
   * Altera o nome do produto.
   * @param novoNome - Novo nome para o produto
   * @throws {Error} Se o novo nome estiver vazio
   */
  alterarNome(novoNome: string) {
    if (!novoNome) throw new Error("Nome inválido");
    this._nome = novoNome;
  }

  /**
   * Altera o preço do produto.
   * @param novoPreco - Novo preço para o produto
   * @throws {Error} Se o novo preço for menor ou igual a zero
   */
  alterarPreco(novoPreco: number) {
    if (novoPreco <= 0) throw new Error("Preço inválido");
    this._preco = novoPreco;
  }

  /**
   * Altera a disponibilidade do produto.
   * @param status - Novo status de disponibilidade (true = disponível, false = indisponível)
   */
  alterarDisponibilidade(status: boolean) {
    this._disponivel = status;
  }
  
  /**
   * Cria uma instância de Produto a partir de dados persistidos no banco de dados.
   * @param data - Objeto com os dados do produto do banco de dados
   * @returns Nova instância de Produto
   */
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
  
  /**
   * Atualiza parcialmente os dados do produto.
   * @param dados - Objeto com os campos a serem atualizados (apenas os fornecidos serão alterados)
   */
  public atualizar(dados: Partial<{ nome: string; descricao: string; preco: number; categoria: string; imagem: string; disponivel: boolean }>) {
    this._nome = dados.nome ?? this._nome;
    this._descricao = dados.descricao ?? this._descricao;
    this._preco = dados.preco ?? this._preco;
    this._categoria = dados.categoria ?? this._categoria;
    this._imagemUrl = dados.imagem ?? this._imagemUrl;
    this._disponivel = dados.disponivel ?? this._disponivel;
  }
  
  /**
   * Converte o objeto Produto para um formato adequado à persistência no banco de dados.
   * @returns Objeto com os dados do produto no formato de persistência
   */
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

