import { useAuth } from "../contexts/AuthContext";

/**
 * ViewModel para gerenciar ações do usuário
 * Perfil, logout e configurações
 */
export function useUserViewModel() {
  const { usuario, estaLogado, fazerLogout } = useAuth();

  // Função para realizar logout
  const realizarLogout = async () => {
    try {
      if(!estaLogado) {
        return { sucesso: false, mensagem: "Você não está logado." };
      }
      await fazerLogout();
      alert("Você saiu da conta.");
      return { sucesso: true };
    } catch (erro: any) {
      return { 
        sucesso: false, 
        mensagem: "Não foi possível sair. Tente novamente." 
      };
    }
  };

  // Formatar dados do usuário para exibição
  const dadosUsuario = usuario ? {
    nome: usuario.nome || "Usuário",
    email: usuario.email || "Não informado",
    telefone: usuario.telefone || "Não informado",
    endereco: usuario.endereco || "Não informado",
    iniciais: usuario.nome ? usuario.nome.substring(0, 2).toUpperCase() : "US"
  } : null;

  return {
    // Estado
    usuario,
    estaLogado,
    dadosUsuario,
    
    // Actions
    realizarLogout,
  };
}
