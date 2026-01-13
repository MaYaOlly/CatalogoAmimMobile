import { useState } from "react";
import { UsuarioService } from "../model/services/usuarioService";
import { LoginCredenciais } from "../model/entities/typeUsuario";
import axios from "axios";
import { Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";

// Configuração da API
const api = axios.create({
  baseURL: "http://10.0.2.2:3333"
});

const usuarioService = new UsuarioService(api);

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
      
      return true;
    } catch (erro: any) {
      console.error('Erro ao fazer login:', erro);
      Alert.alert(
        "Erro",
        erro.response?.data?.message || "Email ou senha inválidos. Tente novamente.",
        [{ text: "OK" }]
      );
      return false;
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
