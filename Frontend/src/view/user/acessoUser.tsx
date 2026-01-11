import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView,SafeAreaView} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function AcessoUser() {
  const navigation = useNavigation<NavigationProp>();

  // Funções de navegação para telas específicas
  const irParaPerfil = () => {
    navigation.navigate('Perfil')
  };

  const irParaTrocarSenha = () => {
    navigation.navigate('TrocarSenha');
  };

  const irParaNotificacoes = () => {
    navigation.navigate('Notificacao');
  };

  const irParaInformacoes = () => {
    navigation.navigate('Informacao');
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair da conta",
      "Deseja realmente sair?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Sair", 
          onPress: () => {
            // Navega de volta para TelaInicial e reseta a pilha
            navigation.reset({
              index: 0,
              routes: [{ name: 'TelaInicial' }],
            });
          }
        }
      ]
    );
  };

  // Botão de voltar
  const voltarParaInicio = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER COM BOTÃO VOLTAR */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={voltarParaInicio} 
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* LOGO */}
        <Image 
          source={require("../assets/logo.png")} 
          style={styles.logo}
        />
        
        {/* INFORMAÇÕES DO USUÁRIO */}
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
          </View>
          <Text style={styles.userName}>Usuário Convidado</Text>
          <Text style={styles.userEmail}>usuario@exemplo.com</Text>
        </View>

        {/* LISTA DE OPÇÕES */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.optionButton} 
            onPress={irParaPerfil}
          >
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Meu Perfil</Text>
            </View>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionButton} 
            onPress={irParaTrocarSenha}
          >
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Trocar Senha</Text>
            </View>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionButton} 
            onPress={irParaNotificacoes}
          >
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Notificações</Text>
            </View>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionButton} 
            onPress={irParaInformacoes}
          >
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Informações do App</Text>
            </View>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* BOTÃO SAIR */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <View style={styles.logoutRow}>
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </View>
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
  logo: {
    width: 120,
    height: 60,
    alignSelf: "center",
    marginBottom: 24,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fce4ec",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#a3214d',
  },
  avatarText: {
    fontSize: 36,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#a3214d",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#a3214d",
    opacity: 0.8,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: "#fce4ec", 
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#a3214d",
    fontWeight: "bold",
  },
  optionArrow: {
    fontSize: 20,
    color: "#a3214d",
    fontWeight: "bold",
  },
  versionContainer: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 12,
    color: "#a3214d",
    opacity: 0.6,
  },
  footer: {
    backgroundColor: "#fcfbfc",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  logoutButton: {
    backgroundColor: "#fce4ec",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoutRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  logoutText: {
    color: "#a3214d",
    fontSize: 16,
    fontWeight: "bold",
  },
});