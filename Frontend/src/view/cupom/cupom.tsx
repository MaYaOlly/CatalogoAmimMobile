import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../../navigation/types";

export default function Cupom() {
  const navigation = useNavigation();
  const [cupom, setCupom] = useState("");
  const [cuponsDisponiveis, setCuponsDisponiveis] = useState([
    { 
      id: 1, 
      codigo: "HALLOWEEN19", 
      titulo: "Cupom de 19% OFF", 
      descricao: "para pedidos de dia das bruxas.", 
      condicoes: "Compras acima de $810,00",
      utilizado: false,
      cor: "#fce4ec",
    },
    { 
      id: 2, 
      codigo: "PRIMEIRA5", 
      titulo: "Cupom de 5% OFF", 
      descricao: "para primeira compra.", 
      condicoes: "Válido apenas uma vez",
      utilizado: false,
      cor: "#fce4ec",
    },
  ]);

  function handleApplyCupom(codigoCupom: string) {
    if (!codigoCupom.trim()) {
      Alert.alert("Erro", "Digite um cupom válido.");
      return;
    }

    const cupomEncontrado = cuponsDisponiveis.find(c => 
      c.codigo.toLowerCase() === codigoCupom.toLowerCase()
    );

    if (!cupomEncontrado) {
      Alert.alert("Cupom inválido", "O cupom digitado não existe.");
      return;
    }

    if (cupomEncontrado.utilizado) {
      Alert.alert("Cupom já utilizado", "Este cupom já foi utilizado e não está mais disponível.");
      return;
    }

    const novosCupons = cuponsDisponiveis.map(c => {
      if (c.id === cupomEncontrado.id) {
        return { ...c, utilizado: true };
      }
      return c;
    });

    setCuponsDisponiveis(novosCupons);
    
    Alert.alert(
      "Sucesso!", 
      `Cupom ${cupomEncontrado.codigo} aplicado!\n${cupomEncontrado.titulo}\n${cupomEncontrado.descricao}`
    );
    setCupom("");
  }

  function usarCupomDireto(idCupom: number) {
    const cupomEncontrado = cuponsDisponiveis.find(c => c.id === idCupom);

    if (!cupomEncontrado) {
      Alert.alert("Erro", "Cupom não encontrado.");
      return;
    }

    if (cupomEncontrado.utilizado) {
      Alert.alert("Cupom já utilizado", "Este cupom já foi utilizado e não está mais disponível.");
      return;
    }

    const novosCupons = cuponsDisponiveis.map(c => {
      if (c.id === idCupom) {
        return { ...c, utilizado: true };
      }
      return c;
    });

    setCuponsDisponiveis(novosCupons);
    
    Alert.alert(
      "Sucesso!", 
      `Cupom ${cupomEncontrado.codigo} aplicado!\n${cupomEncontrado.titulo}\n${cupomEncontrado.descricao}`
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Campo de busca com imagem */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWithImage}>
          <Image 
            source={require("../../../assets/icons/lupa.png")} 
            style={styles.searchIconImage} 
            resizeMode="cover"
          />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Procurar cupons..." 
            placeholderTextColor="#a3214d"
            value={cupom}
            onChangeText={setCupom}
            autoCapitalize="characters"
            onSubmitEditing={() => handleApplyCupom(cupom)}
          />
        </View>
      </View>

      {/* Lista de cupons */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {cuponsDisponiveis.map((cupomItem) => (
          <View 
            key={cupomItem.id} 
            style={[
              styles.cupomCard,
              { backgroundColor: cupomItem.cor },
              cupomItem.utilizado && styles.cardUsed
            ]}
          >
            <View style={styles.cupomRow}>
              {/* Imagem centralizada verticalmente */}
              <View style={styles.imageContainer}>
                <Image 
                  source={require("../../../assets/icons/bolo.png")} 
                  style={[
                    styles.cupomImage, 
                    cupomItem.utilizado && styles.imageUsed
                  ]} 
                  resizeMode="contain"
                />
              </View>
              
              {/* Conteúdo do cupom */}
              <View style={styles.cupomContent}>
                {/* Título principal */}
                <Text style={[
                  styles.cupomTitle,
                  cupomItem.utilizado && styles.textUsed
                ]}>
                  {cupomItem.titulo}
                </Text>

                {/* Descrição */}
                <Text style={[
                  styles.cupomDescription,
                  cupomItem.utilizado && styles.textUsed
                ]}>
                  {cupomItem.descricao}
                </Text>

                {/* Condições */}
                <Text style={[
                  styles.cupomConditions,
                  cupomItem.utilizado && styles.textUsed
                ]}>
                  {cupomItem.condicoes}
                </Text>

                {/* Container botão */}
                <View style={styles.bottomContainer}>
                  {/* Badge de utilizado (se aplicável) */}
                  {cupomItem.utilizado && (
                    <View style={styles.usedBadge}>
                      <Text style={styles.usedText}>UTILIZADO</Text>
                    </View>
                  )}
                  
                  {/* Botão USAR */}
                  <TouchableOpacity 
                    style={[
                      styles.useButton, 
                      cupomItem.utilizado && styles.useButtonDisabled
                    ]} 
                    onPress={() => usarCupomDireto(cupomItem.id)}
                    disabled={cupomItem.utilizado}
                  >
                    <Text style={styles.useButtonText}>
                      {cupomItem.utilizado ? "Usado" : "Usar"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
        
        {/* Espaço final */}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfbfc",
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 15,
    marginTop: 10,
  },
  searchWithImage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fce4ec",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#f8bbd9",
    overflow: "hidden",
  },
  searchIconImage: {
    width: 40,
    height: 40,
    marginLeft: 8,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#a3214d",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  cupomCard: {
    borderRadius: 15,
    marginBottom: 12,
    minHeight: 130,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cupomRow: {
    flexDirection: "row",
    flex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  cupomImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  imageUsed: {
    opacity: 0.6,
  },
  cupomContent: {
    flex: 1,
    padding: 12,
    paddingLeft: 0,
    justifyContent: "space-between",
  },
  cupomTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#a3214d",
    marginBottom: 4,
  },
  cupomDescription: {
    fontSize: 14,
    color: "#a3214d",
    marginBottom: 6,
    lineHeight: 18,
  },
  cupomConditions: {
    fontSize: 12,
    color: "#a3214d",
    marginBottom: 8,
    fontWeight: "600",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  useButton: {
    backgroundColor: "#a3214d",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 15,
  },
  useButtonDisabled: {
    backgroundColor: "#cccccc",
  },
  useButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  usedBadge: {
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  usedText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "bold",
  },
  cardUsed: {
    opacity: 0.8,
  },
  textUsed: {
    color: "#888888",
  },
  bottomSpace: {
    height: 20,
  },
});