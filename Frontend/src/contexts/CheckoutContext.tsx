import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Linking, Alert } from "react-native";
import axios from "axios";
import { useCarrinho } from './CarrinhoContext';
import { useAuth } from './AuthContext';
import { PedidoService } from '../model/services/pedidoService';
import { ItemPedidoApi } from '../model/entities/typePedido';

// Configuração da API
const api = axios.create({
  baseURL: "http://192.168.1.4:3333"
});

const pedidoService = new PedidoService(api);

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
  const { itens, total, limparCarrinho } = useCarrinho();
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
    const telefoneCliente = usuario?.telefone || "Não informado";
    
    let mensagem = `🛍️ *NOVO PEDIDO - Catálogo Amim*\n\n`;
    mensagem += `👤 *Cliente:* ${nomeCliente}\n`;
    mensagem += `📱 *Telefone:* ${telefoneCliente}\n\n`;
    
    mensagem += `📦 *ITENS DO PEDIDO:*\n`;
    itens.forEach((item, index) => {
      mensagem += `${index + 1}. ${item.produto.nome}\n`;
      mensagem += `   Qtd: ${item.quantidade} | ${item.produto.preco} cada\n`;
      
      // Calcula total do item
      const precoUnitario = parseFloat(
        item.produto.preco.replace('R$', '').replace(/\s/g, '').replace(',', '.')
      );
      const totalItem = precoUnitario * item.quantidade;
      mensagem += `   Subtotal: R$ ${totalItem.toFixed(2).replace('.', ',')}\n\n`;
    });
    
    mensagem += `💰 *VALOR TOTAL:* R$ ${total.toFixed(2).replace('.', ',')}\n\n`;
    
    mensagem += `📍 *ENDEREÇO DE ENTREGA:*\n`;
    mensagem += `${formatarEnderecoCompleto()}\n\n`;
    
    mensagem += `💳 *FORMA DE PAGAMENTO:*\n`;
    mensagem += `${formaPagamento === 'pix' ? 'PIX' : formaPagamento === 'dinheiro' ? 'Dinheiro' : formaPagamento.toUpperCase()}\n\n`;
    
    if (cupomCodigo) {
      mensagem += `🎟️ *Cupom aplicado:* ${cupomCodigo}\n\n`;
    }
    
    mensagem += `_Pedido realizado pelo app Catálogo Amim_`;
    
    return mensagem;
  };

  // Função para enviar pedido ao WhatsApp
  const enviarParaWhatsApp = async () => {
    try {
      // Número do WhatsApp da empresa (substitua pelo número real)
      const numeroWhatsApp = "+5586981250203"; // Formato: código do país + DDD + número
      
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
      console.error("Erro ao abrir WhatsApp:", error);
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

      // Prepara os itens para a API
      const itensApi: ItemPedidoApi[] = itens.map(item => ({
        produtoId: item.produto.id,
        quantidade: item.quantidade
      }));

      // Cria o pedido na API
      const pedidoCriado = await pedidoService.criarPedido({
        usuarioId: usuario.id,
        itens: itensApi,
        formaPagamento: formaPagamento,
        cupomCodigo: cupomCodigo || undefined
      });

      console.log("Pedido criado com sucesso:", pedidoCriado);

      // Envia para WhatsApp
      const whatsappEnviado = await enviarParaWhatsApp();

      if (whatsappEnviado) {
        // Limpa o carrinho após sucesso
        await limparCarrinho();

        // Reseta o checkout
        resetarCheckout();

        Alert.alert(
          "Sucesso!",
          "Pedido realizado com sucesso! Complete o pedido no WhatsApp.",
          [{ text: "OK" }]
        );

        setProcessando(false);
        return true;
      } else {
        setProcessando(false);
        return false;
      }
    } catch (error: any) {
      console.error("Erro ao finalizar pedido:", error);
      
      Alert.alert(
        "Erro",
        error.message || "Não foi possível finalizar o pedido. Tente novamente."
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
