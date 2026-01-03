import { PrismaClient, Cupom as CupomData } from "@prisma/client";
import { ICupomRepository } from "../../domain/models/interfaces/ICupomRepository";
import { Cupom, TipoDesconto } from "../../domain/models/class/Cupom";

/**
 * Implementação de PrismaCupomRepository usando Prisma ORM.
 * Fornece acesso aos dados de cupons no banco de dados.
 */
export class PrismaCupomRepository implements ICupomRepository {
  /**
   * Cria uma nova instância do repositório de cupons.
   * @param prisma - Cliente Prisma para acesso ao banco de dados
   */
  constructor(private prisma: PrismaClient) {}

  async criar(cupom: Cupom): Promise<Cupom> {
    const cupomData = await this.prisma.cupom.create({
      data: {
        codigo: cupom.codigo,
        tipoDesconto: cupom.tipoDesconto as TipoDesconto,
        valorDesconto: cupom.valorDesconto,
        dataValidade: cupom.dataValidade,
        ativo: cupom.ativo,
      },
    });
    return new Cupom(
      cupomData.id,
      cupomData.codigo,
      cupomData.tipoDesconto as TipoDesconto,
      cupomData.valorDesconto,
      cupomData.dataValidade,
      cupomData.ativo
    );
  }

  /**
   * Busca um cupom no banco de dados pelo seu código.
   * @param codigo - Código do cupom a ser buscado
   * @returns Promise que resolve para o cupom encontrado ou null
   */
  async buscarPorCodigo(codigo: string): Promise<Cupom | null> {
    const cupomData = await this.prisma.cupom.findUnique({
      where: { codigo },
    });

    if (!cupomData) return null;

    return new Cupom(
      cupomData.id,
      cupomData.codigo,
      cupomData.tipoDesconto as TipoDesconto,
      cupomData.valorDesconto,
      cupomData.dataValidade,
      cupomData.ativo
    );
  }
  /**
   * Cria um novo cupom no banco de dados.
   * @param cupom - Entidade Cupom a ser persistida
   * @returns Promise que resolve para o cupom criado com ID gerado
   */  /**
   * Atualiza um cupom existente no banco de dados.
   * @param cupom - Entidade Cupom com os dados atualizados
   * @returns Promise que resolve para o cupom atualizado
   */
  async atualizar(cupom: Cupom): Promise<Cupom> {
    const cupomData = await this.prisma.cupom.update({
      where: { id: cupom.id },
      data: {
        ativo: cupom.ativo,
      },
    });

    return new Cupom(
      cupomData.id,
      cupomData.codigo,
      cupomData.tipoDesconto as TipoDesconto,
      cupomData.valorDesconto,
      cupomData.dataValidade,
      cupomData.ativo
    );
  }
}