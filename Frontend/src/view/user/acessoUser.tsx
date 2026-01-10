import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView} from "react-native";

export default function AcessoUser() {
  function handlePress(option: string) {
    Alert.alert("Opção selecionada", option);
  }

  function handleLogout() {
    Alert.alert("Sair", "Você saiu da conta.");
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        *<Image source={require("../../../assets/logo.png")} style={styles.logo}/>
        
        {/* LISTA DE OPÇÕES */}
        <View>
          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Perfil")}>
              <View style={styles.row}>
                  <Image source={require("../../../assets/perfil.png")} style={styles.icon}/>
                  <Text style={styles.optionText}>Perfil</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Trocar Senha")}>
              <View style={styles.row}>
                  <Image source={require("../../../assets/trocarsenha.png")} style={styles.icon}/>
                  <Text style={styles.optionText}>Trocar Senha</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Notificações")}>
              <View style={styles.row}>
                  <Image source={require("../../../assets/sino.png")} style={styles.icon}/>
                  <Text style={styles.optionText}>Notificações</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Informações")}>
            <View style={styles.row}>
              <Image source={require("../../../assets/information.png")} style={styles.icon}/>
              <Text style={styles.optionText}>Informações</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* BOTÃO SAIR (FIXO NO FINAL) */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.optionButton}>
            <Image source={require("../../../assets/saida.png")} style={styles.icon}/>
            <Text style={styles.logoutText}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfbfc",
  },
  
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },

  logo: {
    width: 120,
    height: 60,
    marginBottom: "10%",
  },

  optionButton: {
    backgroundColor: "#fce4ec", 
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
  },

  optionText: {
    fontSize: 16,
    color: "#a3214d",
    fontWeight: "bold",
  },

  logoutButton: {
    backgroundColor: "#fce4ec",
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
  },

  logoutText: {
    color: "#a3214d",
    fontSize: 16,
    fontWeight: "bold",
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 34,
  },

  footer: {
    backgroundColor: "#fcfbfc",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  }
});