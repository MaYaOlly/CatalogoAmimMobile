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
          Para mais informações, entre em contato ou visite nossas redes sociais.
        </Text>
      </View>

      {/* BOTÕES SOCIAIS */}
      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handlePress("WhatsApp")}
        >
          <Text style={styles.socialText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handlePress("Instagram")}
        >
          <Text style={styles.socialText}>Instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => handlePress("Localização")}
        >
          <Text style={styles.socialText}>Localização</Text>
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
