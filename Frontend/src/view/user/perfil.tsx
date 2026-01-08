import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image} from "react-native";

export default function SettingsScreen() {
  function handlePress(option: string) {
    Alert.alert("Opção selecionada", option);
  }

  function handleLogout() {
    Alert.alert("Sair", "Você saiu da conta.");
  }

  return (
    <View style={styles.container}>
      {/* LISTA DE OPÇÕES */}
      <View>
        <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Telefone")}>
            <View style={styles.row}>
                <Image source={require("../../../assets/logo/logo.png")} style={styles.icon}/>
                <Text style={styles.optionText}>Telefone</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Nome")}>
            <View>
                <Image source={require("../../../assets/logo/logo.png")} style={styles.icon}/>
                <Text style={styles.optionText}>Nome</Text>

            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("E-mail")}>
          <Text style={styles.optionText}>E-mail</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Data de Nascimento")}>
          <Text style={styles.optionText}>Data de Nascimento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Gênero")}>
          <Text style={styles.optionText}>Gênero</Text>
        </TouchableOpacity>
      </View>

      {/* BOTÃO SAIR */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>ATUALIZAR CADASTRO</Text>
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

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
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
});
