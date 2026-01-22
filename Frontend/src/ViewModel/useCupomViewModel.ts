import { useState, useEffect } from "react";
import { Cupom, TipoDesconto } from "../model/entities/typeCupom";
import { Clipboard } from "react-native";
import { CupomService } from "../model/services/cupomService";
import { apiClient } from "../model/infrastructure/apiConfig";

// Interface para o formato normalizado de cupom (sem underscores)
export interface CupomNormalizado {
  id: string;
  codigo: string;
  tipoDesconto: TipoDesconto;
  valorDesconto: number;
  dataValidade: Date;
  ativo: boolean;
}

// Helper para formatar a data
const formatarData = (data: Date): string => {
  const dataView = new Date(data);
  return dataView.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Dados de exemplo (caso a API falhe)
const cuponsExemplo: CupomNormalizado[] = [
  {
    id: "1",
    codigo: "BOLO5",
    tipoDesconto: "percentual",
    valorDesconto: 19,
    dataValidade: new Date("2026-10-31"),
    ativo: true,
  },
  {
    id: "2",
    codigo: "PRIMEIRA",
    tipoDesconto: "percentual",
    valorDesconto: 5,
    dataValidade: new Date("2026-12-31"),
    ativo: true,
  },
  {
    id: "3",
    codigo: "AMIN10",
    tipoDesconto: "fixo",
    valorDesconto: 10,
    dataValidade: new Date("2026-12-31"),
    ativo: true,
  },
];

const cupomService = new CupomService(apiClient);

export function useCupomViewModel() {
  // Estados
  const [cuponsDisponiveis, setCuponsDisponiveis] = useState<CupomNormalizado[]>([]);
  const [cupomsFiltrados, setCupomsFiltrados] = useState<CupomNormalizado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [textoBusca, setTextoBusca] = useState("");

  // Função para normalizar cupons da API
  const normalizarCupons = (cuponsApi: Cupom[]): CupomNormalizado[] => {
    return cuponsApi.map((c) => ({
      id: c._id,
      codigo: c._codigo.toLocaleUpperCase(),
      tipoDesconto: c._tipoDesconto,
      valorDesconto: c._valorDesconto,
      dataValidade: c._dataValidade,
      ativo: c._ativo,
    }));
  };

  // Buscar cupons da API
  useEffect(() => {
    async function buscarCupons() {
      try {
        const cuponsApi = await cupomService.getCupons();
        const cuponsNormalizados = normalizarCupons(cuponsApi);
        setCuponsDisponiveis(cuponsNormalizados);
        setCupomsFiltrados(cuponsNormalizados);
        console.log('Cupons carregados:', cuponsNormalizados);
      } catch (erro) {
        console.error('Erro ao buscar cupons:', erro);
        setCuponsDisponiveis(cuponsExemplo);
        setCupomsFiltrados(cuponsExemplo);
      } finally {
        setCarregando(false);
      }
    }
    buscarCupons();
  }, []);

  // Filtrar cupons conforme texto de busca
  useEffect(() => {
    if (textoBusca.trim() === "") {
      setCupomsFiltrados(cuponsDisponiveis);
    } else {
      const filtrados = cuponsDisponiveis.filter((cupom: CupomNormalizado) =>
        cupom.codigo.toLowerCase().includes(textoBusca.toLowerCase())
      );
      setCupomsFiltrados(filtrados);
    }
  }, [textoBusca, cuponsDisponiveis]);

  // Actions
  const atualizarBusca = (texto: string) => {
    setTextoBusca(texto);
  };

  const copiarCupom = async (idCupom: string) => {
    const cupomEncontrado = cuponsDisponiveis.find((c: CupomNormalizado) => c.id === idCupom);

    if (!cupomEncontrado) {
      return { sucesso: false, mensagem: "Cupom não encontrado." };
    }

    if (!cupomEncontrado.ativo) {
      return { sucesso: false, mensagem: "Este cupom não está disponível." };
    }

    // Verifica se o cupom está expirado
    const hoje = new Date();
    const dataValidade = new Date(cupomEncontrado.dataValidade);
    if (dataValidade < hoje) {
      return { sucesso: false, mensagem: "Este cupom já expirou." };
    }

    // Copia o código para a área de transferência
    await Clipboard.setString(cupomEncontrado.codigo);

    return { 
      sucesso: true, 
      mensagem: `Cupom ${cupomEncontrado.codigo} copiado para a área de transferência!`,
      codigo: cupomEncontrado.codigo 
    };
  };

  // Retorna o estado e as actions
  return {
    // Estado
    cuponsDisponiveis: cupomsFiltrados,
    carregando,
    textoBusca,
    
    // Actions
    atualizarBusca,
    copiarCupom,
    
    // Helpers
    formatarData,
  };
}
