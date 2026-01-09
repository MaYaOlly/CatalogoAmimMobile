import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, Linking, Clipboard } from "react-native";

export default function SettingsScreen() {
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
            onPress: () => copiarParaAreaTransferencia(
              "+55 (86) 9 9918-3229"
            )
          },
        ]
    );
  }

  else if (option === "Instagram") {
    Alert.alert(
      "Instagram",
      "@amimdocesesalgados\n\nAcompanhe nossas novidades, bolos e promoções ",
      [
        { text: "Fechar", style: "cancel" },
        {
          text: "Abrir Instagram",
          onPress: () =>
            Linking.openURL("https://www.instagram.com/amimdocesesalgados?igsh=MTU1M3VrZzN3NXJzcg==")
        }
      ]
    );
  }

  else if (option === "Localização") {
    Alert.alert(
      "Localização",
      "Av. João Bandeira Monte\n, Nº 637 - Recreio\nPiripiri - PI, 64260-000",
      [
          { text: "Fechar", style: "cancel" },
          {
            text: "Copiar Endereço",
            onPress: () => (
              Linking.openURL("https://share.google/N8P8KyKMZfONjzSOQ")
            )
          },
        ]
    );
  }
}


  return (
    <View style={styles.container}>
      {/* RETÂNGULO INFORMATIVO */}
      <View style={styles.infoBox}>
        <Image source={require("../../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.infoText}>
          Amim Doces e Salgados – A confeitaria mais querida de Piripiri! Especialistas em bolos confeitados para aniversários e eventos, a Amim também conquista pelo sabor irresistível de seus salgados, feitos com todo carinho e qualidade para tornar qualquer comemoração ainda mais especial. {'\n'}{'\n'}

          Seja para celebrar momentos importantes ou adoçar o seu dia, cada produto é preparado de forma artesanal, com atenção aos detalhes e muito sabor.{'\n'}
          Nossa missão é levar alegria e sabor para a sua mesa, com produtos que encantam os olhos e o paladar. Venha nos visitar e descubra por que somos a escolha favorita da comunidade!

        </Text>
        
        {/* BOTÕES SOCIAIS */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={() => handlePress("WhatsApp")}>
            <View style={styles.socialButton}>
              <Image source={require("../../../assets/WhatsZapp.png")} style={styles.socialImage} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={() => handlePress("Instagram")}>
            <View style={styles.socialButton}>
              <Image source={require("../../../assets/instagram.png")} style={styles.socialImage} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={() => handlePress("Localização")}>
            <View style={styles.socialButton}>
              <Image source={require("../../../assets/Localização.png")} style={styles.socialImage} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfbfc", 
    paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: "space-between",
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
    marginBottom: 12,
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
    marginTop: "auto"
  },

  socialButton: {
    flex: 1,
    backgroundColor: "#f06292",
    marginHorizontal: 17,
    height: 70,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  socialText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fcfbfc", 
    textAlign: "center",
  },

  socialImage: {
    width: 40,
    height: 40,
  }
});
