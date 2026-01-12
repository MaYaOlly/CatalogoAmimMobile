export type TipoDesconto = "percentual" | "fixo";
export type Cupom = {
    _id: string;
    _codigo: string;
    _tipoDesconto: TipoDesconto;
    _valorDesconto: number;
    _dataValidade: Date;
    _ativo: boolean;
}