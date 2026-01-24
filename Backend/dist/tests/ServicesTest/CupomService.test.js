"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CupomService_1 = require("../../application/services/CupomService");
const Cupom_1 = require("../../domain/models/class/Cupom");
describe('CupomService', () => {
    let cupomService;
    let mockCupomRepository;
    beforeEach(() => {
        mockCupomRepository = {
            criar: jest.fn(),
            buscarPorCodigo: jest.fn(),
            atualizar: jest.fn(),
        };
        cupomService = new CupomService_1.CupomService(mockCupomRepository);
    });
    describe('criarCupom', () => {
        it('deve criar um cupom com sucesso', async () => {
            const cupom = new Cupom_1.Cupom('1', 'DESCONTO10', 'percentual', 10, new Date('2026-12-31'), true);
            mockCupomRepository.buscarPorCodigo.mockResolvedValue(null);
            mockCupomRepository.criar.mockResolvedValue(cupom);
            const resultado = await cupomService.criarCupom({
                codigo: 'DESCONTO10',
                tipoDesconto: 'percentual',
                valorDesconto: 10,
                dataValidade: new Date('2026-12-31'),
                ativo: true,
            });
            expect(resultado).toEqual(cupom);
            expect(mockCupomRepository.criar).toHaveBeenCalledTimes(1);
        });
        it('deve lançar erro quando o código já existe', async () => {
            const cupomExistente = new Cupom_1.Cupom('1', 'DESCONTO10', 'percentual', 10, new Date('2026-12-31'), true);
            mockCupomRepository.buscarPorCodigo.mockResolvedValue(cupomExistente);
            await expect(cupomService.criarCupom({
                codigo: 'DESCONTO10',
                tipoDesconto: 'percentual',
                valorDesconto: 10,
                dataValidade: new Date('2026-12-31'),
                ativo: true,
            })).rejects.toThrow('Já existe um cupom com este código.');
        });
    });
    describe('validarCupom', () => {
        it('deve retornar cupom válido', async () => {
            const cupomValido = new Cupom_1.Cupom('1', 'VALIDO', 'percentual', 15, new Date('2026-12-31'), true);
            mockCupomRepository.buscarPorCodigo.mockResolvedValue(cupomValido);
            const resultado = await cupomService.validarCupom('VALIDO');
            expect(resultado).toEqual(cupomValido);
        });
        it('deve lançar erro quando não encontrado', async () => {
            mockCupomRepository.buscarPorCodigo.mockResolvedValue(null);
            await expect(cupomService.validarCupom('INEXISTENTE')).rejects.toThrow('Cupom não encontrado.');
        });
        it('deve lançar erro quando expirado', async () => {
            const cupomExpirado = new Cupom_1.Cupom('1', 'EXPIRADO', 'percentual', 10, new Date('2020-01-01'), true);
            mockCupomRepository.buscarPorCodigo.mockResolvedValue(cupomExpirado);
            await expect(cupomService.validarCupom('EXPIRADO')).rejects.toThrow('Cupom expirado ou inativo.');
        });
        it('deve lançar erro quando inativo', async () => {
            const cupomInativo = new Cupom_1.Cupom('1', 'INATIVO', 'fixo', 20, new Date('2026-12-31'), false);
            mockCupomRepository.buscarPorCodigo.mockResolvedValue(cupomInativo);
            await expect(cupomService.validarCupom('INATIVO')).rejects.toThrow('Cupom expirado ou inativo.');
        });
    });
    describe('desativarCupom', () => {
        it('deve desativar cupom com sucesso', async () => {
            const cupomAtivo = new Cupom_1.Cupom('1', 'ATIVAR', 'percentual', 10, new Date('2026-12-31'), true);
            const cupomDesativado = new Cupom_1.Cupom('1', 'ATIVAR', 'percentual', 10, new Date('2026-12-31'), false);
            mockCupomRepository.buscarPorCodigo.mockResolvedValue(cupomAtivo);
            mockCupomRepository.atualizar.mockResolvedValue(cupomDesativado);
            const resultado = await cupomService.desativarCupom('ATIVAR');
            expect(resultado.ativo).toBe(false);
        });
        it('deve lançar erro quando não existe', async () => {
            mockCupomRepository.buscarPorCodigo.mockResolvedValue(null);
            await expect(cupomService.desativarCupom('INEXISTENTE')).rejects.toThrow('Cupom não encontrado.');
        });
    });
});
