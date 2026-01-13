import { CupomController } from '../CupomController';
import { CupomService } from '../../../../application/services/CupomService';
import { Cupom } from '../../../../domain/models/class/Cupom';
import { FastifyRequest, FastifyReply } from 'fastify';

describe('CupomController', () => {
  let cupomController: CupomController;
  let mockCupomService: jest.Mocked<CupomService>;
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    mockCupomService = {
      criarCupom: jest.fn(),
      validarCupom: jest.fn(),
      desativarCupom: jest.fn(),
    } as any;

    cupomController = new CupomController(mockCupomService);

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  describe('criarCupom', () => {
    it('deve criar cupom com sucesso', async () => {
      const cupom = new Cupom('1', 'DESCONTO10', 'percentual', 10, new Date('2026-12-31'), true);
      mockRequest = {
        body: {
          codigo: 'DESCONTO10',
          tipoDesconto: 'PERCENTUAL',
          valorDesconto: 10,
          dataValidade: '2026-12-31',
          ativo: true,
        },
      };
      mockCupomService.criarCupom.mockResolvedValue(cupom);

      await cupomController.criarCupom(mockRequest as any, mockReply as any);

      expect(mockCupomService.criarCupom).toHaveBeenCalledWith({
        codigo: 'DESCONTO10',
        tipoDesconto: 'percentual',
        valorDesconto: 10,
        dataValidade: new Date('2026-12-31'),
        ativo: true,
      });
      expect(mockReply.status).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith(cupom);
    });

    it('deve retornar erro 400 quando falha', async () => {
      mockRequest = {
        body: {
          codigo: 'D',
          tipoDesconto: 'PERCENTUAL',
          valorDesconto: -10,
          dataValidade: '2026-12-31',
          ativo: true,
        },
      };
      mockCupomService.criarCupom.mockRejectedValue(new Error('Código inválido'));

      await cupomController.criarCupom(mockRequest as any, mockReply as any);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({ message: 'Código inválido' });
    });

    it('deve converter tipoDesconto para lowercase', async () => {
      const cupom = new Cupom('1', 'DESC', 'fixo', 20, new Date('2026-12-31'), true);
      mockRequest = {
        body: {
          codigo: 'DESC',
          tipoDesconto: 'FIXO',
          valorDesconto: 20,
          dataValidade: '2026-12-31',
          ativo: true,
        },
      };
      mockCupomService.criarCupom.mockResolvedValue(cupom);

      await cupomController.criarCupom(mockRequest as any, mockReply as any);

      expect(mockCupomService.criarCupom).toHaveBeenCalledWith({
        codigo: 'DESC',
        tipoDesconto: 'fixo',
        valorDesconto: 20,
        dataValidade: new Date('2026-12-31'),
        ativo: true,
      });
    });
  });
});
