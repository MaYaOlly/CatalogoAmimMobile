import { AxiosInstance } from "axios";
import { Produto } from "../entities/typeProduto";

export class ProdutoService {
    private url: AxiosInstance;
    constructor(url: AxiosInstance) {
        this.url = url;
    }
    async getProdutos(): Promise<Produto[]> {
        try {
            const result = await this.url.get<Produto[]>('/produtos');
            return result.data;
        }catch(err: any){
            throw new Error(err.message);
        }
    }
}
