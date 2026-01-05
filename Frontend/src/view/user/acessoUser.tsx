import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView} from "react-native";

export default function SettingsScreen() {
  function handlePress(option: string) {
    Alert.alert("Opção selecionada", option);
  }

  function handleLogout() {
    Alert.alert("Sair", "Você saiu da conta.");
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={require("../../assets/logo3.png")} style={styles.logo}/>
        {/* LISTA DE OPÇÕES */}
        <View>
          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Perfil")}>
              <View style={styles.row}>
                  <Image source={require("../Frontend/assets/icons/perfil.png")} style={styles.icon}/>
                  <Text style={styles.optionText}>Perfil</Text>
              </View>
          </TouchableOpacity>


          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Trocar Senha")}>
              <View style={styles.row}>
                  <Image source={require("../assets/icons/senha.png")} style={styles.icon}/>
                  <Text style={styles.optionText}>Trocar Senha</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Notificações")}>
              <View style={styles.row}>
                  <Image source={require("../assets/icons/notificacao.png")} style={styles.icon}/>
                  <Text style={styles.optionText}>Notificações</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Informações")}>
            <View style={styles.row}>
              <Image source={require("../assets/icons/informacoes.png")} style={styles.icon}/>
              <Text style={styles.optionText}>Informações</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* BOTÃO SAIR */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.row}>
            <Image source={require("../assets/icons/sair.png")} style={styles.icon}/>
            <Text style={styles.logoutText}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfbfc",
    padding: 16,
    justifyContent: "space-between",
  },

  logo: {
    width: 120,
    height: 60,
    marginBottom: "10%",
  },

  optionButton: {
    backgroundColor: "#251219ff", 
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#a3214d",
  },

  logoutButton: {
    backgroundColor: "#f06292",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
  },

  logoutText: {
    color: "#fcfbfc",
    fontSize: 16,
    fontWeight: "bold",
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
});
