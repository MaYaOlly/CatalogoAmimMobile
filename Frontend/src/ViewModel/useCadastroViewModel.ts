import { useState } from "react";
import { Usuario } from "../model/entities/typeUsuario";
import { useAuth } from "../contexts/AuthContext";
import { UsuarioService } from "../model/services/usuarioService";
import { apiClient } from "../model/infrastructure/apiConfig";

const usuarioService = new UsuarioService(apiClient);

export function useCadastroViewModel() {
  const { fazerLogin } = useAuth();
  
  // Estados dos campos do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  
  // Estados de UI
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");
  
  // Estados de erro para validação visual
  const [nomeComErro, setNomeComErro] = useState(false);
  const [emailComErro, setEmailComErro] = useState(false);
  const [senhaComErro, setSenhaComErro] = useState(false);
  const [confirmarSenhaComErro, setConfirmarSenhaComErro] = useState(false);
  const [enderecoComErro, setEnderecoComErro] = useState(false);
  const [telefoneComErro, setTelefoneComErro] = useState(false);

  // Funções de validação
  const validarNome = (nome: string): { valido: boolean; mensagem?: string } => {
    if (!nome.trim()) {
      return { valido: false, mensagem: "Por favor, preencha o nome." };
    }
    if (nome.trim().length < 3) {
      return { valido: false, mensagem: "O nome deve ter no mínimo 3 caracteres." };
    }
    return { valido: true };
  };

  const validarEmail = (email: string): { valido: boolean; mensagem?: string } => {
    if (!email.trim()) {
      return { valido: false, mensagem: "Por favor, preencha o e-mail." };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valido: false, mensagem: "Por favor, insira um e-mail válido." };
    }
    return { valido: true };
  };

  const validarSenha = (senha: string): { valido: boolean; mensagem?: string } => {
    if (!senha.trim()) {
      return { valido: false, mensagem: "Por favor, preencha a senha." };
    }
    if (senha.length < 6) {
      return { valido: false, mensagem: "A senha deve ter no mínimo 6 caracteres." };
    }
    return { valido: true };
  };

  const validarConfirmarSenha = (senha: string, confirmarSenha: string): { valido: boolean; mensagem?: string } => {
    if (!confirmarSenha.trim()) {
      return { valido: false, mensagem: "Por favor, confirme a senha." };
    }
    if (senha !== confirmarSenha) {
      return { valido: false, mensagem: "As senhas não coincidem." };
    }
    return { valido: true };
  };

  const validarEndereco = (endereco: string): { valido: boolean; mensagem?: string } => {
    if (!endereco.trim()) {
      return { valido: false, mensagem: "Por favor, preencha o endereço." };
    }
    if (endereco.trim().length < 5) {
      return { valido: false, mensagem: "O endereço deve ter no mínimo 5 caracteres." };
    }
    return { valido: true };
  };

  const validarTelefone = (telefone: string): { valido: boolean; mensagem?: string } => {
    if (!telefone.trim()) {
      return { valido: false, mensagem: "Por favor, preencha o telefone." };
    }
    // Remove caracteres não numéricos para validar
    const numeroLimpo = telefone.replace(/\D/g, '');
    if (numeroLimpo.length < 10) {
      return { valido: false, mensagem: "O telefone deve ter no mínimo 10 dígitos." };
    }
    return { valido: true };
  };

  // Função para cadastrar usuário
  const cadastrarUsuario = async () => {
    // Limpar erros anteriores
    setNomeComErro(false);
    setEmailComErro(false);
    setSenhaComErro(false);
    setConfirmarSenhaComErro(false);
    setEnderecoComErro(false);
    setTelefoneComErro(false);
    setMensagemErro("");
    
    // Validar campos individualmente
    const validacaoNome = validarNome(nome);
    const validacaoEmail = validarEmail(email);
    const validacaoSenha = validarSenha(senha);
    const validacaoConfirmarSenha = validarConfirmarSenha(senha, confirmarSenha);
    const validacaoEndereco = validarEndereco(endereco);
    const validacaoTelefone = validarTelefone(telefone);
    
    // Marcar campos com erro
    let primeiroErro = "";
    
    if (!validacaoNome.valido) {
      setNomeComErro(true);
      primeiroErro = primeiroErro || validacaoNome.mensagem || "";
    }
    if (!validacaoEmail.valido) {
      setEmailComErro(true);
      primeiroErro = primeiroErro || validacaoEmail.mensagem || "";
    }
    if (!validacaoSenha.valido) {
      setSenhaComErro(true);
      primeiroErro = primeiroErro || validacaoSenha.mensagem || "";
    }
    if (!validacaoConfirmarSenha.valido) {
      setConfirmarSenhaComErro(true);
      primeiroErro = primeiroErro || validacaoConfirmarSenha.mensagem || "";
    }
    if (!validacaoEndereco.valido) {
      setEnderecoComErro(true);
      primeiroErro = primeiroErro || validacaoEndereco.mensagem || "";
    }
    if (!validacaoTelefone.valido) {
      setTelefoneComErro(true);
      primeiroErro = primeiroErro || validacaoTelefone.mensagem || "";
    }
    
    // Se houver erro, retornar
    if (!validacaoNome.valido || !validacaoEmail.valido || !validacaoSenha.valido || 
        !validacaoConfirmarSenha.valido || !validacaoEndereco.valido || !validacaoTelefone.valido) {
      setMensagemErro(primeiroErro);
      return false;
    }
    setCarregando(true);
    
    try {
      const novoUsuario: Usuario = {
        nome,
        email,
        senha,
        endereco,
        telefone
      };

      const resposta = await usuarioService.criarUsuario(novoUsuario);
      
      // Fazer login automático após cadastro
      const loginResposta = await usuarioService.fazerLogin({
        email,
        senha
      });

      // Salvar usuário no contexto
      await fazerLogin({
        id: loginResposta.id,
        nome: loginResposta.nome,
        email: loginResposta.email,
        endereco: loginResposta.endereco,
        telefone: loginResposta.telefone
      });
      
      // Limpar campos
      limparFormulario();
      
      return true;
    } catch (erro: any) {
      const mensagem = erro.response?.data?.message || "Não foi possível cadastrar o usuário. Tente novamente.";
      setMensagemErro(mensagem);
      return false;
    } finally {
      setCarregando(false);
    }
  };

  // Função para limpar o formulário
  const limparFormulario = () => {
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
    setEndereco("");
    setTelefone("");
    setNomeComErro(false);
    setEmailComErro(false);
    setSenhaComErro(false);
    setConfirmarSenhaComErro(false);
    setEnderecoComErro(false);
    setTelefoneComErro(false);
    setMensagemErro("");
  };

  // Função para alternar visibilidade da senha
  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };
  
  // Handlers para limpar erros ao digitar
  const handleSetNome = (texto: string) => {
    setNome(texto);
    if (nomeComErro) setNomeComErro(false);
    if (mensagemErro) setMensagemErro("");
  };
  
  const handleSetEmail = (texto: string) => {
    setEmail(texto);
    if (emailComErro) setEmailComErro(false);
    if (mensagemErro) setMensagemErro("");
  };
  
  const handleSetSenha = (texto: string) => {
    setSenha(texto);
    if (senhaComErro) setSenhaComErro(false);
    if (mensagemErro) setMensagemErro("");
  };
  
  const handleSetConfirmarSenha = (texto: string) => {
    setConfirmarSenha(texto);
    if (confirmarSenhaComErro) setConfirmarSenhaComErro(false);
    if (mensagemErro) setMensagemErro("");
  };
  
  const handleSetEndereco = (texto: string) => {
    setEndereco(texto);
    if (enderecoComErro) setEnderecoComErro(false);
    if (mensagemErro) setMensagemErro("");
  };
  
  const handleSetTelefone = (texto: string) => {
    setTelefone(texto);
    if (telefoneComErro) setTelefoneComErro(false);
    if (mensagemErro) setMensagemErro("");
  };

  return {
    // Estados
    nome,
    email,
    senha,
    confirmarSenha,
    endereco,
    telefone,
    senhaVisivel,
    carregando,
    mensagemErro,
    nomeComErro,
    emailComErro,
    senhaComErro,
    confirmarSenhaComErro,
    enderecoComErro,
    telefoneComErro,
    
    // Setters
    setNome: handleSetNome,
    setEmail: handleSetEmail,
    setSenha: handleSetSenha,
    setConfirmarSenha: handleSetConfirmarSenha,
    setEndereco: handleSetEndereco,
    setTelefone: handleSetTelefone,
    
    // Funções
    toggleSenhaVisivel,
    cadastrarUsuario,
    limparFormulario
  };
}
