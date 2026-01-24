import { useState } from "react";
import { useCheckout } from "../contexts/CheckoutContext";
import { useCarrinho } from "../contexts/CarrinhoContext";
import { useAuth } from "../contexts/AuthContext";

// Re-exporta a interface DadosEndereco para facilitar o uso
export type { DadosEndereco } from "../contexts/CheckoutContext";

/**
 * ViewModel para gerenciar o fluxo de checkout
 * Conecta as views com o CheckoutContext
 */
export function useCheckoutViewModel() {
  // Obtém dados do contexto de checkout
  const checkoutContext = useCheckout();
  
  // Obtém dados adicionais dos outros contextos
  const { itens, total } = useCarrinho();
  const { usuario } = useAuth();
  
  // Estados de erro para validação visual
  const [cepComErro, setCepComErro] = useState(false);
  const [ruaComErro, setRuaComErro] = useState(false);
  const [numeroComErro, setNumeroComErro] = useState(false);
  const [bairroComErro, setBairroComErro] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  
  // Funções de validação
  const validarCep = (cep: string): { valido: boolean; mensagem?: string } => {
    if (!cep.trim()) {
      return { valido: false, mensagem: "Por favor, preencha o CEP." };
    }
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      return { valido: false, mensagem: "O CEP deve ter 8 dígitos." };
    }
    return { valido: true };
  };
  
  const validarRua = (rua: string): { valido: boolean; mensagem?: string } => {
    if (!rua.trim()) {
      return { valido: false, mensagem: "Por favor, preencha a rua." };
    }
    if (rua.trim().length < 3) {
      return { valido: false, mensagem: "A rua deve ter no mínimo 3 caracteres." };
    }
    return { valido: true };
  };
  
  const validarNumero = (numero: string): { valido: boolean; mensagem?: string } => {
    if (!numero.trim()) {
      return { valido: false, mensagem: "Por favor, preencha o número." };
    }
    return { valido: true };
  };
  
  const validarBairro = (bairro: string): { valido: boolean; mensagem?: string } => {
    if (!bairro.trim()) {
      return { valido: false, mensagem: "Por favor, preencha o bairro." };
    }
    if (bairro.trim().length < 3) {
      return { valido: false, mensagem: "O bairro deve ter no mínimo 3 caracteres." };
    }
    return { valido: true };
  };
  
  // Função de validação completa
  const validarEnderecoComErros = (): boolean => {
    // Limpar erros anteriores
    setCepComErro(false);
    setRuaComErro(false);
    setNumeroComErro(false);
    setBairroComErro(false);
    setMensagemErro("");
    
    const { endereco } = checkoutContext;
    
    // Validar campos individualmente
    const validacaoCep = validarCep(endereco.cep);
    const validacaoRua = validarRua(endereco.rua);
    const validacaoNumero = validarNumero(endereco.numero);
    const validacaoBairro = validarBairro(endereco.bairro);
    
    // Marcar campos com erro
    let primeiroErro = "";
    
    if (!validacaoCep.valido) {
      setCepComErro(true);
      primeiroErro = primeiroErro || validacaoCep.mensagem || "";
    }
    if (!validacaoRua.valido) {
      setRuaComErro(true);
      primeiroErro = primeiroErro || validacaoRua.mensagem || "";
    }
    if (!validacaoNumero.valido) {
      setNumeroComErro(true);
      primeiroErro = primeiroErro || validacaoNumero.mensagem || "";
    }
    if (!validacaoBairro.valido) {
      setBairroComErro(true);
      primeiroErro = primeiroErro || validacaoBairro.mensagem || "";
    }
    
    // Se houver erro, definir mensagem
    if (!validacaoCep.valido || !validacaoRua.valido || !validacaoNumero.valido || !validacaoBairro.valido) {
      setMensagemErro(primeiroErro);
      return false;
    }
    
    return true;
  };
  
  // Handlers para limpar erros ao digitar
  const handleAtualizarEndereco = (campo: keyof typeof checkoutContext.endereco, valor: string) => {
    checkoutContext.atualizarEndereco(campo, valor);
    
    // Limpar erro do campo específico
    if (campo === 'cep' && cepComErro) setCepComErro(false);
    if (campo === 'rua' && ruaComErro) setRuaComErro(false);
    if (campo === 'numero' && numeroComErro) setNumeroComErro(false);
    if (campo === 'bairro' && bairroComErro) setBairroComErro(false);
    
    // Limpar mensagem de erro
    if (mensagemErro) setMensagemErro("");
  };

  return {
    // Estado do checkout
    ...checkoutContext,
    
    // Sobrescrever funções com versões que incluem validação visual
    atualizarEndereco: handleAtualizarEndereco,
    validarEndereco: validarEnderecoComErros,
    
    // Estados de erro
    cepComErro,
    ruaComErro,
    numeroComErro,
    bairroComErro,
    mensagemErro,
    
    // Dados adicionais
    itens,
    total,
    usuario,
  };
}
