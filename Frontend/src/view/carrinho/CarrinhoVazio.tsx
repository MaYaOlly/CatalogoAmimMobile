import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Pressable } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../navigation/types";

type CarrinhoVazioNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CarrinhoVazio'
>;

type Props = {
  navigation: CarrinhoVazioNavigationProp;
};

export const TelaDeCarrinhoVazio = ({ navigation }: Props) => {
  // serve para mudar a cor  do botão clicável
  const [pressionado2, setPressionado2] = React.useState(false); 
  const [pressionado4, setPressionado4] = React.useState(false);
  return (
    <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}>
      <Image 
        source={require("../../../assets/logo/logo3.png")}
        style={styles.logo}
      />
      <Text style={styles.texto}>Você não tem nenhum pedido</Text>
      <View style={styles.balao}>
        <Text style={styles.textoDoBalao}>Seus pedidos vão aparecer aqui quando você fizer.</Text>
        </View>
        <TouchableOpacity 
          style={[ styles.botao4, pressionado4 && styles.botaoPressionado4
          ]}
            activeOpacity={0.8}
            onPressIn={() => setPressionado4(true)}
            onPressOut={() => setPressionado4(false)}
            onPress={() => navigation.navigate('CarrinhoCheio')}
        >
        <Text style={styles.textoDoBotao}>TESTE P/ AVANÇAR TELAS </Text>
        </TouchableOpacity>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fcfbfc',
    alignItems:"center",
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  logo: {
    width: 120,
    height: 60,
  },
  texto: {
    color:"#a3214d",
    fontWeight:"bold",
    paddingTop:"10%",
    paddingBottom:"4%",
    fontSize:20,
  },
  balao: {
    backgroundColor: '#fce4ec',
    borderRadius: 30,
    paddingVertical: "12%",
    paddingHorizontal: "7%",
    width: '95%',
    alignItems: 'center',
    
  },
  textoDoBalao: {
    color: '#a3214d',
    fontSize: 16,
    textAlign: 'center',
  },
  botao4: {
    backgroundColor: "red", 
    width: "95%",
    height:"8%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    marginBottom: 20,
    marginTop:80,
  },
  botaoPressionado4: {
    backgroundColor: "#ff9ebf",
  },
  textoDoBotao: {
    fontWeight: 'bold',
    color: "#ffffff",
    textAlign:"justify",
  },
  
});

export default TelaDeCarrinhoVazio;
