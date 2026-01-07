import React, { useState} from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";

export const TelaDeCupom = () => {
  const [cupom, setCupom] = useState("");

  function handleApplyCupom() {
    if(!cupom.trim()) {
      Alert.alert("Erro", "Digite um cupom válido.");
    }

    if(cupom.toUpperCase() === "Cupom19OFF") {
      Alert.alert("Sucesso", "Cupom aplicado com 19% de desconto!");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/logo3.png")} style={styles.logo}/>
      <TextInput style={styles.input} placeholder="Procurar cupons" value={cupom} onChangeText={setCupom} autoCapitalize="characters" />

      <View style={styles.card}>
        <View>
          <Text style={[styles.cardText, styles.cardTextBold]}>Cupom de 19% OFF</Text>
          <Text style={styles.cardText}>para pedidos de dia das bruxas.</Text>
          <Text style={styles.cardText}>Compras acima de R$100,00.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleApplyCupom}>
          <Text style={styles.buttonText}>Usar</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 5,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 50,
    color: "#61143eff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 18,
    fontSize: 16,
    paddingHorizontal: 19,
    marginBottom: 16,
    backgroundColor: "#fdc7ffff",
  },
  button: {
    backgroundColor: "#da4a9eff",
    height: 30,
    width: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fdc7ffff",
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0,height: 3},
  },
  cardText: {
    fontSize: 12,
    color: "#61143eff",
    marginBottom: 4,
    textAlign: "auto",
  },
  cardTextBold: {
    fontWeight: "bold",
    marginBottom: 8,
  }, logo: {
    width: 120,
    height: 60,
    marginBottom: "10%",
  },
})
export default TelaDeCupom;