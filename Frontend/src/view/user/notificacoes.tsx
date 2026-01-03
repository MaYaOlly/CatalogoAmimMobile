import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

export default function SettingsScreen() {
  function handleLogout() {
    Alert.alert("Confirmado", "Ação realizada com sucesso.");
  }

  return (
    <View style={styles.container}>
      {/* RETÂNGULO INFORMATIVO */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Para alterar sua senha, utilize a opção de recuperação ou entre em
          contato com o suporte.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
    justifyContent: "space-between",
  },

  infoBox: {
    backgroundColor: "rgba(245, 214, 247, 1)",
    padding: 14,
    borderRadius: 20,
    marginBottom: 12,
  },

  infoText: {
    fontSize: 12,
    color: "#b91588ff",
    textAlign: "center",
  },

  logoutButton: {
    backgroundColor: "rgba(245, 214, 247, 1)",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "#b91588ff",
    fontSize: 13,
    fontWeight: "bold",
  },
});
