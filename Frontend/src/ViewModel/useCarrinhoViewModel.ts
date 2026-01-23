import { useCarrinho } from '../contexts/CarrinhoContext';
import { useState } from 'react';
import { Alert } from 'react-native';

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
    desconto,
    total,
    carregando,
    cupomAplicado,
    removerDoCarrinho,
    atualizarQuantidade,
    limparCarrinho,
    validarEAplicarCupom,
    removerCupom,
  } = useCarrinho();

  // Estados do modal de cupom
  const [modalCupomVisivel, setModalCupomVisivel] = useState(false);
  const [codigoCupom, setCodigoCupom] = useState('');
  const [aplicandoCupom, setAplicandoCupom] = useState(false);

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

  // Funções do modal de cupom
  const abrirModalCupom = () => {
    setModalCupomVisivel(true);
    setCodigoCupom('');
  };

  const fecharModalCupom = () => {
    setModalCupomVisivel(false);
    setCodigoCupom('');
  };

  // Função para aplicar cupom com validação completa
  const aplicarCupomComValidacao = async () => {
    if (!codigoCupom.trim()) {
      Alert.alert("Atenção", "Por favor, digite um código de cupom.");
      return;
    }

    setAplicandoCupom(true);
    
    const resultado = await validarEAplicarCupom(codigoCupom.trim());
    setAplicandoCupom(false);
    
    if (resultado.sucesso) {
      Alert.alert(
        "Sucesso!", 
        resultado.mensagem,
        [{ text: "OK", onPress: fecharModalCupom }]
      );
    } else {
      Alert.alert(
        "Cupom inválido", 
        resultado.mensagem
      );
    }
  };

  // Dados formatados para exibição
  const dadosFormatados = {
    subtotal: formatarPreco(subtotal),
    desconto: formatarPreco(desconto),
    total: formatarPreco(total),
    quantidadeTotal,
    carrinhoVazio,
    cupomAplicado: cupomAplicado ? {
      codigo: cupomAplicado._codigo,
      tipoDesconto: cupomAplicado._tipoDesconto,
      valorDesconto: cupomAplicado._valorDesconto,
    } : null,
  };

  // Retorna os dados e funções para a View
  return {
    // Estado
    itens,
    carregando,
    dadosFormatados,
    
    // Estados do modal
    modalCupomVisivel,
    codigoCupom,
    aplicandoCupom,
    
    // Actions do carrinho
    incrementarQuantidade,
    decrementarQuantidade,
    removerDoCarrinho,
    limparCarrinho,
    calcularPrecoItem,
    formatarPreco,
    
    // Actions do cupom
    abrirModalCupom,
    fecharModalCupom,
    setCodigoCupom,
    aplicarCupomComValidacao,
    removerCupom,
  };
}
