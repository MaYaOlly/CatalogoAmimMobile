import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProdutoNormalizado } from '../ViewModel/useTelaInicialViewModel';

// Tipo para item do carrinho
export interface ItemCarrinho {
  produto: ProdutoNormalizado;
  quantidade: number;
}

// Tipo para o contexto do carrinho
interface CarrinhoContextData {
  itens: ItemCarrinho[];
  quantidadeTotal: number;
  subtotal: number;
  total: number;
  carregando: boolean;
  adicionarAoCarrinho: (produto: ProdutoNormalizado, quantidade: number) => Promise<void>;
  removerDoCarrinho: (produtoId: string) => Promise<void>;
  atualizarQuantidade: (produtoId: string, novaQuantidade: number) => Promise<void>;
  limparCarrinho: () => Promise<void>;
  obterQuantidadeProduto: (produtoId: string) => number;
}

// Criação do contexto
const CarrinhoContext = createContext<CarrinhoContextData>({} as CarrinhoContextData);

// Provider do contexto
interface CarrinhoProviderProps {
  children: ReactNode;
}

// Chave para armazenar no AsyncStorage
const STORAGE_KEY = '@CatalogoAmim:carrinho';

// Taxa de entrega fixa (você pode mudar para dinâmica depois)

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [carregando, setCarregando] = useState(true);

  // Carregar carrinho do AsyncStorage ao iniciar
  useEffect(() => {
    carregarCarrinho();
  }, []);

  // Salvar carrinho no AsyncStorage sempre que mudar
  useEffect(() => {
    if (!carregando) {
      salvarCarrinho();
    }
  }, [itens]);

  // Função para carregar carrinho do AsyncStorage
  const carregarCarrinho = async () => {
    try {
      const carrinhoArmazenado = await AsyncStorage.getItem(STORAGE_KEY);
      if (carrinhoArmazenado) {
        setItens(JSON.parse(carrinhoArmazenado));
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    } finally {
      setCarregando(false);
    }
  };

  // Função para salvar carrinho no AsyncStorage
  const salvarCarrinho = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  };

  // Função para adicionar produto ao carrinho
  const adicionarAoCarrinho = async (produto: ProdutoNormalizado, quantidade: number) => {
    if (quantidade <= 0) return;

    const itemExistente = itens.find(item => item.produto.id === produto.id);

    if (itemExistente) {
      // Se o produto já existe, atualiza a quantidade
      const novosItens = itens.map(item =>
        item.produto.id === produto.id
          ? { ...item, quantidade: item.quantidade + quantidade }
          : item
      );
      setItens(novosItens);
    } else {
      // Se é um novo produto, adiciona ao carrinho
      setItens([...itens, { produto, quantidade }]);
    }
  };

  // Função para remover produto do carrinho
  const removerDoCarrinho = async (produtoId: string) => {
    const novosItens = itens.filter(item => item.produto.id !== produtoId);
    setItens(novosItens);
  };

  // Função para atualizar quantidade de um item
  const atualizarQuantidade = async (produtoId: string, novaQuantidade: number) => {
    if (novaQuantidade <= 0) {
      await removerDoCarrinho(produtoId);
      return;
    }

    const novosItens = itens.map(item =>
      item.produto.id === produtoId
        ? { ...item, quantidade: novaQuantidade }
        : item
    );
    setItens(novosItens);
  };

  // Função para limpar o carrinho
  const limparCarrinho = async () => {
    setItens([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  // Função para obter quantidade de um produto específico
  const obterQuantidadeProduto = (produtoId: string): number => {
    const item = itens.find(item => item.produto.id === produtoId);
    return item ? item.quantidade : 0;
  };

  // Calcular quantidade total de itens
  const quantidadeTotal = itens.reduce((total, item) => total + item.quantidade, 0);

  // Calcular subtotal (soma dos preços * quantidades)
  const subtotal = itens.reduce((total, item) => {
    // Extrair o valor numérico do preço (ex: "R$ 25,00" -> 25.00)
    const precoNumerico = parseFloat(
      item.produto.preco
        .replace('R$', '')
        .replace(/\s/g, '')
        .replace(',', '.')
    );
    return total + (precoNumerico * item.quantidade);
  }, 0);



  // Calcular total
  const total = subtotal 

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        quantidadeTotal,
        subtotal,
        total,
        carregando,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
        obterQuantidadeProduto,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

// Hook para usar o contexto do carrinho
export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  
  return context;
}
