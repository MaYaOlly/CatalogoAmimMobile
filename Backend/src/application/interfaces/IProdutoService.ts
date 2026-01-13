import { Produto } from "../../domain/models/class/Produto";

export interface IProdutoService {
  listarProdutos(): Promise<Produto[]>;
  criarProduto(
    nome: string,
    descricao: string,
    preco: number,
    categoria: string,
    imagem: string,
    disponivel: boolean
  ): Promise<Produto>;
  buscarProdutoPorId(id: string): Promise<Produto | null>;
  atualizarProduto(
    id: string,
    dados: Partial<{
      nome: string;
      descricao: string;
      preco: number;
      categoria: string;
      disponivel: boolean;
      imagem: string;
    }>
  ): Promise<Produto | null>;
  deletarProduto(id: string): Promise<boolean>;
}
