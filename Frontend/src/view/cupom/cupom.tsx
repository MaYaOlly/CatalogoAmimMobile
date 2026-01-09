import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from "react-native";

export default function CupomScreen() {
  const [cupom, setCupom] = useState("");
  const [cuponsDisponiveis, setCuponsDisponiveis] = useState([
    { 
      id: 1, 
      codigo: "CUPOM19OFF", 
      titulo: "Cupom de 19% OFF", 
      descricao: "para pedidos de dia das bruxas.", 
      condicoes: "Compras acima de R$100,00.",
      utilizado: false 
    },
    { 
      id: 2, 
      codigo: "CUPOM10OFF", 
      titulo: "Cupom de 10% OFF", 
      descricao: "para pedidos de Natal.", 
      condicoes: "Compras acima de R$200,00.",
      utilizado: false 
    },
    { 
      id: 3, 
      codigo: "CUPOM5OFF", 
      titulo: "Cupom de 5% OFF", 
      descricao: "para primeira compra.", 
      condicoes: "Válido apenas uma vez.",
      utilizado: false 
    },
    { 
      id: 4, 
      codigo: "FRETE0", 
      titulo: "Frete Grátis", 
      descricao: "frete grátis em qualquer compra.", 
      condicoes: "Válido até o final do mês.",
      utilizado: true 
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

    // Marcar cupom como utilizado
    const novosCupons = cuponsDisponiveis.map(c => {
      if (c.id === cupomEncontrado.id) {
        return { ...c, utilizado: true };
      }
      return c;
    });

    setCuponsDisponiveis(novosCupons);
    
    Alert.alert(
      "Sucesso!", 
      `Cupom ${cupomEncontrado.codigo} aplicado com sucesso!\n\n${cupomEncontrado.titulo}\n${cupomEncontrado.descricao}`
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

    // Marcar cupom como utilizado
    const novosCupons = cuponsDisponiveis.map(c => {
      if (c.id === idCupom) {
        return { ...c, utilizado: true };
      }
      return c;
    });

    setCuponsDisponiveis(novosCupons);
    
    Alert.alert(
      "Sucesso!", 
      `Cupom ${cupomEncontrado.codigo} aplicado com sucesso!\n\n${cupomEncontrado.titulo}\n${cupomEncontrado.descricao}`
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Digite o código do cupom..." 
          value={cupom}
          onChangeText={setCupom}
          autoCapitalize="characters"
        />
        <TouchableOpacity 
          style={styles.applyButton} 
          onPress={() => handleApplyCupom(cupom)}
        >
          <Text style={styles.applyButtonText}>Aplicar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {cuponsDisponiveis.map((cupomItem) => (
          <View key={cupomItem.id} style={[
            styles.card,
            cupomItem.utilizado && styles.cardUsed
          ]}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={[styles.cardText, styles.cardTextBold]}>
                  {cupomItem.titulo}
                </Text>
                <Text style={styles.cardCode}>Código: {cupomItem.codigo}</Text>
              </View>
              {cupomItem.utilizado && (
                <View style={styles.usedBadge}>
                  <Text style={styles.usedText}>UTILIZADO</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.cardText}>{cupomItem.descricao}</Text>
            <Text style={styles.cardText}>{cupomItem.condicoes}</Text>
            
            <View style={styles.cardFooter}>
              <TouchableOpacity 
                style={[
                  styles.button, 
                  cupomItem.utilizado && styles.buttonDisabled
                ]} 
                onPress={() => usarCupomDireto(cupomItem.id)}
                disabled={cupomItem.utilizado}
              >
                <Text style={styles.buttonText}>
                  {cupomItem.utilizado ? "Já usado" : "Usar"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 150,
    height: 100,
    alignSelf: "center",
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    color: "#61143eff",
    borderColor: "#fffefeff",
    borderWidth: 1,
    borderRadius: 18,
    fontSize: 18,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#fdc7ffff",
  },
  applyButton: {
    backgroundColor: "#61143eff",
    height: 45,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fdc7ffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardUsed: {
    opacity: 0.8,
    backgroundColor: "#e0e0e0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardCode: {
    fontSize: 14,
    color: "#333",
    fontFamily: "monospace",
    marginTop: 4,
  },
  cardText: {
    fontSize: 16,
    color: "#61143eff",
    marginBottom: 4,
  },
  cardTextBold: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 18,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  button: {
    backgroundColor: "#da4a9eff",
    height: 40,
    width: 90,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  usedBadge: {
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  usedText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});