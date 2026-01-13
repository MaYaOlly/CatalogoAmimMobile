import { AxiosInstance } from "axios";
import { Cupom } from "../entities/typeCupom";

export class CupomService {
    constructor(private url: AxiosInstance){
        this.url = url;
    }
    async getCupons() : Promise<Cupom[]>{
        try {
            const { data } =  await this.url.get<Cupom[]>('/cupons');
            return data;
        }catch(err: any){
            throw new Error(err.message);
        }
    }
}
