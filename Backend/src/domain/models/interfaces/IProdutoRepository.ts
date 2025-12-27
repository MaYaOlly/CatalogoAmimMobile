import { Produto } from "../class/Produto";

export interface IProdutoRepository {
  listarTodos(): Promise<Produto[]>;
  buscarPorId(id: string): Promise<Produto | null>;
  criar(produto: Produto): Promise<Produto>;
  atualizar(id: string, produto: Partial<Produto>): Promise<Produto>;
  deletar(id: string): Promise<void>;
}