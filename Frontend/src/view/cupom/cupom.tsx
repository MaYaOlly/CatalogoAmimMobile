import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet,  Alert,ScrollView, Image, SafeAreaView } from "react-native";
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type CupomNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cupom'
>;

type Props = {
  navigation: CupomNavigationProp;
  
};

export const Cupom = ({ navigation}: Props) => {
  const [cupom, setCupom] = useState("");

  const [cuponsDisponiveis, setCuponsDisponiveis] = useState([
    {
      id: 1,
      codigo: "HALLOWEEN19",
      titulo: "Cupom de 19% OFF",
      descricao: "para pedidos de dia das bruxas.",
      condicoes: "Compras acima de R$100,00",
      utilizado: false,
    },
    {
      id: 2,
      codigo: "PRIMEIRA5",
      titulo: "Cupom de 5% OFF",
      descricao: "para primeira compra.",
      condicoes: "Válido apenas uma vez",
      utilizado: false,
    },
  ]);

  function usarCupomDireto(idCupom: number) {
    const cupomEncontrado = cuponsDisponiveis.find(
      c => c.id === idCupom
    );

    if (!cupomEncontrado) {
      Alert.alert("Erro", "Cupom não encontrado.");
      return;
    }

    if (cupomEncontrado.utilizado) {
      Alert.alert("Cupom já utilizado", "Este cupom já foi utilizado.");
      return;
    }

    setCuponsDisponiveis(prev =>
      prev.map(c =>
        c.id === idCupom ? { ...c, utilizado: true } : c
      )
    );

    Alert.alert(
      "Sucesso!",
      `Cupom ${cupomEncontrado.codigo} aplicado!`
    );
  }

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
          value={cupom}
          onChangeText={setCupom}
        />
      </View>

      {/* CUPONS */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {cuponsDisponiveis.map(item => (
          <View key={item.id} style={styles.cupomCard}>
            <Image
              source={require("../../../assets/icons/bolo.png")}
              style={styles.cupomImage}
            />

            <View style={styles.cupomText}>
              <Text style={styles.cupomTitle}>
                {item.titulo}
              </Text>
              <Text style={styles.cupomDescription}>
                {item.descricao}
                {"\n"}
                {item.condicoes}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.botao,
                item.utilizado && styles.botaoDesativado,
              ]}
              disabled={item.utilizado}
              onPress={() => usarCupomDireto(item.id)}
            >
              <Text style={styles.textoBotao}>
                {item.utilizado ? "Usado" : "Copiar"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
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
    marginBottom: 4,
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