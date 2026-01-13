import axios, { AxiosInstance } from "axios";
import { Cupom, TipoDesconto } from "../entities/typeCupom";
import { CupomService } from "./cupomService";

describe("CupomService", () => {
  it("deve retornar uma lista de cupons", async () => {
    // Dados simulados
    const mockCupons: Cupom[] = [
      {
        _id: "1",
        _codigo: "CUPOM1",
        _tipoDesconto: "percentual" as TipoDesconto,
        _valorDesconto: 10.0,
        _dataValidade: new Date(),
        _ativo: true,
      },
      {
        _id: "2",
        _codigo: "CUPOM2",
        _tipoDesconto: "fixo" as TipoDesconto,
        _valorDesconto: 20.0,
        _dataValidade: new Date(),
        _ativo: false,
      },
    ];
    // Mock para simular a resposta do prisma
    const mockedAxios = {
      get: jest.fn().mockResolvedValue({ data: mockCupons }),
    } as unknown as AxiosInstance;
    // Injeção de dependência do axios mockado
    const cupomService = new CupomService(mockedAxios);
    // Chamada do método a ser testado
    const response = await cupomService.getCupons();
    // Verificações
    expect(response).toEqual(mockCupons);
    console.log(mockCupons);
    expect(mockedAxios.get).toHaveBeenCalledWith("/cupons");
  });
});
