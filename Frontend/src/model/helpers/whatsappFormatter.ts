import { ItemCarrinho } from "../../contexts/CarrinhoContext";
import { DadosEndereco } from "../../contexts/CheckoutContext";
import { Cupom } from "../entities/typeCupom";

/**
 * Helper para formatação de mensagens do WhatsApp
 * Centraliza toda a lógica de formatação de pedidos
 */

interface DadosPedido {
  nomeCliente: string;
  itens: ItemCarrinho[];
  subtotal: number;
  cupomAplicado: Cupom | null;
  total: number;
  endereco: DadosEndereco;
  formaPagamento: string;
}

export class WhatsAppFormatter {
  /**
   * Formata mensagem completa do pedido para WhatsApp
   */
  static formatarPedido(dados: DadosPedido): string {
    const {
      nomeCliente,
      itens,
      subtotal,
      cupomAplicado,
      total,
      endereco,
      formaPagamento
    } = dados;

    let mensagem = `*NOVO PEDIDO - Catálogo Amim*\n\n`;
    mensagem += `*Cliente:* ${nomeCliente}\n\n`;
    
    mensagem += `*ITENS DO PEDIDO:*\n`;
    mensagem += this.formatarItens(itens);
    
    mensagem += `\n*Subtotal:* R$ ${this.formatarValor(subtotal)}\n`;
    
    if (cupomAplicado) {
      const desconto = this.calcularDesconto(subtotal, cupomAplicado);
      mensagem += `*Cupom (${cupomAplicado._codigo}):* -R$ ${this.formatarValor(desconto)}\n`;
    }

    mensagem += `*VALOR TOTAL:* R$ ${this.formatarValor(total)}\n\n`;
    
    mensagem += `*ENDEREÇO DE ENTREGA:*\n`;
    mensagem += `${this.formatarEndereco(endereco)}\n\n`;
    
    mensagem += `*FORMA DE PAGAMENTO:*\n`;
    mensagem += `${this.formatarFormaPagamento(formaPagamento)}\n\n`;
    
    mensagem += `_Pedido realizado pelo app Catálogo Amim_`;
    
    return mensagem;
  }

  /**
   * Formata lista de itens do pedido
   */
  private static formatarItens(itens: ItemCarrinho[]): string {
    return itens.map((item, index) => {
      const precoUnitario = this.extrairValorNumerico(item.produto.preco);
      const totalItem = precoUnitario * item.quantidade;
      
      return (
        `${index + 1}. ${item.produto.nome}\n` +
        `   Qtd: ${item.quantidade} | ${item.produto.preco} cada\n` +
        `   Subtotal: R$ ${this.formatarValor(totalItem)}\n`
      );
    }).join('\n');
  }

  /**
   * Formata endereço completo
   */
  private static formatarEndereco(endereco: DadosEndereco): string {
    const partes = [
      endereco.rua,
      endereco.numero,
      endereco.complemento,
      endereco.bairro,
      `CEP: ${endereco.cep}`
    ].filter(Boolean);
    
    return partes.join(", ");
  }

  /**
   * Formata forma de pagamento de forma legível
   */
  private static formatarFormaPagamento(forma: string): string {
    const formas: { [key: string]: string } = {
      'pix': 'PIX',
      'dinheiro': 'Dinheiro',
      'debito': 'Cartão de Débito',
      'credito': 'Cartão de Crédito'
    };
    
    return formas[forma.toLowerCase()] || forma.toUpperCase();
  }

  /**
   * Calcula desconto do cupom
   */
  private static calcularDesconto(subtotal: number, cupom: Cupom): number {
    if (cupom._tipoDesconto === 'percentual') {
      return (subtotal * cupom._valorDesconto) / 100;
    }
    return cupom._valorDesconto;
  }

  /**
   * Extrai valor numérico de string formatada (ex: "R$ 25,00" -> 25.00)
   */
  private static extrairValorNumerico(valorFormatado: string): number {
    return parseFloat(
      valorFormatado
        .replace('R$', '')
        .replace(/\s/g, '')
        .replace(',', '.')
    );
  }

  /**
   * Formata número para moeda brasileira (25.5 -> "25,50")
   */
  private static formatarValor(valor: number): string {
    return valor.toFixed(2).replace('.', ',');
  }
}
