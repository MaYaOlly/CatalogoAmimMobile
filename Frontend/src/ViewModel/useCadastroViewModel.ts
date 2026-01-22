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
      
      // Limpar campos
      limparFormulario();
      
      return { sucesso: true, mensagem: `Bem-vindo(a), ${resposta.nome}!` };
    } catch (erro: any) {
      return { 
        sucesso: false, 
        mensagem: erro.response?.data?.message || "Não foi possível cadastrar o usuário. Tente novamente." 
      };
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
