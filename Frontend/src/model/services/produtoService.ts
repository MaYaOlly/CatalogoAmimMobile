import { AxiosInstance } from "axios";
import { Produto } from "../entities/typeProduto";
import { formatarMensagemErro } from "../infrastructure/errorUtils";

export class ProdutoService {
    constructor(private url: AxiosInstance) {
        this.url = url;
    }
    async getProdutos(): Promise<Produto[]> {
        try {
            const { data } = await this.url.get<Produto[]>('/produtos');
            return data;
        } catch (err: any) {
            throw new Error(formatarMensagemErro(err));
        }
    }
}
