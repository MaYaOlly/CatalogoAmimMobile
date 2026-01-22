/**
 * Utilitário para formatar mensagens de erro de forma amigável
 */

export function formatarMensagemErro(error: any): string {
  // Network Error
  if (error.message === "Network Error" || error.code === "ERR_NETWORK") {
    return "Sem conexão com o servidor. Verifique sua internet e tente novamente.";
  }

  // Timeout
  if (error.code === "ECONNABORTED") {
    return "A requisição demorou muito. Verifique sua conexão e tente novamente.";
  }

  // Erros HTTP específicos
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return error.response.data?.message || "Dados inválidos. Verifique as informações e tente novamente.";
      case 401:
        // Para login, retorna mensagem mais genérica
        return error.response.data?.message || "Email ou senha incorretos.";
      case 403:
        return "Você não tem permissão para realizar esta ação.";
      case 404:
        return "Recurso não encontrado. Pode não estar mais disponível.";
      case 409:
        return error.response.data?.message || "Este item já existe.";
      case 500:
        return "Erro no servidor. Tente novamente em alguns instantes.";
      default:
        return error.response.data?.message || "Ops! Algo deu errado. Tente novamente.";
    }
  }

  // Mensagem personalizada do erro
  if (error.message && error.message !== "Network Error") {
    return error.message;
  }

  // Mensagem genérica
  return "Ops! Algo deu errado. Tente novamente.";
}
