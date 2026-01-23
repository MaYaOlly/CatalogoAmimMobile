import { useState } from "react";
import { LoginCredenciais } from "../model/entities/typeUsuario";
import { useAuth } from "../contexts/AuthContext";
import { UsuarioService } from "../model/services/usuarioService";
import { apiClient } from "../model/infrastructure/apiConfig";

const usuarioService = new UsuarioService(apiClient);

export function useLoginViewModel() {
  const { fazerLogin } = useAuth();
  
  // Estados dos campos do formulário
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  // Estados de UI
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  
  // Estados de erro para validação visual
  const [emailComErro, setEmailComErro] = useState(false);
  const [senhaComErro, setSenhaComErro] = useState(false);

  // Função de validação de email
  const validarEmail = (email: string): { valido: boolean; mensagem?: string } => {
    if (!email.trim()) {
      return { valido: false, mensagem: "Por favor, preencha o e-mail." };
    }
    
    // Regex para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valido: false, mensagem: "Por favor, insira um e-mail válido." };
    }
    
    return { valido: true };
  };

  // Função de validação de senha
  const validarSenha = (senha: string): { valido: boolean; mensagem?: string } => {
    if (!senha.trim()) {
      return { valido: false, mensagem: "Por favor, preencha a senha." };
    }
    
    if (senha.length < 6) {
      return { valido: false, mensagem: "A senha deve ter no mínimo 6 caracteres." };
    }
    
    return { valido: true };
  };

  // Função de validação geral dos campos
  const validarCampos = (): { valido: boolean; mensagem?: string } => {
    const validacaoEmail = validarEmail(email);
    if (!validacaoEmail.valido) {
      return validacaoEmail;
    }
    
    const validacaoSenha = validarSenha(senha);
    if (!validacaoSenha.valido) {
      return validacaoSenha;
    }
    
    return { valido: true };
  };

  // Função para fazer login
  const realizarLogin = async () => {
    // Limpar erros anteriores
    setEmailComErro(false);
    setSenhaComErro(false);
    setMensagemErro("");
    
    // Validar campos individualmente para marcar visualmente
    const validacaoEmail = validarEmail(email);
    const validacaoSenha = validarSenha(senha);
    
    if (!validacaoEmail.valido) {
      setEmailComErro(true);
    }
    
    if (!validacaoSenha.valido) {
      setSenhaComErro(true);
    }
    
    // Se houver erro, retornar
    if (!validacaoEmail.valido || !validacaoSenha.valido) {
      const mensagem = validacaoEmail.mensagem || validacaoSenha.mensagem || "Erro de validação";
      setMensagemErro(mensagem);
      return {
        sucesso: false,
        mensagem
      };
    }
    
    setCarregando(true);
    
    try {
      const credenciais: LoginCredenciais = {
        email: email.trim(),
        senha
      };

      const resposta = await usuarioService.fazerLogin(credenciais);
      
      // Salvar usuário no contexto
      await fazerLogin({
        id: resposta.id,
        nome: resposta.nome,
        email: resposta.email,
        endereco: resposta.endereco,
        telefone: resposta.telefone
      });
      
      return { sucesso: true };
    } catch (erro: any) {
      // Não loga erro no console para não poluir o Expo
      
      let mensagemErro = "Email ou senha inválidos. Tente novamente.";
      
      // Trata erro 401 (não autorizado)
      if (erro.response?.status === 401) {
        mensagemErro = "Email ou senha incorretos.";
      } else if (erro.message && erro.message.includes("Network Error")) {
        mensagemErro = "Sem conexão com o servidor. Verifique sua internet.";
      } else if (erro.response?.data?.message) {
        mensagemErro = erro.response.data.message;
      }
      
      setMensagemErro(mensagemErro);
      
      return { 
        sucesso: false, 
        mensagem: mensagemErro
      };
    } finally {
      setCarregando(false);
    }
  };

  // Função para limpar o formulário
  const limparFormulario = () => {
    setEmail("");
    setSenha("");
    setEmailComErro(false);
    setSenhaComErro(false);
    setMensagemErro("");
  };
  
  // Função para limpar erro do email quando começar a digitar
  const handleSetEmail = (texto: string) => {
    setEmail(texto);
    if (emailComErro) {
      setEmailComErro(false);
    }
    if (mensagemErro) {
      setMensagemErro("");
    }
  };
  
  // Função para limpar erro da senha quando começar a digitar
  const handleSetSenha = (texto: string) => {
    setSenha(texto);
    if (senhaComErro) {
      setSenhaComErro(false);
    }
    if (mensagemErro) {
      setMensagemErro("");
    }
  };

  // Função para alternar visibilidade da senha
  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  return {
    // Estados
    email,
    senha,
    senhaVisivel,
    carregando,
    emailComErro,
    senhaComErro,
    mensagemErro,
    
    // Setters
    setEmail: handleSetEmail,
    setSenha: handleSetSenha,
    
    // Funções
    toggleSenhaVisivel,
    realizarLogin,
    limparFormulario
  };
}
