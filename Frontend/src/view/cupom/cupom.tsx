import React from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView, ActivityIndicator } from "react-native";
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCupomViewModel, CupomNormalizado } from "../../ViewModel/useCupomViewModel";

type CupomNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cupom'
>;

type Props = {
  navigation: CupomNavigationProp;
};

export const Cupom = ({ navigation }: Props) => {
  // ViewModel
  const {
    cuponsDisponiveis,
    carregando,
    textoBusca,
    atualizarBusca,
    copiarCupom,
    formatarData,
  } = useCupomViewModel();

  // Helper para gerar título do cupom
  const getTituloCupom = (cupom: CupomNormalizado) => {
    const valor = cupom.tipoDesconto === "percentual" 
      ? `${cupom.valorDesconto}%` 
      : `R$ ${cupom.valorDesconto.toFixed(2).replace('.', ',')}`;
    return `Cupom de ${valor} OFF`;
  };

  // Helper para gerar descrição do cupom
  const getDescricaoCupom = (cupom: CupomNormalizado) => {
    const tipo = cupom.tipoDesconto === "percentual" ? "Desconto percentual" : "Desconto fixo";
    return `${tipo}\nVálido até: ${formatarData(cupom.dataValidade)}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* LOGO */}
      <Image
        source={require("../../../assets/logo/logo3.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Image
          source={require("../../../assets/icons/lupa.png")}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Procurar cupons"
          placeholderTextColor="#a3214d"
          value={textoBusca}
          onChangeText={atualizarBusca}
        />
      </View>

      {/* LOADING */}
      {carregando ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#a3214d" />
          <Text style={styles.loadingText}>Carregando cupons...</Text>
        </View>
      ) : (
        /* CUPONS */
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {cuponsDisponiveis.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum cupom encontrado</Text>
            </View>
          ) : (
            cuponsDisponiveis.map(item => {
              const dataValidade = new Date(item.dataValidade);
              const hoje = new Date();
              const expirado = dataValidade < hoje;

              return (
                <View key={item.id} style={[
                  styles.cupomCard,
                  (!item.ativo || expirado) && styles.cupomInativo
                ]}>
                  <Image
                    source={require("../../../assets/icons/bolo.png")}
                    style={styles.cupomImage}
                  />

                  <View style={styles.cupomText}>
                    <Text style={styles.cupomTitle}>
                      {getTituloCupom(item)}
                    </Text>
                    <Text style={styles.cupomCodigo}>
                      {item.codigo}
                    </Text>
                    <Text style={styles.cupomDescription}>
                      {getDescricaoCupom(item)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.botao,
                      (!item.ativo || expirado) && styles.botaoDesativado,
                    ]}
                    disabled={!item.ativo || expirado}
                    onPress={() => copiarCupom(item.id)}
                  >
                    <Text style={styles.textoBotao}>
                      {expirado ? "Expirado" : !item.ativo ? "Inativo" : "Copiar"}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}

          <View style={{ height: 20 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfbfc",
  },

  /* LOGO */
  logo: {
    width: 120,
    height: 60,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  /* SEARCH */
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fce4ec",
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 48,
    width: "95%",
    alignSelf: "center",
    marginBottom: 16,
  },

  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "#a3214d",
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#a3214d",
  },

  /* LISTA */
  scrollContent: {
    paddingBottom: 20,
  },

  /* LOADING */
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#a3214d",
  },

  /* EMPTY STATE */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyText: {
    fontSize: 16,
    color: "#a3214d",
    textAlign: "center",
  },

  /* CARD CUPOM */
  cupomCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fce4ec",
    borderRadius: 30,
    padding: 16,
    marginBottom: 12,
    width: "95%",
    alignSelf: "center",
  },

  cupomInativo: {
    opacity: 0.6,
  },

  cupomImage: {
    width: 45,
    height: 45,
    marginRight: 12,
  },

  cupomText: {
    flex: 1,
  },

  cupomTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#a3214d",
    marginBottom: 2,
  },

  cupomCodigo: {
    fontSize: 14,
    fontWeight: "600",
    color: "#d81b60",
    marginBottom: 4,
    letterSpacing: 0.5,
  },

  cupomDescription: {
    fontSize: 13,
    color: "#a3214d",
    lineHeight: 18,
  },

  /* BOTÃO */
  botao: {
    backgroundColor: "#f06292",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 30,
  },

  botaoDesativado: {
    opacity: 0.6,
  },

  textoBotao: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
export default Cupom;