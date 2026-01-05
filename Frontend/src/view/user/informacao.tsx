import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, } from "react-native";

export default function SettingsScreen() {
  function handlePress(option: string) {
    Alert.alert(option, "Botão pressionado");
  }

  return (
    <View style={styles.container}>
      {/* RETÂNGULO INFORMATIVO */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Amim Doces e Salgados – A confeitaria mais querida de Piripiri! Especialistas em bolos confeitados para aniversários e eventos, a Amim também conquista pelo sabor irresistível de seus salgados, feitos com todo carinho e qualidade para tornar qualquer comemoração ainda mais especial.

          Seja para celebrar momentos importantes ou adoçar o seu dia, cada produto é preparado de forma artesanal, com atenção aos detalhes e muito sabor.
          Nossa missão é levar alegria e sabor para a sua mesa, com produtos que encantam os olhos e o paladar. Venha nos visitar e descubra por que somos a escolha favorita da comunidade!

        </Text>
      </View>

      {/* BOTÕES SOCIAIS */}
      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handlePress("WhatsApp")}
        >
          <Image source={{ uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNi9jaZYQzxGyCXFsYHRi-0fUSVG-xoWTU1g&s'}}>        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handlePress("Instagram")}
        >
          <Image source={{ uri:'data:image/png;base64,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'}}>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handlePress("Localização")}
        >
          <Image source={{ uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgjZ-0Q2KFc_r3gs-J3WlYoegjyB9AOVw7jA&s'}}>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfbfc", 
    padding: 16,
    justifyContent: "space-between",
  },

  infoBox: {
    backgroundColor: "#fce4ec",
    padding: 14,
    borderRadius: 20,
    marginBottom: 12,
  },

  infoText: {
    fontSize: 12,
    color: "#a3214d", 
    textAlign: "center",
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  socialButton: {
    flex: 1,
    backgroundColor: "#f06292",
    marginHorizontal: 4,
    height: 70,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  socialText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fcfbfc", 
    textAlign: "center",
  },
});
