import { Cupom } from "../class/Cupom";

export interface ICupomRepository {
  buscarPorCodigo(codigo: string): Promise<Cupom | null>;
}