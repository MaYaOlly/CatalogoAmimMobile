import { PrismaClient } from "@prisma/client";
import { IProdutoRepository } from "../models/interfaces/IProdutoRepository";
import { Produto } from "../../domain/models/class/Produto";

const prisma = new PrismaClient();

export class PrismaProdutoRepository implements IProdutoRepository {
  public async listarTodos(): Promise<Produto[]> {
    const produtosData = await prisma.produto.findMany();

    return produtosData.map(p => new Produto(
      p.id,
      p.nome,
      p.descricao,
      p.preco,
      p.categoria,
      p.imagemUrl,
      p.disponivel
    ));
  }
}