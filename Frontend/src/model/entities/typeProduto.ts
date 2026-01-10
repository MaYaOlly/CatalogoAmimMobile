export type Produto ={
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    categoria: string;
    imagem: string | null;
    disponivel: boolean;
}