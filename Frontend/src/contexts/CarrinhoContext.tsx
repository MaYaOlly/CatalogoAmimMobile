import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProdutoNormalizado } from '../ViewModel/useTelaInicialViewModel';
import { CupomService } from '../model/services/cupomService';
import { apiClient } from '../model/infrastructure/apiConfig';
import { Cupom } from '../model/entities/typeCupom';

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
  desconto: number;
  total: number;
  carregando: boolean;
  cupomAplicado: Cupom | null;
  adicionarAoCarrinho: (produto: ProdutoNormalizado, quantidade: number) => Promise<void>;
  removerDoCarrinho: (produtoId: string) => Promise<void>;
  atualizarQuantidade: (produtoId: string, novaQuantidade: number) => Promise<void>;
  limparCarrinho: () => Promise<void>;
  obterQuantidadeProduto: (produtoId: string) => number;
  validarEAplicarCupom: (codigo: string) => Promise<{ sucesso: boolean; mensagem: string }>;
  removerCupom: () => void;
}

// Criação do contexto
const CarrinhoContext = createContext<CarrinhoContextData>({} as CarrinhoContextData);

// Provider do contexto
interface CarrinhoProviderProps {
  children: ReactNode;
}

// Chave para armazenar no AsyncStorage
const STORAGE_KEY = '@CatalogoAmim:carrinho';
const CUPOM_STORAGE_KEY = '@CatalogoAmim:cupom';

// Instanciar serviço de cupom
const cupomService = new CupomService(apiClient);

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [cupomAplicado, setCupomAplicado] = useState<Cupom | null>(null);

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
      
      // Carregar cupom aplicado
      const cupomArmazenado = await AsyncStorage.getItem(CUPOM_STORAGE_KEY);
      if (cupomArmazenado) {
        setCupomAplicado(JSON.parse(cupomArmazenado));
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

  // Função para salvar cupom no AsyncStorage
  const salvarCupom = async (cupom: Cupom | null) => {
    try {
      if (cupom) {
        await AsyncStorage.setItem(CUPOM_STORAGE_KEY, JSON.stringify(cupom));
      } else {
        await AsyncStorage.removeItem(CUPOM_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Erro ao salvar cupom:', error);
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
    setCupomAplicado(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
    await AsyncStorage.removeItem(CUPOM_STORAGE_KEY);
  };

  // Função para obter quantidade de um produto específico
  const obterQuantidadeProduto = (produtoId: string): number => {
    const item = itens.find(item => item.produto.id === produtoId);
    return item ? item.quantidade : 0;
  };

  // Função para validar e aplicar cupom
  const validarEAplicarCupom = async (codigo: string): Promise<{ sucesso: boolean; mensagem: string }> => {
    try {
      // Buscar todos os cupons
      const cupons = await cupomService.getCupons();
      
      // Buscar cupom pelo código
      const cupomEncontrado = cupons.find(
        c => c._codigo.toUpperCase() === codigo.toUpperCase()
      );

      if (!cupomEncontrado) {
        return { sucesso: false, mensagem: 'Cupom não encontrado.' };
      }

      // Verificar se está ativo
      if (!cupomEncontrado._ativo) {
        return { sucesso: false, mensagem: 'Este cupom não está disponível.' };
      }

      // Verificar validade
      const hoje = new Date();
      const dataValidade = new Date(cupomEncontrado._dataValidade);
      if (dataValidade < hoje) {
        return { sucesso: false, mensagem: 'Este cupom já expirou.' };
      }

      // Aplicar cupom
      setCupomAplicado(cupomEncontrado);
      await salvarCupom(cupomEncontrado);

      return { 
        sucesso: true, 
        mensagem: `Cupom ${cupomEncontrado._codigo} aplicado com sucesso!` 
      };
    } catch (error) {
      console.error('Erro ao validar cupom:', error);
      return { 
        sucesso: false, 
        mensagem: 'Erro ao validar cupom. Tente novamente.' 
      };
    }
  };

  // Função para remover cupom
  const removerCupom = () => {
    setCupomAplicado(null);
    salvarCupom(null);
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

  // Calcular desconto do cupom
  const desconto = cupomAplicado
    ? cupomAplicado._tipoDesconto === 'percentual'
      ? (subtotal * cupomAplicado._valorDesconto) / 100
      : cupomAplicado._valorDesconto
    : 0;

  // Calcular total com desconto
  const total = Math.max(subtotal - desconto, 0) 

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        quantidadeTotal,
        subtotal,
        desconto,
        total,
        carregando,
        cupomAplicado,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
        obterQuantidadeProduto,
        validarEAplicarCupom,
        removerCupom,
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
