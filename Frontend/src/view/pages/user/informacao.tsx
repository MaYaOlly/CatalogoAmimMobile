import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, Linking, Clipboard, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../../navigation/types";
import { SafeAreaView } from 'react-native-safe-area-context';

//import { ScrollView } from "react-native/types_generated/index";


type QuemSomosNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'QuemSomos'
>;

type Props = {
  navigation: QuemSomosNavigationProp;
};

export const QuemSomos = ({ navigation }: Props) => {
  const copiarParaAreaTransferencia = (text: string) => {
    Clipboard.setString(text);
    Alert.alert("Copiado!", "Texto copiado para área de tranferência.");
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfbfc'  }}edges={['bottom']}>
    <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}>
      {/* RETÂNGULO INFORMATIVO */}
      <View style={styles.infoBox}>
        <Image source={require("../../../../assets/logo/logo3.png")} style={styles.logo} />
        <Text style={styles.infoText}>
          Amim Doces e Salgados – A confeitaria mais querida de Piripiri! Especialistas em bolos confeitados para aniversários e eventos, a Amim também conquista pelo sabor irresistível de seus salgados, feitos com todo carinho e qualidade para tornar qualquer comemoração ainda mais especial. {'\n'}{'\n'}

          Seja para celebrar momentos importantes ou adoçar o seu dia, cada produto é preparado de forma artesanal, com atenção aos detalhes e muito sabor.{'\n'}
          Nossa missão é levar alegria e sabor para a sua mesa, com produtos que encantam os olhos e o paladar. Venha nos visitar e descubra por que somos a escolha favorita da comunidade!
        </Text>
        
        {/* BOTÕES SOCIAIS */}
        <View style={styles.socialContainer}>
          {/* WhatsApp */}
          <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL("https://api.whatsapp.com/send/?phone=5586999183229&text&type=phone_number&app_absent=0")}>
            <Ionicons name="logo-whatsapp" size={40} color="#fcfbfc" />
            <Text style={styles.socialText}>WhatsApp</Text>
          </TouchableOpacity>

          {/* Instagram */}
          <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL("https://www.instagram.com/amimdocesesalgados?igsh=MTU1M3VrZzN3NXJzcg==")}>
            <Ionicons name="logo-instagram" size={40} color="#fcfbfc" />
            <Text style={styles.socialText}>Instagram</Text>
            
          </TouchableOpacity>

          {/* Localização */}
          <TouchableOpacity style={styles.socialButton} onPress={() => Linking.openURL("https://maps.app.goo.gl/9A1yX5W6CuFWmz7w9?g_st=aw")}>
            <Ionicons name="location" size={40} color="#fcfbfc" />
            <Text style={styles.socialText}>Localização</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fcfbfc", 
    paddingHorizontal: 16,
    //paddingTop: 10,
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  logo: {
    width: 220,
    height: 120,
    alignSelf: "center",
    marginBottom: 20, 
    marginTop:-20,
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#fcfbfc",
    padding: 14,
    //borderRadius: 20,
    marginBottom: 12,
    paddingHorizontal: 5,
  },
  infoText: {
    fontSize: 18,
    color: "#a3214d", 
    textAlign: "justify",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 5, // Adicionado para dar um pouco de espaçamento nas laterais
  
  },
  socialButton: {
    flex: 1,
    backgroundColor: "#f06292",
    marginHorizontal: 8,
    marginTop: 20,
    height: 90,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  socialText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fcfbfc", 
    textAlign: "center",
    marginTop: 5, 
  },
 
});
export default QuemSomos;