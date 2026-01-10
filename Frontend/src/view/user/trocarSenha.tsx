import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, Image } from "react-native";

export default function TrocarSenha() {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha atual"
              secureTextEntry={!showSenhaAtual}
              value={senhaAtual}
              onChangeText={setSenhaAtual}
            />
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => setShowSenhaAtual(!showSenhaAtual)}
            >
              {/* ÁREA PARA IMAGEM - substitua a View por <Image> com sua imagem */}
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>
                  {showSenhaAtual ? (
                    <Image source={require('../assets/instagram.png')}/>
                  ) : (
                    <Image source={require('../assets/WhatsZapp.png')}/>
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.optionButton}>
          <Text style={styles.optionText}>Nova Senha</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite a nova senha"
              secureTextEntry={!showNovaSenha}
              value={novaSenha}
              onChangeText={setNovaSenha}
            />
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => setShowNovaSenha(!showNovaSenha)}
            >
              {/* ÁREA PARA IMAGEM - substitua a View por <Image> com sua imagem */}
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>
                  {showNovaSenha ? (
                    <Image source={require('../assets/instagram.png')}/>
                  ) : (
                    <Image source={require('../assets/WhatsZapp.png')}/>
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.optionButton}>
          <Text style={styles.optionText}>Confirmar Nova Senha</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirme a nova senha"
              secureTextEntry={!showConfirmarSenha}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => setShowConfirmarSenha(!showConfirmarSenha)}
            >
              {/* ÁREA PARA IMAGEM - substitua a View por <Image> com sua imagem */}
              <View style={styles.imagePlaceholder}>
                <Text style={styles.placeholderText}>
                  {showConfirmarSenha ? (
                    <Image source={require('../assets/instagram.png')}/>
                  ) : (
                    <Image source={require('../assets/WhatsZapp.png')}/>
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "#fcfbfc",
    padding: 5,
    justifyContent: "space-between",
  },

  optionButton: {
    backgroundColor: "#fce4ec",
    padding: 18,
    borderRadius: 30,
    marginBottom: 12,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },

  optionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#a3214d",
  },

  logoutButton: {
    backgroundColor: "#da4a9eff",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  logoutText: {
    color: "#fce4ec",
    fontSize: 15,
    fontWeight: "bold",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 8,
  },

  input: {
    justifyContent: "flex-end",
    marginTop: 8,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#a3214d",
    alignItems: "center",
  },

  imageButton: {
    marginLeft: 8,
  },

  imagePlaceholder: {
    width: 1,
    height: 1,
    backgroundColor: "#da4a9e",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
});