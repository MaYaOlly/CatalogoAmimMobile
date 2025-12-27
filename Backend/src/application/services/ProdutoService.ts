import { Produto } from "../../domain/models/class/Produto";
import { IProdutoRepository } from "../../domain/models/interfaces/IProdutoRepository";

export class ProdutoService {
  constructor(private produtoRepository: IProdutoRepository) {}

  async listarProdutosDisponiveis(): Promise<Produto[]> {
    const todosOsProdutos = await this.produtoRepository.listarTodos();
    // Futuramente, podemos adicionar lógicas como filtrar por estoque, etc.
    return todosOsProdutos.filter(produto => produto.disponivel);
  }

  async buscarProdutoPorId(id: string): Promise<Produto | null> {
    return this.produtoRepository.buscarPorId(id);
  }

  async criarProduto(
    nome: string,
    descricao: string,
    preco: number,
    categoria: string,
    imagem: string,
    disponivel: boolean
  ): Promise<Produto> {
    const novoProduto = new Produto(
      '', // ID será gerado pelo banco
      nome,
      descricao,
      preco,
      categoria,
      imagem,
      disponivel
    );
    return this.produtoRepository.criar(novoProduto);
  }

  async atualizarProduto(
    id: string,
    dados: Partial<{ nome: string; descricao: string; preco: number; categoria: string; disponivel: boolean, imagem: string }>
  ): Promise<Produto | null> {
    const produtoExistente = await this.produtoRepository.buscarPorId(id);
    if (!produtoExistente) {
      return null;
    }

    //Atualiza o produto se existir
    produtoExistente.atualizar(dados);

    // Persiste a entidade atualizada
    return this.produtoRepository.atualizar(id, produtoExistente);
  }

  async deletarProduto(id: string): Promise<boolean> {
    this.produtoRepository.deletar(id);
    return true;
  }
}