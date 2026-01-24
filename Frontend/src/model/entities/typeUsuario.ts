export type Usuario = {
  nome: string;
  email: string;
  senha: string;
  endereco: string;
  telefone: string;
}

export type UsuarioRespostaAPI = {
  id: string;
  nome: string;
  email: string;
}

export type LoginCredenciais = {
  email: string;
  senha: string;
}

export type LoginResposta = {
  id: string;
  nome: string;
  email: string;
  endereco: string;
  telefone: string;
}