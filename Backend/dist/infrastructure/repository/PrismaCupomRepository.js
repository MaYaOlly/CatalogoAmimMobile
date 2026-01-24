"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaCupomRepository = void 0;
const Cupom_1 = require("../../domain/models/class/Cupom");
/**
 * Implementação de PrismaCupomRepository usando Prisma ORM.
 * Fornece acesso aos dados de cupons no banco de dados.
 */
class PrismaCupomRepository {
    /**
     * Cria uma nova instância do repositório de cupons.
     * @param prisma - Cliente Prisma para acesso ao banco de dados
     */
    constructor(prisma) {
        this.prisma = prisma;
    }
    async criar(cupom) {
        const cupomData = await this.prisma.cupom.create({
            data: {
                codigo: cupom.codigo,
                tipoDesconto: cupom.tipoDesconto,
                valorDesconto: cupom.valorDesconto,
                dataValidade: cupom.dataValidade,
                ativo: cupom.ativo,
            },
        });
        return new Cupom_1.Cupom(cupomData.id, cupomData.codigo, cupomData.tipoDesconto, cupomData.valorDesconto, cupomData.dataValidade, cupomData.ativo);
    }
    /**
     * Retorna todos os cupons do banco de dados.
     * @returns Promise que resolve para um array com todos os cupons
     */
    async listarCupons() {
        const cuponsData = await this.prisma.cupom.findMany();
        return cuponsData.map((cupomData) => new Cupom_1.Cupom(cupomData.id, cupomData.codigo, cupomData.tipoDesconto, cupomData.valorDesconto, cupomData.dataValidade, cupomData.ativo));
    }
    /**
     * Busca um cupom no banco de dados pelo seu código.
     * @param codigo - Código do cupom a ser buscado
     * @returns Promise que resolve para o cupom encontrado ou null
     */
    async buscarPorCodigo(codigo) {
        const cupomData = await this.prisma.cupom.findUnique({
            where: { codigo },
        });
        if (!cupomData)
            return null;
        return new Cupom_1.Cupom(cupomData.id, cupomData.codigo, cupomData.tipoDesconto, cupomData.valorDesconto, cupomData.dataValidade, cupomData.ativo);
    }
    /**
     * Cria um novo cupom no banco de dados.
     * @param cupom - Entidade Cupom a ser persistida
     * @returns Promise que resolve para o cupom criado com ID gerado
     */ /**
    * Atualiza um cupom existente no banco de dados.
    * @param cupom - Entidade Cupom com os dados atualizados
    * @returns Promise que resolve para o cupom atualizado
    */
    async atualizar(cupom) {
        const cupomData = await this.prisma.cupom.update({
            where: { id: cupom.id },
            data: {
                ativo: cupom.ativo,
            },
        });
        return new Cupom_1.Cupom(cupomData.id, cupomData.codigo, cupomData.tipoDesconto, cupomData.valorDesconto, cupomData.dataValidade, cupomData.ativo);
    }
}
exports.PrismaCupomRepository = PrismaCupomRepository;
