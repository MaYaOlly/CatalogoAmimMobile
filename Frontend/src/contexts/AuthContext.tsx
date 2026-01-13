import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipo para o usuário autenticado
export interface UsuarioAutenticado {
  id: string;
  nome: string;
  email: string;
  endereco?: string;
  telefone?: string;
}

// Tipo para o contexto de autenticação
interface AuthContextData {
  usuario: UsuarioAutenticado | null;
  estaLogado: boolean;
  carregando: boolean;
  fazerLogin: (usuario: UsuarioAutenticado) => Promise<void>;
  fazerLogout: () => Promise<void>;
}

// Criação do contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider do contexto
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<UsuarioAutenticado | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Carregar usuário do AsyncStorage ao iniciar o app
  useEffect(() => {
    carregarUsuarioArmazenado();
  }, []);

  // Função para carregar usuário armazenado
  const carregarUsuarioArmazenado = async () => {
    try {
      const usuarioArmazenado = await AsyncStorage.getItem('@CatalogoAmim:usuario');
      if (usuarioArmazenado) {
        setUsuario(JSON.parse(usuarioArmazenado));
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setCarregando(false);
    }
  };

  // Função para fazer login (salvar usuário)
  const fazerLogin = async (usuarioLogado: UsuarioAutenticado) => {
    try {
      await AsyncStorage.setItem('@CatalogoAmim:usuario', JSON.stringify(usuarioLogado));
      setUsuario(usuarioLogado);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      throw error;
    }
  };

  // Função de logout
  const fazerLogout = async () => {
    try {
      await AsyncStorage.removeItem('@CatalogoAmim:usuario');
      setUsuario(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        estaLogado: !!usuario,
        carregando,
        fazerLogin,
        fazerLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
}
