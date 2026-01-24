"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CupomController = void 0;
/**
 * Controller de cupons.
 * Gerencia os handlers HTTP para operações com cupons de desconto.
 */
class CupomController {
    /**
     * Cria uma nova instância do CupomController.
     * @param cupomService - Service de cupons para lógica de negócio
     */
    constructor(cupomService) {
        this.cupomService = cupomService;
    }
    async criarCupom(request, reply) {
        try {
            const { codigo, tipoDesconto, valorDesconto, dataValidade, ativo } = request.body;
            const tipoDescontoLower = tipoDesconto.toLocaleLowerCase();
            ;
            const novoCupom = await this.cupomService.criarCupom({
                codigo,
                tipoDesconto: tipoDescontoLower,
                valorDesconto,
                dataValidade: new Date(dataValidade),
                ativo,
            });
            reply.status(201).send(novoCupom);
        }
        catch (error) {
            reply.status(400).send({ message: error.message });
        }
    }
    async listarCupons(_request, reply) {
        try {
            const cupons = await this.cupomService.buscarCupons();
            reply.send(cupons);
        }
        catch (error) {
            reply.status(400).send({ message: error.message });
        }
    }
}
exports.CupomController = CupomController;
