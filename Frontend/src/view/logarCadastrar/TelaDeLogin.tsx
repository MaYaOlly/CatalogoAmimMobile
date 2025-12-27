import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const TelaDeLogin = () => {
  //Serve para colocar o olhinho no input de senha:
  const [senhaVisivel, setSenhaVisivel] = React.useState(false);

  // serve para mudar a cor do botão clicável
  const [pressionado, setPressionado] = React.useState(false);
  const [pressionado2, setPressionado2] = React.useState(false);
  return (
    <View style={styles.container}>
      <Image 
        source={require("../../assets/logo3.png")}
        style={styles.logo}
      />
      <TextInput 
      style={styles.textInput} 
      placeholder='E-mail'
      placeholderTextColor="#a3214d">
      </TextInput>
      <View style={styles.containerSenha}>
  <TextInput
    style={styles.inputSenha}
    placeholder="Senha"
    placeholderTextColor="#a3214d"
    secureTextEntry={!senhaVisivel}
  />

  <TouchableOpacity
    onPress={() => setSenhaVisivel(!senhaVisivel)}
    style={styles.botaoOlho}
  >
    <Ionicons
      name={senhaVisivel ? 'eye-off' : 'eye'}
      size={22}
      color="#a3214d"
    />
  </TouchableOpacity>
</View>

      <TouchableOpacity
  style={[
    styles.botao,
    pressionado && styles.botaoPressionado
  ]}
  activeOpacity={0.8}
  onPressIn={() => setPressionado(true)}
  onPressOut={() => setPressionado(false)}
>
  <Text style={styles.textoDoBotao}>ENTRAR</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[
    styles.botao2,
    pressionado2 && styles.botaoPressionado
  ]}
  activeOpacity={0.8}
  onPressIn={() => setPressionado2(true)}
  onPressOut={() => setPressionado2(false)}
>
  <Text style={styles.textoDoBotao}>Criar uma nova conta</Text>
</TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfbfc',
    alignItems:"center",
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 150,
  },
  textInput: {
    width: "95%",
    height:"8%",
    backgroundColor: '#fce4ec',
    borderRadius: 30,
    padding: 20,
    marginVertical: 6,
    color: '#a3214d',
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: "#f06292", 
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
    marginTop: 20,
  },
  botao2: {
    backgroundColor: "#ff4da6", 
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
    marginTop: 20,
    
  },

  textoDoBotao: {
    fontWeight: 'bold',
    color: "#ffffff",
  },

  botaoPressionado: {
    backgroundColor: "#ff9ebf",
  },
  containerSenha: {
    width: '95%',
    height: '8%',
    backgroundColor: '#fce4ec',
    borderRadius: 30,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  inputSenha: {
    flex: 1,
    color: '#a3214d',
    fontWeight: 'bold',
  },
  
  botaoOlho: {
    paddingLeft: 10,
  },
});

export default TelaDeLogin;
