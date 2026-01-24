"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CupomService_1 = require("../../application/services/CupomService");
const PrismaCupomRepository_1 = require("../../infrastructure/repository/PrismaCupomRepository");
const PrismaClient_1 = require("../../infrastructure/prisma/PrismaClient");
describe('Cupons - Integração (Service + Repository + DB)', () => {
    let cupomService;
    beforeAll(() => {
        const repository = new PrismaCupomRepository_1.PrismaCupomRepository(PrismaClient_1.prisma);
        cupomService = new CupomService_1.CupomService(repository);
    });
    afterAll(async () => {
        await PrismaClient_1.prisma.$disconnect();
    });
    it('deve criar cupom com sucesso', async () => {
        const codigoUnico = `CUPOM${Date.now()}`;
        const cupom = await cupomService.criarCupom({
            codigo: codigoUnico,
            tipoDesconto: 'percentual',
            valorDesconto: 10,
            dataValidade: new Date('2026-12-31'),
            ativo: true
        });
        expect(cupom).toHaveProperty('id');
        expect(cupom.codigo).toBe(codigoUnico);
        expect(cupom.valorDesconto).toBe(10);
    });
    it('deve listar cupons', async () => {
        const cupons = await cupomService.buscarCupons();
        expect(Array.isArray(cupons)).toBe(true);
    });
    it('deve buscar cupom por código', async () => {
        const codigoUnico = `TESTE${Date.now()}`;
        await cupomService.criarCupom({
            codigo: codigoUnico,
            tipoDesconto: 'fixo',
            valorDesconto: 5,
            dataValidade: new Date('2026-12-31'),
            ativo: true
        });
        const cupom = await cupomService.validarCupom(codigoUnico);
        expect(cupom).toBeTruthy();
        expect(cupom?.codigo).toBe(codigoUnico);
    });
    it('deve rejeitar cupom com código duplicado', async () => {
        const codigoUnico = `DUP${Date.now()}`;
        await cupomService.criarCupom({
            codigo: codigoUnico,
            tipoDesconto: 'percentual',
            valorDesconto: 15,
            dataValidade: new Date('2026-12-31'),
            ativo: true
        });
        await expect(cupomService.criarCupom({
            codigo: codigoUnico,
            tipoDesconto: 'percentual',
            valorDesconto: 20,
            dataValidade: new Date('2026-12-31'),
            ativo: true
        })).rejects.toThrow();
    });
});
