import { Cupom, TipoDesconto } from "../class/Cupom";
/**
 * DTO para criação de um novo cupom.
 * Define os dados necessários para criar um cupom de desconto.
 */
export interface CriarCupomDTO {
  codigo: string;
  tipoDesconto: TipoDesconto;
  valorDesconto: number;
  dataValidade: Date;
  ativo?: boolean;
}

export interface ICupomService {
  criarCupom(dados: CriarCupomDTO): Promise<Cupom>;
  buscarCupons(): Promise<Cupom[]>;
  validarCupom(codigo: string): Promise<Cupom>;
  desativarCupom(id: string): Promise<Cupom>;
}