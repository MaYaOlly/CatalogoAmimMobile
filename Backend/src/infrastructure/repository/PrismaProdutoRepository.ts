import { PrismaClient } from "@prisma/client";
import { IProdutoRepository } from "../../domain/models/interfaces/IProdutoRepository";
import { Produto } from "../../domain/models/class/Produto";

/**
 * Implementação de PrismaProdutoRepository usando Prisma ORM.
 * Fornece acesso aos dados de produtos no banco de dados.
 */
export class PrismaProdutoRepository implements IProdutoRepository {
  /**
   * Cria uma nova instância do repositório de produtos.
   * @param prisma - Cliente Prisma para acesso ao banco de dados
   */
  constructor(private prisma: PrismaClient) {}

  public async listarTodos(): Promise<Produto[]> {
    const produtosData = await this.prisma.produto.findMany();
    return produtosData.map(Produto.fromPersistence);
  }

  /**
   * Busca um produto no banco de dados pelo seu ID.
   * @param id - ID do produto a ser buscado
   * @returns Promise que resolve para o produto encontrado ou null
   */
  public async buscarPorId(id: string): Promise<Produto | null> {
    const produtoData = await this.prisma.produto.findUnique({ where: { id } });
    return produtoData ? Produto.fromPersistence(produtoData) : null;
  }

  /**
   * Cria um novo produto no banco de dados.
   * @param produto - Entidade Produto a ser persistida
   * @returns Promise que resolve para o produto criado com ID gerado
   */
  public async criar(produto: Produto): Promise<Produto> {
    const produtoData = await this.prisma.produto.create({
      data: {
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        categoria: produto.categoria,
        imagemUrl: produto.imagemUrl,
        disponivel: produto.disponivel,
      },
    });
    return Produto.fromPersistence(produtoData);
  }

  /**
   * Atualiza um produto existente no banco de dados.
   * @param id - ID do produto a ser atualizado
   * @param produto - Entidade Produto com os dados atualizados
   * @returns Promise que resolve para o produto atualizado
   */
  public async atualizar(id: string, produto: Produto): Promise<Produto> {
    const produtoData = await this.prisma.produto.update({
      where: { id },
      data: produto.toPersistence(), 
    });
    return Produto.fromPersistence(produtoData);
  }

  /**
   * Deleta um produto do banco de dados.
   * @param id - ID do produto a ser deletado
   * @returns Promise que resolve quando o produto é deletado
   */
  public async deletar(id: string): Promise<void> {
    await this.prisma.produto.delete({ where: { id } });
  }
}