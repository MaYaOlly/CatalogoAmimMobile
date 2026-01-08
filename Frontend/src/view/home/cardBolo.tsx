import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function App() {
  const [quantity, setQuantity] = useState(0);

  function handleAdd() {
    setQuantity((prev) => prev + 1);
  }

  function handleRemove() {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  }

  return (
    <View style={styles.container}>
        <Image source={require("../../assets/logo/logo3.png")} style={styles.logo}/>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          <Text style={{fontWeight: "bold"}}>Bolo de Chocolate</Text>
          {"\n\n"}
          Descrição:{"\n"}
          Sabor: Chocolate{"\n"}
          Recheio: Brigadeiro{"\n"}
          Cobertura: Chocolate ao leite{"\n"}
          Serve: Até 10 pessoas
        </Text>
      </View>

      <View style={styles.card1}>
        <View style={styles.quantityPill}>
          <TouchableOpacity onPress={handleRemove} style={styles.buttonCircle}>
            <Text style={styles.circleText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity}</Text>

          <TouchableOpacity onPress={handleAdd} style={styles.buttonCircle}>
            <Text style={styles.circleText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.addText}>Adicionar
          <Text style={styles.price}>R$ 95,00</Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create ({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: "#f5f5f5",
    },
    card: {
        backgroundColor: "#fdc7ff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    logo: {
        width: 120,
        height: 60,
        marginBottom: "10%",
    },
    card1: {
        backgroundColor: "#fdc7ff",
        borderRadius: 15,
        padding: 8,
        marginBottom: 16,
    },
    cardText: {
        fontSize: 12,
        color: "#333",
        lineHeight: 18,
    },
    quantityPill: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ff86b2",
        borderRadius: 20,
        paddingHorizontal: 6,
        paddingVertical: 4,
    },
    buttonCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#ff86b2",
        justifyContent: "center",
        alignItems: "center",
    },
    circleText: {
        color: "#b91588ff",
        fontSize: 18,
        fontWeight: "bold",
    },
    quantity: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        marginHorizontal: 6,
    },
    addText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 10,
    },
    price: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#fff",
        marginLeft: 4,
    },
})