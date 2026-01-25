import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Linking, Alert } from "react-native";
import { useCarrinho } from './CarrinhoContext';
import { useAuth } from './AuthContext';
import { PedidoService } from '../model/services/pedidoService';
import { ItemPedidoApi } from '../model/entities/typePedido';
import { apiClient } from '../model/infrastructure/apiConfig';
import { WhatsAppFormatter } from '../model/helpers/whatsappFormatter';

const pedidoService = new PedidoService(apiClient);

// Interface para dados de endereço
export interface DadosEndereco {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  complemento?: string;
}

// Interface para o contexto de checkout
interface CheckoutContextData {
  endereco: DadosEndereco;
  formaPagamento: string;
  cupomCodigo: string;
  processando: boolean;
  atualizarEndereco: (campo: keyof DadosEndereco, valor: string) => void;
  setFormaPagamento: (forma: string) => void;
  setCupomCodigo: (cupom: string) => void;
  validarEndereco: () => boolean;
  validarPagamento: () => boolean;
  formatarEnderecoCompleto: () => string;
  finalizarPedido: () => Promise<boolean>;
  resetarCheckout: () => void;
}

// Criação do contexto
const CheckoutContext = createContext<CheckoutContextData>({} as CheckoutContextData);

// Provider do contexto
interface CheckoutProviderProps {
  children: ReactNode;
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const { itens, total, limparCarrinho, cupomAplicado } = useCarrinho();
  const { usuario } = useAuth();

  // Estados do checkout
  const [endereco, setEndereco] = useState<DadosEndereco>({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    complemento: ""
  });

  const [formaPagamento, setFormaPagamento] = useState<string>("");
  const [cupomCodigo, setCupomCodigo] = useState<string>("");
  const [processando, setProcessando] = useState(false);

