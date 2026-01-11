import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, SafeAreaView, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function TrocarSenha() {
  const navigation = useNavigation();
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  function handleConfirmar() {
    // Validações
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (senhaAtual.length < 6) {
      Alert.alert("Erro", "A senha atual deve ter pelo menos 6 caracteres.");
      return;
    }

    if (novaSenha.length < 6) {
      Alert.alert("Erro", "A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "As novas senhas não coincidem.");
      return;
    }

    if (senhaAtual === novaSenha) {
      Alert.alert("Erro", "A nova senha deve ser diferente da senha atual.");
      return;
    }

    // Simulação de alteração de senha
    Alert.alert(
      "Confirmar Alteração",
      "Tem certeza que deseja alterar sua senha?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          onPress: () => {
            Alert.alert("Sucesso", "Senha alterada com sucesso!");
            // Limpar campos após sucesso
            setSenhaAtual("");
            setNovaSenha("");
            setConfirmarSenha("");
            navigation.goBack();
          }
        }
      ]
    );
  }

  function handleCancelar() {
    if (senhaAtual || novaSenha || confirmarSenha) {
      Alert.alert(
        "Descartar Alterações",
        "Tem certeza que deseja descartar as alterações?",
        [
          { text: "Continuar Editando", style: "cancel" },
          {
            text: "Descartar",
            onPress: () => {
              setSenhaAtual("");
              setNovaSenha("");
              setConfirmarSenha("");
              navigation.goBack();
            }
          }
        ]
      );
    } else {
      navigation.goBack();
    }
  }

  // Verificar força da senha
  const getSenhaStrength = () => {
    if (novaSenha.length === 0) return { text: "", color: "#a3214d" };
    
    if (novaSenha.length < 6) {
      return { text: "Fraca", color: "#ff5252" };
    }
    
    const hasLetter = /[a-zA-Z]/.test(novaSenha);
    const hasNumber = /\d/.test(novaSenha);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(novaSenha);
    
    let strength = 0;
    if (hasLetter) strength++;
    if (hasNumber) strength++;
    if (hasSpecial) strength++;
    
    if (novaSenha.length >= 8 && strength >= 2) {
      return { text: "Forte", color: "#4CAF50" };
    } else if (novaSenha.length >= 6 && strength >= 1) {
      return { text: "Média", color: "#FF9800" };
    } else {
      return { text: "Fraca", color: "#ff5252" };
    }
  };

  const senhaStrength = getSenhaStrength();

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER COM BOTÃO VOLTAR */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={handleCancelar} 
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alterar Senha</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* INSTRUÇÕES */}
        <View style={styles.infoBox}>
          <Ionicons name="lock-closed-outline" size={24} color="#a3214d" />
          <Text style={styles.infoText}>
            Para sua segurança, a nova senha deve ter pelo menos 6 caracteres.
          </Text>
        </View>

        {/* CAMPO SENHA ATUAL */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Senha Atual *</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha atual"
              secureTextEntry={!showSenhaAtual}
              value={senhaAtual}
              onChangeText={setSenhaAtual}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowSenhaAtual(!showSenhaAtual)}
              style={styles.eyeButton}
            >
              <Ionicons 
                name={showSenhaAtual ? "eye-off-outline" : "eye-outline"} 
                size={22} 
                color="#a3214d" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* CAMPO NOVA SENHA */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Nova Senha *</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Digite a nova senha"
              secureTextEntry={!showNovaSenha}
              value={novaSenha}
              onChangeText={setNovaSenha}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowNovaSenha(!showNovaSenha)}
              style={styles.eyeButton}
            >
              <Ionicons 
                name={showNovaSenha ? "eye-off-outline" : "eye-outline"} 
                size={22} 
                color="#a3214d" 
              />
            </TouchableOpacity>
          </View>
          {novaSenha.length > 0 && (
            <View style={styles.strengthContainer}>
              <Text style={styles.strengthLabel}>Força da senha:</Text>
              <Text style={[styles.strengthText, { color: senhaStrength.color }]}>
                {senhaStrength.text}
              </Text>
            </View>
          )}
          <Text style={styles.hintText}>
            Use letras, números e caracteres especiais para maior segurança.
          </Text>
        </View>

        {/* CAMPO CONFIRMAR SENHA */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Confirmar Nova Senha *</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Confirme a nova senha"
              secureTextEntry={!showConfirmarSenha}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmarSenha(!showConfirmarSenha)}
              style={styles.eyeButton}
            >
              <Ionicons 
                name={showConfirmarSenha ? "eye-off-outline" : "eye-outline"} 
                size={22} 
                color="#a3214d" 
              />
            </TouchableOpacity>
          </View>
          {confirmarSenha.length > 0 && novaSenha !== confirmarSenha && (
            <Text style={styles.errorText}>As senhas não coincidem</Text>
          )}
          {confirmarSenha.length > 0 && novaSenha === confirmarSenha && novaSenha.length >= 6 && (
            <Text style={styles.successText}>Senhas correspondem ✓</Text>
          )}
        </View>

        {/* DICAS DE SEGURANÇA */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Dicas para uma senha segura:</Text>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.tipText}>Mínimo de 6 caracteres</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.tipText}>Use letras maiúsculas e minúsculas</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.tipText}>Inclua números e caracteres especiais</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.tipText}>Não use informações pessoais</Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTÕES */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={handleCancelar}
        >
          <Text style={styles.cancelButtonText}>CANCELAR</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.confirmButton,
            (!senhaAtual || !novaSenha || !confirmarSenha || novaSenha !== confirmarSenha) && 
            styles.confirmButtonDisabled
          ]} 
          onPress={handleConfirmar}
          disabled={!senhaAtual || !novaSenha || !confirmarSenha || novaSenha !== confirmarSenha}
        >
          <Text style={styles.confirmButtonText}>ALTERAR SENHA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfbfc",
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fce4ec",
    borderBottomWidth: 1,
    borderBottomColor: '#e8c4d4',
  },
  
  backButton: {
    padding: 8,
  },
  
  backButtonText: {
    fontSize: 24,
    color: "#a3214d",
    fontWeight: "bold",
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a3214d",
  },
  
  headerPlaceholder: {
    width: 40,
  },
  
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  
  infoBox: {
    backgroundColor: "#fce4ec",
    padding: 16,
    borderRadius: 15,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  
  infoText: {
    fontSize: 14,
    color: "#a3214d",
    marginLeft: 12,
    flex: 1,
  },
  
  fieldContainer: {
    marginBottom: 20,
  },
  
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a3214d",
    marginBottom: 8,
    marginLeft: 4,
  },
  
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e8c4d4",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#a3214d",
  },
  
  eyeButton: {
    padding: 8,
  },
  
  strengthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  
  strengthLabel: {
    fontSize: 12,
    color: "#a3214d",
    opacity: 0.7,
    marginRight: 6,
  },
  
  strengthText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  
  hintText: {
    fontSize: 12,
    color: "#a3214d",
    opacity: 0.7,
    marginTop: 4,
    fontStyle: "italic",
  },
  
  errorText: {
    fontSize: 12,
    color: "#ff5252",
    marginTop: 4,
  },
  
  successText: {
    fontSize: 12,
    color: "#4CAF50",
    marginTop: 4,
  },
  
  tipsContainer: {
    backgroundColor: "#fce4ec",
    borderRadius: 15,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  
  tipsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#a3214d",
    marginBottom: 12,
  },
  
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  
  tipText: {
    fontSize: 12,
    color: "#a3214d",
    marginLeft: 8,
    opacity: 0.9,
  },
  
  footer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fcfbfc",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  
  cancelButton: {
    flex: 1,
    backgroundColor: "#fce4ec",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#a3214d",
  },
  
  cancelButtonText: {
    color: "#a3214d",
    fontSize: 15,
    fontWeight: "bold",
  },
  
  confirmButton: {
    flex: 2,
    backgroundColor: "#a3214d",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginLeft: 8,
  },
  
  confirmButtonDisabled: {
    backgroundColor: "#e8c4d4",
    opacity: 0.7,
  },
  
  confirmButtonText: {
    color: "#fcfbfc",
    fontSize: 15,
    fontWeight: "bold",
  },
});