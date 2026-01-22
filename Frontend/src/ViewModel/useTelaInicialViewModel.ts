import { useState, useEffect, useCallback } from "react";
import { ProdutoService } from "../model/services/produtoService";
import { Produto } from "../model/entities/typeProduto";
import axios from "axios";
import { useCarrinho } from "../contexts/CarrinhoContext";

// Interface para o formato normalizado de produto (sem underscores)
export interface ProdutoNormalizado {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  preco: string;
  imagem: string;
  disponivel: boolean;
}

// Interface para item do carrinho
export interface ItemCarrinho {
  produto: ProdutoNormalizado;
  quantidade: number;
}

// Dados de exemplo (caso a API falhe)
const produtosExemplo: ProdutoNormalizado[] = [
  {
    id: "1",
    nome: "Bolo de Chocolate",
    categoria: "Bolo",
    descricao: "Delicioso bolo de chocolate feito com cacau 100% puro, massa úmida e fofinha, coberto com ganache de chocolate meio amargo. Perfeito para qualquer ocasião!",
    preco: "R$ 25,00",
    imagem: "https://picsum.photos/id/16/300/300",
    disponivel: true
  },
  {
    id: "2",
    nome: "Chocolate Trufado",
    categoria: "Bolo",
    descricao: "Bolo de chocolate trufado com recheio de ganache cremoso e pedaços de chocolate belga. Finalizado com raspas de chocolate e ouro comestível.",
    preco: "R$ 35,00",
    imagem: "https://picsum.photos/id/17/300/300",
    disponivel: true
  },
  {
    id: "3",
    nome: "Chocolate com Morango",
    categoria: "Bolo",
    descricao: "Massa de chocolate com recheio de creme de morango fresco e cobertura de chocolate branco. Decorado com morangos inteiros.",
    preco: "R$ 30,00",
    imagem: "https://picsum.photos/id/18/300/300",
    disponivel: true
  },
];

// Configuração da API
const api = axios.create({
  baseURL: "http://10.55.193.186:3333"
});

const produtoService = new ProdutoService(api);

export function useTelaInicialViewModel() {
  // Obtém funções do contexto do carrinho
  const { adicionarAoCarrinho: adicionarAoCarrinhoContexto } = useCarrinho();
  
  // Estados
  const [produtos, setProdutos] = useState<ProdutoNormalizado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [indexCarrossel, setIndexCarrossel] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoNormalizado | null>(null);
  const [quantidades, setQuantidades] = useState<{ [key: string]: number }>({});

  // Função para normalizar produtos da API
  const normalizarProdutos = (produtosApi: Produto[]): ProdutoNormalizado[] => {
    return produtosApi.map((p) => ({
      id: p._id,
      nome: p._nome,
      categoria: p._categoria,
      descricao: p._descricao,
      preco: `R$ ${p._preco.toFixed(2).replace('.', ',')}`,
      imagem: p._imagemUrl || "https://via.placeholder.com/300",
      disponivel: p._disponivel
    }));
  };

  // Buscar produtos da API
  useEffect(() => {
    async function buscarProdutos() {
      try {
        const produtosApi = await produtoService.getProdutos();
        const produtosNormalizados = normalizarProdutos(produtosApi);
        setProdutos(produtosNormalizados);
        console.log('Produtos carregados:', produtosNormalizados);
      } catch (erro) {
        console.error('Erro ao buscar produtos:', erro);
        setProdutos(produtosExemplo);
      } finally {
        setCarregando(false);
      }
    }
    buscarProdutos();
  }, []);

  // Actions - Memoizadas com useCallback
  const abrirDetalhesProduto = useCallback((produto: ProdutoNormalizado) => {
    setProdutoSelecionado(produto);
    setModalVisible(true);
  }, []);

  const fecharModal = useCallback(() => {
    setModalVisible(false);
    setProdutoSelecionado(null);
  }, []);

  const adicionarItem = useCallback((produtoId: string) => {
    setQuantidades(prev => ({
      ...prev,
      [produtoId]: (prev[produtoId] || 0) + 1
    }));
  }, []);

  const removerItem = useCallback((produtoId: string) => {
    setQuantidades(prev => {
      const quantidadeAtual = prev[produtoId] || 0;
      if (quantidadeAtual > 0) {
        return {
          ...prev,
          [produtoId]: quantidadeAtual - 1
        };
      }
      return prev;
    });
  }, []);

  const adicionarAoCarrinho = useCallback(() => {
    if (produtoSelecionado && quantidades[produtoSelecionado.id] && quantidades[produtoSelecionado.id] > 0) {
      // Adiciona ao carrinho usando o contexto
      adicionarAoCarrinhoContexto(produtoSelecionado, quantidades[produtoSelecionado.id]);
      
      // Mostra mensagem de sucesso
      alert(`✅ ${quantidades[produtoSelecionado.id]}x ${produtoSelecionado.nome} adicionado ao carrinho!`);
      
      // Reseta a quantidade do produto no modal
      setQuantidades(prev => ({
        ...prev,
        [produtoSelecionado.id]: 0
      }));
      
      // Fecha o modal
      setModalVisible(false);
      setProdutoSelecionado(null);
    } else {
      alert('⚠️ Selecione ao menos 1 item');
    }
  }, [produtoSelecionado, quantidades, adicionarAoCarrinhoContexto]);

  const avancarCarrossel = useCallback(() => {
    setIndexCarrossel(prev => (prev + 1) % 3);
  }, []);

  const voltarCarrossel = useCallback(() => {
    setIndexCarrossel(prev => (prev === 0 ? 2 : prev - 1));
  }, []);

  const irParaIndiceCarrossel = useCallback((index: number) => {
    setIndexCarrossel(index);
  }, []);

  // Retorna o estado e as actions
  return {
    // Estado
    produtos: produtos.length > 0 ? produtos : produtosExemplo,
    carregando,
    indexCarrossel,
    modalVisible,
    produtoSelecionado,
    quantidades,
    
    // Actions
    abrirDetalhesProduto,
    fecharModal,
    adicionarItem,
    removerItem,
    adicionarAoCarrinho,
    avancarCarrossel,
    voltarCarrossel,
    irParaIndiceCarrossel,
  };
}
