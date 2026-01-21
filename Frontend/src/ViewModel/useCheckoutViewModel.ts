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

  return {
    // Estado do checkout
    ...checkoutContext,
    
    // Dados adicionais
    itens,
    total,
    usuario,
  };
}
