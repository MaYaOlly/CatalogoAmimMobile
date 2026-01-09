import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type TelaDeCheckout1NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TelaDeCheckout1'
>;

type Props = {
  navigation: TelaDeCheckout1NavigationProp;
};

export const TelaDeCheckout1 = ({ navigation }: Props) => {

  

  // serve para mudar a cor  do botão clicável
  const [pressionado2, setPressionado2] = React.useState(false); 

  return (
    <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}>
      <Text style ={styles.texto}>Insira as seguintes informações para criar uma conta</Text>
      <TextInput
        style={styles.textInput}
          placeholder='Nome'
          placeholderTextColor={"#a3214d"}>
      </TextInput>
      <TextInput 
        style={styles.textInput} 
          placeholder='E-mail'
          placeholderTextColor="#a3214d">
      </TextInput>
  <View style={styles.containerSenha}>
  

  
</View>

<TouchableOpacity
  style={[
    styles.botao2,
    pressionado2 && styles.botaoPressionado
  ]}
  activeOpacity={0.8}
  onPressIn={() => setPressionado2(true)}
  onPressOut={() => setPressionado2(false)}
  onPress={() => navigation.replace('TelaDeCheckout2')}
>
  <Text style={styles.textoDoBotao}>Criar uma nova conta</Text>
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

export default TelaDeCheckout1;
