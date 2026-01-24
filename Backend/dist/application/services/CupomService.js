"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CupomService = void 0;
const Cupom_1 = require("../../domain/models/class/Cupom");
/**
 * Service de gestão de cupons.
 * Implementa a lógica de negócio para operações com cupons de desconto.
 */
class CupomService {
    /**
     * Cria uma nova instância do CupomService.
     * @param cupomRepository - Repositório de cupons para persistência de dados
     */
    constructor(cupomRepository) {
        this.cupomRepository = cupomRepository;
    }
    /**
     * Cria um novo cupom de desconto.
     * @param dados - Dados do cupom a ser criado
     * @returns Promise que resolve para o cupom criado
     * @throws {Error} Se já existe um cupom com o mesmo código
     */
    async criarCupom(dados) {
        const cupomExistente = await this.cupomRepository.buscarPorCodigo(dados.codigo);
        if (cupomExistente) {
            throw new Error("Já existe um cupom com este código.");
        }
        const novoCupom = new Cupom_1.Cupom('', dados.codigo, dados.tipoDesconto, dados.valorDesconto, dados.dataValidade, dados.ativo ?? true);
        return this.cupomRepository.criar(novoCupom);
    }
    /**
     * Lista todos os cupons cadastrados.
     * @returns Promise que resolve para um array de cupons
     */
    async buscarCupons() {
        return await this.cupomRepository.listarCupons();
    }
    /**
     * Valida um cupom verificando sua existência e validade.
     * @param codigo - Código do cupom a ser validado
     * @returns Promise que resolve para o cupom válido
     * @throws {Error} Se o cupom não for encontrado ou estiver expirado/inativo
     */
    async validarCupom(codigo) {
        const cupom = await this.cupomRepository.buscarPorCodigo(codigo);
        if (!cupom) {
            throw new Error("Cupom não encontrado.");
        }
        if (!cupom.estaValido()) {
            this.desativarCupom(cupom.codigo);
            throw new Error("Cupom expirado ou inativo.");
        }
        return cupom;
    }
    /**
     * Desativa um cupom tornando-o inválido para uso.
     * @param codigo - Código do cupom a ser desativado
     * @returns Promise que resolve para o cupom desativado
     * @throws {Error} Se o cupom não for encontrado
     */
    async desativarCupom(codigo) {
        const cupom = await this.cupomRepository.buscarPorCodigo(codigo);
        if (!cupom) {
            throw new Error("Cupom não encontrado.");
        }
        const cupomAtualizado = new Cupom_1.Cupom(cupom.id, cupom.codigo, cupom.tipoDesconto, cupom.valorDesconto, cupom.dataValidade, false // Desativa o cupom
        );
        return this.cupomRepository.atualizar(cupomAtualizado);
    }
}
exports.CupomService = CupomService;