  // Função para atualizar endereço
  const atualizarEndereco = (campo: keyof DadosEndereco, valor: string) => {
    setEndereco(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  // Função para validar endereço
  const validarEndereco = (): boolean => {
    if (!endereco.cep || !endereco.rua || !endereco.numero || !endereco.bairro) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos de endereço.");
      return false;
    }
    return true;
  };

  // Função para validar forma de pagamento
  const validarPagamento = (): boolean => {
    if (!formaPagamento) {
      Alert.alert("Atenção", "Por favor, selecione uma forma de pagamento.");
      return false;
    }
    return true;
  };

  // Função para formatar endereço completo
  const formatarEnderecoCompleto = (): string => {
    const partes = [
      endereco.rua,
      endereco.numero,
      endereco.complemento,
      endereco.bairro,
      `CEP: ${endereco.cep}`
    ].filter(Boolean);
    
    return partes.join(", ");
  };

  // Função para formatar mensagem do WhatsApp
  const formatarMensagemWhatsApp = (): string => {
    const nomeCliente = usuario?.nome || "Cliente";
    
    // Calcular subtotal
    const subtotalValor = itens.reduce((total, item) => {
      const precoUnitario = parseFloat(
        item.produto.preco.replace('R$', '').replace(/\s/g, '').replace(',', '.')
      );
      return total + (precoUnitario * item.quantidade);
    }, 0);

    // Usar o WhatsAppFormatter para gerar a mensagem
    return WhatsAppFormatter.formatarPedido({
      nomeCliente,
      itens,
      subtotal: subtotalValor,
      cupomAplicado,
      total,
      endereco,
      formaPagamento
    });
  };

  // Função para enviar pedido ao WhatsApp
  const enviarParaWhatsApp = async () => {
    try {
      // Número do WhatsApp da empresa (substitua pelo número real)
      const numeroWhatsApp = "+5586999183229"; // Formato: código do país + DDD + número
      
      const mensagem = formatarMensagemWhatsApp();
      const mensagemEncoded = encodeURIComponent(mensagem);
      
      const urlWhatsApp = `whatsapp://send?phone=${numeroWhatsApp}&text=${mensagemEncoded}`;
      
      // Verifica se o WhatsApp pode ser aberto
      const supported = await Linking.canOpenURL(urlWhatsApp);
      
      if (supported) {
        await Linking.openURL(urlWhatsApp);
        return true;
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível abrir o WhatsApp. Certifique-se de que o aplicativo está instalado."
        );
        return false;
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível abrir o WhatsApp.");
      return false;
    }
  };

  // Função principal para finalizar pedido
  const finalizarPedido = async () => {
    try {
      setProcessando(true);

      // Validações finais
      if (!validarEndereco() || !validarPagamento()) {
        setProcessando(false);
        return false;
      }

      if (!usuario) {
        Alert.alert("Erro", "Usuário não autenticado.");
        setProcessando(false);
        return false;
      }

      if (itens.length === 0) {
        Alert.alert("Erro", "Carrinho está vazio.");
        setProcessando(false);
        return false;
      }

      // Salvar dados antes de enviar (pois o app pode ser suspenso)
      const itensParaAPI = itens.map(item => ({
        produtoId: item.produto.id,
        quantidade: item.quantidade
      }));
      const codigoCupomParaAPI = cupomAplicado?._codigo || undefined;

      // IMPORTANTE: Envia para WhatsApp PRIMEIRO (antes de criar o pedido na API)
      // Isso garante que o cupom ainda está válido quando o usuário visualiza no WhatsApp
      const whatsappEnviado = await enviarParaWhatsApp();

      if (!whatsappEnviado) {
        setProcessando(false);
        return false;
      }

      // Se chegou aqui, WhatsApp foi aberto com sucesso
      // Agora vamos tentar criar o pedido na API em background
      try {
        const pedidoCriado = await pedidoService.criarPedido({
          usuarioId: usuario.id,
          itens: itensParaAPI,
          formaPagamento: formaPagamento,
          cupomCodigo: codigoCupomParaAPI
        });

        console.log("Pedido criado com sucesso:", pedidoCriado);
      } catch (apiError: any) {
        // Se der erro na API, apenas loga mas não impede o fluxo
        // pois o WhatsApp já foi aberto e o pedido já foi enviado
        // Erro de cupom é esperado se o pedido foi criado anteriormente
        if (apiError?.response?.data?.message?.includes('Cupom') || 
            apiError?.message?.includes('Cupom')) {
          console.log("Pedido já foi processado - cupom já utilizado");
        } else {
          console.error("Erro ao criar pedido na API:", apiError?.message || apiError);
        }
      }

      // Limpa o carrinho e reseta checkout independente do resultado da API
      await limparCarrinho();
      resetarCheckout();

      setProcessando(false);
      return true;
    } catch (error: any) {
      // Mensagens de erro mais amigáveis
      let mensagemErro = "Não foi possível finalizar o pedido. Tente novamente.";
      
      if (error.message === "Network Error") {
        mensagemErro = "Sem conexão com o servidor. Verifique sua internet e tente novamente.";
      } else if (error.response?.status === 400) {
        mensagemErro = "Dados do pedido inválidos. Verifique as informações e tente novamente.";
      } else if (error.response?.status === 404) {
        mensagemErro = "Produto não encontrado. O item pode não estar mais disponível.";
      } else if (error.response?.data?.message) {
        mensagemErro = error.response.data.message;
      } else if (error.message && error.message !== "Network Error") {
        mensagemErro = error.message;
      }
      
      Alert.alert(
        "Ops! Algo deu errado",
        mensagemErro
      );
      
      setProcessando(false);
      return false;
    }
  };

  // Função para resetar o checkout
  const resetarCheckout = () => {
    setEndereco({
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      complemento: ""
    });
    setFormaPagamento("");
    setCupomCodigo("");
  };

  return (
    <CheckoutContext.Provider
      value={{
        endereco,
        formaPagamento,
        cupomCodigo,
        processando,
        atualizarEndereco,
        setFormaPagamento,
        setCupomCodigo,
        validarEndereco,
        validarPagamento,
        formatarEnderecoCompleto,
        finalizarPedido,
        resetarCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

// Hook para usar o contexto de checkout
export function useCheckout() {
  const context = useContext(CheckoutContext);
  
  if (!context) {
    throw new Error('useCheckout deve ser usado dentro de um CheckoutProvider');
  }
  
  return context;
}
