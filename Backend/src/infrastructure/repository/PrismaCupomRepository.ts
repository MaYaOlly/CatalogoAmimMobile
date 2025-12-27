import { PrismaClient, Cupom as CupomData } from "@prisma/client";
import { ICupomRepository } from "../../domain/models/interfaces/ICupomRepository";
import { Cupom, TipoDesconto } from "../../domain/models/class/Cupom";

export class PrismaCupomRepository implements ICupomRepository {
  constructor(private prisma: PrismaClient) { }

  private mapToDomain(cupomData: CupomData): Cupom {
    return new Cupom(
      cupomData.id,
      cupomData.codigo,
      cupomData.tipoDesconto as TipoDesconto,
      cupomData.valorDesconto,
      cupomData.dataValidade,
      cupomData.ativo
    );
  }

  public async buscarPorCodigo(codigo: string): Promise<Cupom | null> {
    const cupomData = await this.prisma.cupom.findUnique({ where: { codigo } });
    return cupomData ? this.mapToDomain(cupomData) : null;
  }
}