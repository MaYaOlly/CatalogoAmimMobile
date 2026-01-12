import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FloatingInput } from "../../components/TextoFlutuante";
import { SafeAreaView } from 'react-native-safe-area-context';

type TelaDeCadastroNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CadastrarUsuário'
>;

type Props = {
  navigation: TelaDeCadastroNavigationProp;
};

const TelaDeCadastro = ({ navigation }: Props) => {

  //Serve para colocar o olhinho no input de senha:
  const [senhaVisivel, setSenhaVisivel] = React.useState(false);

  // serve para mudar a cor  do botão clicável
  const [pressionado2, setPressionado2] = React.useState(false); 

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfbfc'  }}>
    <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}>
      <Text style ={styles.texto}>Insira as seguintes informações para criar uma conta</Text>
      <FloatingInput label="Nome" />
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


      <View style={styles.containerSenha}>
        <TextInput
          style={styles.inputSenha}
          placeholder="Confirmar senha"
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

      <FloatingInput label="Endereço" />  
     <FloatingInput label="Telefone" /> 

<TouchableOpacity
  style={[
    styles.botao2,
    pressionado2 && styles.botaoPressionado2
  ]}
  activeOpacity={0.8}
  onPressIn={() => setPressionado2(true)}
  onPressOut={() => setPressionado2(false)}
  onPress={() => navigation.replace('Home')}
>
  <Text style={styles.textoDoBotao}>CADASTRAR</Text>
</TouchableOpacity>

    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fcfbfc',
    alignItems:"center",
    paddingTop: 20,
  },
  texto: {
    color:"#a3214d",
    fontWeight:"bold",
    padding:20,
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
  botao2: {
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
    position:"absolute",
    bottom:30,

  },
  textoDoBotao: {
    fontWeight: 'bold',
    color: "#ffffff",
  },
  botaoPressionado2: {
    backgroundColor: "#ff9ebf",
  },
  textoSeletorDeIdade: {
    color: '#a3214d',
    opacity: 0.6,
    fontWeight: 'bold',
  },
  textoData: {
    color: '#a3214d',
    fontWeight: 'bold',
  },
  containerGenero: {
    width: '95%',
    backgroundColor: '#fce4ec',
    borderRadius: 20,
    marginTop: 5,
    paddingVertical: 5,
  },
  opcaoGenero: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  textoGenero: {
    color: '#a3214d',
    fontWeight: 'bold',
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

export default TelaDeCadastro;
