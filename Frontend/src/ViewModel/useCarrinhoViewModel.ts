import { useCarrinho } from '../contexts/CarrinhoContext';

/**
 * ViewModel para a tela de Carrinho
 * Gerencia a lógica de negócio e formatação de dados para a View
 */
export function useCarrinhoViewModel() {
  // Obtém dados e funções do contexto do carrinho
  const {
    itens,
    quantidadeTotal,
    subtotal,
    total,
    carregando,
    removerDoCarrinho,
    atualizarQuantidade,
    limparCarrinho,
  } = useCarrinho();

  // Função para formatar valor em reais
  const formatarPreco = (valor: number): string => {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  };

  // Função para incrementar quantidade de um item
  const incrementarQuantidade = async (produtoId: string) => {
    const item = itens.find(i => i.produto.id === produtoId);
    if (item) {
      await atualizarQuantidade(produtoId, item.quantidade + 1);
    }
  };

  // Função para decrementar quantidade de um item
  const decrementarQuantidade = async (produtoId: string) => {
    const item = itens.find(i => i.produto.id === produtoId);
    if (item && item.quantidade > 1) {
      await atualizarQuantidade(produtoId, item.quantidade - 1);
    } else if (item && item.quantidade === 1) {
      // Se quantidade é 1 e o usuário decrementa, remove o item
      await removerDoCarrinho(produtoId);
    }
  };

  // Função para calcular o preço total de um item (preço * quantidade)
  const calcularPrecoItem = (preco: string, quantidade: number): string => {
    const precoNumerico = parseFloat(
      preco
        .replace('R$', '')
        .replace(/\s/g, '')
        .replace(',', '.')
    );
    const totalItem = precoNumerico * quantidade;
    return formatarPreco(totalItem);
  };

  // Verificar se o carrinho está vazio
  const carrinhoVazio = itens.length === 0;

  // Dados formatados para exibição
  const dadosFormatados = {
    subtotal: formatarPreco(subtotal),
    total: formatarPreco(total),
    quantidadeTotal,
    carrinhoVazio,
  };

  // Retorna os dados e funções para a View
  return {
    // Estado
    itens,
    carregando,
    dadosFormatados,
    
    // Actions
    incrementarQuantidade,
    decrementarQuantidade,
    removerDoCarrinho,
    limparCarrinho,
    calcularPrecoItem,
    formatarPreco,
  };
}
