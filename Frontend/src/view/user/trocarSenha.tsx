import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput,} from "react-native";

export default function SettingsScreen() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function handleConfirmar() {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    Alert.alert("Sucesso", "Senha alterada com sucesso!");
  }

  return (
    <View style={styles.container}>
      {/* CAMPOS DE SENHA */}
      <View>
        <View style={styles.optionButton}>
          <Text style={styles.optionText}>Senha Atual</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha atual"
            secureTextEntry
            value={senhaAtual}
            onChangeText={setSenhaAtual}
          />
        </View>

        <View style={styles.optionButton}>
          <Text style={styles.optionText}>Nova Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a nova senha"
            secureTextEntry
            value={novaSenha}
            onChangeText={setNovaSenha}
          />
        </View>

        <View style={styles.optionButton}>
          <Text style={styles.optionText}>Confirmar Nova Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme a nova senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        </View>
      </View>

      {/* BOTÃO CONFIRMAR */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleConfirmar}>
        <Text style={styles.logoutText}>CONFIRMAR</Text>
      </TouchableOpacity>
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

  optionButton: {
    backgroundColor: "rgba(245, 214, 247, 1)",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 2, // Android
    shadowColor: "#000", // iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#b91588ff",
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

  input: {
    marginTop: 8,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
});
