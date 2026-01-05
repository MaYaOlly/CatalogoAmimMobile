import { Cupom } from "../class/Cupom";

/**
 * Interface para o repositório de Cupons.
 * Define os métodos necessários para operações de persistência com cupons.
 */
export interface ICupomRepository {
  /**
   * Cria um novo cupom no repositório.
   * @param cupom - Objeto Cupom a ser criado
   * @returns Promise que resolve para o cupom criado com ID gerado
   */
  criar(cupom: Cupom): Promise<Cupom>;
  
  /**
   * Busca um cupom pelo seu código.
   * @param codigo - Código do cupom a ser buscado
   * @returns Promise que resolve para o cupom encontrado ou null se não existir
   */
  buscarPorCodigo(codigo: string): Promise<Cupom | null>;
  
  /**
   * Atualiza um cupom existente no repositório.
   * @param cupom - Objeto Cupom com os dados atualizados
   * @returns Promise que resolve para o cupom atualizado
   */
  atualizar(cupom: Cupom): Promise<Cupom>;
}