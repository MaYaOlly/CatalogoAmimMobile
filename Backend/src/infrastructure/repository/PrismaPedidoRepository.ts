import { PrismaClient } from "@prisma/client";
import { IPedidoRepository } from "../../domain/models/interfaces/IPedidoRepository";
import { Pedido, StatusPedido } from "../../domain/models/class/Pedido";
import { Usuario } from "../../domain/models/class/Usuario";
import { ItemPedido } from "../../domain/models/class/ItemPedido";
import { Produto } from "../../domain/models/class/Produto";

export class PrismaPedidoRepository implements IPedidoRepository {
    constructor(private prisma: PrismaClient) { }
    public async criar(pedido: Pedido): Promise<Pedido> {
        const pedidoData = await this.prisma.pedido.create({
            data: {
                id: pedido.id,
                usuarioId: pedido.usuario.id,
                precoTotal: pedido.precoTotal,
                status: pedido.status,
                cupomId: pedido.cupom?.id,
                data: pedido.data,
                itens: {
                    create: pedido.itens.map((item) => ({
                        id: item.id,
                        produtoId: item.produto.id,
                        quantidade: item.quantidade,
                        precoUnitario: item.precoUnitario,
                    })),
                },
            },
            include: {
                itens: { include: { produto: true } },
                usuario: true,
                cupom: true,
            },
        });

        const usuario = new Usuario(
            pedidoData.usuario.id,
            pedidoData.usuario.nome,
            pedidoData.usuario.email,
            pedidoData.usuario.senha,
            pedidoData.usuario.endereco
        );

        const itens = pedidoData.itens.map(
            (item) =>
                new ItemPedido(
                    item.id,
                    new Produto(
                        item.produto.id,
                        item.produto.nome,
                        item.produto.descricao,
                        item.produto.preco,
                        item.produto.categoria,
                        item.produto.imagemUrl,
                        item.produto.disponivel
                    ),
                    item.quantidade,
                    item.precoUnitario,
                    item.pedidoId
                )
        );

        const pedidoObj = new Pedido(
            pedidoData.id,
            usuario,
            itens,
            pedidoData.status as StatusPedido,
            pedidoData.data
        );

        return pedidoObj;
    }

    public async buscarPorId(id: string): Promise<Pedido | null> {
        throw new Error("Method not implemented.");
    }
    public async listarPorUsuario(usuarioId: string): Promise<Pedido[]> {
        throw new Error("Method not implemented.");
    }
    public async atualizarStatus(id: string, status: string): Promise<Pedido> {
        throw new Error("Method not implemented.");
    }
}