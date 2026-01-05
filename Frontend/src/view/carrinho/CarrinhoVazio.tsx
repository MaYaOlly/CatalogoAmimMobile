import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Pressable } from 'react-native';

const CarrinhoVazio = () => {
  return (
    <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}>
      <Image 
        source={require("../../../assets/logo3.png")}
        style={styles.logo}
      />
      <Text style={styles.texto}>Você não tem nenhum pedido</Text>
      <View style={styles.balao}>
        <Text style={styles.textoDoBalao}>Seus pedidos vão aparecer aqui quando você fizer.</Text>
        </View>

      
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

  
});

export default CarrinhoVazio;
