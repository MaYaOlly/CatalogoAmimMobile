import { useState } from "react";
import { useUserViewModel } from "./useUserViewModel";

/**
 * ViewModel para a tela de configurações/acesso do usuário
 * Gerencia a lógica de navegação e interações
 */
export function useAcessoUserViewModel() {
  const { realizarLogout, dadosUsuario, estaLogado } = useUserViewModel();
  
  // Estados dos botões (para efeito visual de pressionar)
  const [pressionado4, setPressionado4] = useState(false);
  const [pressionado3, setPressionado3] = useState(false);
  const [pressionado2, setPressionado2] = useState(false);
  const [pressionadoLogin, setPressionadoLogin] = useState(false);

  // Função para lidar com logout
  const handleLogout = async () => {
    const resultado = await realizarLogout();
    return resultado;
  };

  return {
    // Estado
    dadosUsuario,
    estaLogado,
    
    // Estados dos botões
    pressionado4,
    pressionado3,
    pressionado2,
    pressionadoLogin,
    setPressionado4,
    setPressionado3,
    setPressionado2,
    setPressionadoLogin,
    
    // Actions
    handleLogout,
  };
}
