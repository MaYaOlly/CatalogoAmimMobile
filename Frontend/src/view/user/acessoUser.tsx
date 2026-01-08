import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView} from "react-native";

export const TelaDeConfiguracao = () => {
  function handlePress(option: string) {
    Alert.alert("Opção selecionada", option);
  }

  function handleLogout() {
    Alert.alert("Sair", "Você saiu da conta.");
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={require("../../../assets/logo/logo3.png")} style={styles.logo}/>
        {/* LISTA DE OPÇÕES */}
        <View>
          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Perfil")}>
              <View style={styles.row}>
                  <Image source={require("../../../assets/logo/logo3.png")} style={styles.icon}/>
                  <Text style={styles.optionText}>Perfil</Text>
              </View>
          </TouchableOpacity>


          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Trocar Senha")}>
              <View style={styles.row}>
                  <Image source={require("../../../assets/logo/logo3.png")} style={styles.icon}/>
                  <Text style={styles.optionText}>Trocar Senha</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Notificações")}>
              <View style={styles.row}>
                  <Image source={require("../../../assets/logo/logo3.png")} style={styles.icon}/>
                  <Text style={styles.optionText}>Notificações</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={() => handlePress("Informações")}>
            <View style={styles.row}>
              <Image source={require("../../../assets/logo/logo3.png")} style={styles.icon}/>
              <Text style={styles.optionText}>Informações</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* BOTÃO SAIR */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.row}>
            <Image source={require("../../../assets/logo/logo3.png")} style={styles.icon}/>
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
        backgroundColor: "#F5F5F5",
        padding: 16,
        justifyContent: "space-between",
    },

    logo: {
      width: 120,
      height: 60,
      marginBottom: "10%",
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
export default TelaDeConfiguracao;