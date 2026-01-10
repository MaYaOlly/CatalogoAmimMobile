import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity,} from "react-native";

export default function Notificacoes() {
  function handleLogout() {
    Alert.alert("Confirmado", "Ação realizada com sucesso.");
  }

  return (
    <View style={styles.container}>
      {/* RETÂNGULO INFORMATIVO */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Para trocar os status das notificações em seu dispositivo vá em  Configurações / Amim / Notificações.
        </Text>
        <Text style={styles.infoText}>
          Para alterar sua senha, utilize a opção de recuperação ou entre em
          contato com o suporte.{'\n'}{'\n'}
          Notificações: Ativadas
        </Text>
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

  logoutButton: {
    backgroundColor: "#f06292", 
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "#fcfbfc", 
    fontWeight: "bold",
  },
});
