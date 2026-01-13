import { useState } from "react";
import { UsuarioService } from "../model/services/usuarioService";
import { Usuario } from "../model/entities/typeUsuario";
import axios from "axios";
import { Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";

// Configuração da API
const api = axios.create({
  baseURL: "http://10.0.2.2:3333"
});

const usuarioService = new UsuarioService(api);

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

  // Função para cadastrar usuário
  const cadastrarUsuario = async () => {
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
      
      Alert.alert(
        "Sucesso!",
        `Bem-vindo(a), ${resposta.nome}!`,
        [{ text: "OK" }]
      );
      
      // Limpar campos
      limparFormulario();
      
      return true;
    } catch (erro: any) {
      console.error('Erro ao cadastrar usuário:', erro);
      Alert.alert(
        "Erro",
        erro.response?.data?.message || "Não foi possível cadastrar o usuário. Tente novamente.",
        [{ text: "OK" }]
      );
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
  };

  // Função para alternar visibilidade da senha
  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
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
    
    // Setters
    setNome,
    setEmail,
    setSenha,
    setConfirmarSenha,
    setEndereco,
    setTelefone,
    
    // Funções
    toggleSenhaVisivel,
    cadastrarUsuario,
    limparFormulario
  };
}
