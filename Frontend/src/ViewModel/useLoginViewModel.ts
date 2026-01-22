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

  // Função para fazer login
  const realizarLogin = async () => {
    setCarregando(true);
    
    try {
      const credenciais: LoginCredenciais = {
        email,
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
    
    // Setters
    setEmail,
    setSenha,
    
    // Funções
    toggleSenhaVisivel,
    realizarLogin,
    limparFormulario
  };
}
