//import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FloatingInput } from "../../components/TextoFlutuante";

type TelaDeLoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: TelaDeLoginNavigationProp;
};

const TelaDeLogin = ({ navigation }: Props) => {
  //Serve para colocar o olhinho no input de senha:
  const [senhaVisivel, setSenhaVisivel] = React.useState(false);

  // serve para mudar a cor do botão clicável
  const [pressionado, setPressionado] = React.useState(false);
  const [pressionado2, setPressionado2] = React.useState(false);
  return (
    
<SafeAreaView style={{ flex: 1, backgroundColor: '#fcfbfc'  }}>
  <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}
  >
      <Image 
        source={require("../../../assets/logo/logo3.png")}
        style={styles.logo}
      />
      <FloatingInput label="E-mail" />
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
  onPress={() => navigation.replace('Home')}

>
  <Text style={styles.textoDoBotao}>ENTRAR</Text>
</TouchableOpacity>

<TouchableOpacity
  style={[
    styles.botao2,
    pressionado2 && styles.botaoPressionado2
  ]}
  activeOpacity={0.8}
  onPressIn={() => setPressionado2(true)}
  onPressOut={() => setPressionado2(false)}
  onPress={() => navigation.replace('Cadastrar')}
>
  <Text style={styles.textoDoBotao2}>Criar uma nova conta</Text>
</TouchableOpacity>
      
</ScrollView>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfbfc',
    alignItems:"center",
    paddingTop:20,
  },
  logo: {
    width: 220,
    height: 120,
    marginBottom:132,
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
    backgroundColor: "#ff4da6", 
    width: "95%",
    height:"10%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    marginTop: 5,
  },
  botao2: {
    backgroundColor: "#fcfbfc", 
    width: "95%",
    height:"10%",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    //shadowColor: "#000",
    //shadowOffset: { width: 0, height: 4 },
    //shadowOpacity: 0.2,
    //shadowRadius: 5,
    //elevation: 6,
    //marginTop: 55,
    position:"absolute",
    bottom:30,
    borderWidth:2,
    borderColor:"#a3214d",

  },

  textoDoBotao: {
    fontWeight: 'bold',
    color: "#ffffff",

  },
  textoDoBotao2: {
    fontWeight: 'bold',
    color: "#a3214d",
  },
  botaoPressionado: {
    backgroundColor: "#ff9ebf",
  },
  botaoPressionado2: {
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
