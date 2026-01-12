import { FastifyRequest, FastifyReply } from 'fastify';
import { CupomService } from '../../../application/services/CupomService';
import { TipoDesconto } from '../../../domain/models/class/Cupom';

/**
 * Interface para o corpo da requisição de criação de cupom.
 */
interface CriarCupomBody {
  codigo: string;
  tipoDesconto: TipoDesconto;
  valorDesconto: number;
  dataValidade: string;
  ativo: boolean;
}

/**
 * Controller de cupons.
 * Gerencia os handlers HTTP para operações com cupons de desconto.
 */
export class CupomController {
  /**
   * Cria uma nova instância do CupomController.
   * @param cupomService - Service de cupons para lógica de negócio
   */
  constructor(private cupomService: CupomService) {}

  async criarCupom(request: FastifyRequest<{ Body: CriarCupomBody }>, reply: FastifyReply) {
    try {
      const { codigo, tipoDesconto, valorDesconto, dataValidade, ativo } = request.body;
      const tipoDescontoLower = tipoDesconto.toLocaleLowerCase();;


      const novoCupom = await this.cupomService.criarCupom({
        codigo,
        tipoDesconto : tipoDescontoLower as TipoDesconto,
        valorDesconto,
        dataValidade: new Date(dataValidade),
        ativo,
      });

      reply.status(201).send(novoCupom);
    } catch (error: any) {
      reply.status(400).send({ message: error.message });
    }
  }
  
  async listarCupons(_request: FastifyRequest, reply: FastifyReply) {
    try{
      const cupons = await this.cupomService.buscarCupons();
      reply.send(cupons);
    }catch(error:any){
      reply.status(400).send({ message: error.message });
    }
  }
}