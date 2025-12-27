import { PrismaClient } from "@prisma/client";
import { IProdutoRepository } from "../../domain/models/interfaces/IProdutoRepository";
import { Produto } from "../../domain/models/class/Produto";

export class PrismaProdutoRepository implements IProdutoRepository {
  constructor(private prisma: PrismaClient) {}

  public async listarTodos(): Promise<Produto[]> {
    const produtosData = await this.prisma.produto.findMany();
    return produtosData.map(Produto.fromPersistence);
  }

  public async buscarPorId(id: string): Promise<Produto | null> {
    const produtoData = await this.prisma.produto.findUnique({ where: { id } });
    return produtoData ? Produto.fromPersistence(produtoData) : null;
  }

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

 public async atualizar(id: string, produto: Produto): Promise<Produto> {
    const produtoData = await this.prisma.produto.update({
      where: { id },
      data: produto.toPersistence(), 
    });
    return Produto.fromPersistence(produtoData);
  }

  public async deletar(id: string): Promise<void> {
    await this.prisma.produto.delete({ where: { id } });
  }
}