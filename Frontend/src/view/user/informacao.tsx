import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, Linking, Clipboard, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Informacao() {
  const navigation = useNavigation();

  const copiarParaAreaTransferencia = (text: string) => {
    Clipboard.setString(text);
    Alert.alert("Copiado!", "Texto copiado para área de tranferência.");
  };

  function handlePress(option: string) {
    if (option === "WhatsApp") {
      Alert.alert(
        "WhatsApp",
        " +55 (86) 9 9918-3229\n\nEntre em contato conosco para encomendas.",
        [
          { text: "Fechar", style: "cancel" },
          {
            text: "Copiar Número",
            onPress: () => copiarParaAreaTransferencia("+55 (86) 9 9918-3229")
          },
        ]
      );
    } else if (option === "Instagram") {
      Alert.alert(
        "Instagram",
        "@amimdocesesalgados\n\nAcompanhe nossas novidades, bolos e promoções ",
        [
          { text: "Fechar", style: "cancel" },
          {
            text: "Abrir Instagram",
            onPress: () => Linking.openURL("https://www.instagram.com/amimdocesesalgados?igsh=MTU1M3VrZzN3NXJzcg==")
          }
        ]
      );
    } else if (option === "Localização") {
      Alert.alert(
        "Localização",
        "Av. João Bandeira Monte\n, Nº 637 - Recreio\nPiripiri - PI, 64260-000",
        [
          { text: "Fechar", style: "cancel" },
          {
            text: "Copiar Endereço",
            onPress: () => Linking.openURL("https://share.google/58bQGRW5QQf07pMLv")
          },
        ]
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER COM BOTÃO VOLTAR */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Informações</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* RETÂNGULO INFORMATIVO */}
      <View style={styles.infoBox}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.infoText}>
          Amim Doces e Salgados – A confeitaria mais querida de Piripiri! Especialistas em bolos confeitados para aniversários e eventos, a Amim também conquista pelo sabor irresistível de seus salgados, feitos com todo carinho e qualidade para tornar qualquer comemoração ainda mais especial. {'\n'}{'\n'}

          Seja para celebrar momentos importantes ou adoçar o seu dia, cada produto é preparado de forma artesanal, com atenção aos detalhes e muito sabor.{'\n'}
          Nossa missão é levar alegria e sabor para a sua mesa, com produtos que encantam os olhos e o paladar. Venha nos visitar e descubra por que somos a escolha favorita da comunidade!
        </Text>
        
        {/* BOTÕES SOCIAIS */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={() => handlePress("WhatsApp")}>
            <Ionicons name="logo-whatsapp" size={40} color="#fcfbfc" />
            <Text style={styles.socialText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={() => handlePress("Instagram")}>
            <Ionicons name="logo-instagram" size={40} color="#fcfbfc" />
            <Text style={styles.socialText}>Instagram</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={() => handlePress("Localização")}>
            <Ionicons name="location" size={40} color="#fcfbfc" />
            <Text style={styles.socialText}>Localização</Text>
          </TouchableOpacity>
        </View>
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
  logo: {
    width: 150,
    height: 100,
    alignSelf: "center",
    marginBottom: 10 
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#fce4ec",
    padding: 14,
    borderRadius: 20,
    margin: 16,
    marginTop: 20,
  },
  infoText: {
    fontSize: 17,
    color: "#a3214d", 
    textAlign: "justify",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: "auto",
    paddingHorizontal: 10,
  },
  socialButton: {
    flex: 1,
    backgroundColor: "#f06292",
    marginHorizontal: 8,
    height: 90,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  socialText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fcfbfc", 
    textAlign: "center",
    marginTop: 5, 
  },
});