import { Produto } from "../class/Produto";

/**
 * Interface para o repositório de Produtos.
 * Define os métodos necessários para operações de persistência com produtos.
 */
export interface IProdutoRepository {
  /**
   * Lista todos os produtos do repositório.
   * @returns Promise que resolve para um array com todos os produtos
   */
  listarTodos(): Promise<Produto[]>;
  
  /**
   * Busca um produto pelo seu ID.
   * @param id - ID do produto a ser buscado
   * @returns Promise que resolve para o produto encontrado ou null se não existir
   */
  buscarPorId(id: string): Promise<Produto | null>;
  
  /**
   * Cria um novo produto no repositório.
   * @param produto - Objeto Produto a ser criado
   * @returns Promise que resolve para o produto criado com ID gerado
   */
  criar(produto: Produto): Promise<Produto>;
  
  /**
   * Atualiza um produto existente no repositório.
   * @param id - ID do produto a ser atualizado
   * @param produto - Objeto com os dados parciais ou completos a serem atualizados
   * @returns Promise que resolve para o produto atualizado
   */
  atualizar(id: string, produto: Partial<Produto>): Promise<Produto>;
  
  /**
   * Deleta um produto do repositório.
   * @param id - ID do produto a ser deletado
   * @returns Promise que resolve quando o produto é deletado
   */
  deletar(id: string): Promise<void>;
}