import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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

  // Serve para colocar o seletor de data de nascimento do usuário:
  const [dataNascimento, setDataNascimento] = React.useState<Date | null>(null);
  const [mostrarPicker, setMostrarPicker] = React.useState(false);

  function aoMudarData(event: any, dataSelecionada?: Date) {
    setMostrarPicker(false);
  
    if (dataSelecionada) {
      setDataNascimento(dataSelecionada);
    }
  }
  // Serve para colocar o seletor de gênero:
  const [genero, setGenero] = React.useState<string | null>(null);
  const [mostrarGenero, setMostrarGenero] = React.useState(false);


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
     
      <TouchableOpacity
  style={styles.textInput}
  onPress={() => setMostrarPicker(true)}
>
  <Text style={dataNascimento ? styles.textoData : styles.textoSeletorDeIdade}>
    {dataNascimento
      ? dataNascimento.toLocaleDateString('pt-BR')
      : 'dd/mm/aaaa'}
  </Text>
</TouchableOpacity>

      {mostrarPicker && (
        <DateTimePicker
          value={dataNascimento || new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()} // impede datas futuras
          onChange={aoMudarData}
      />
)}

<TouchableOpacity
  style={styles.textInput}
  onPress={() => setMostrarGenero(!mostrarGenero)}
>
  <Text
    style={{
      color: genero ? '#a3214d' : '#a3214d80',
      fontWeight: 'bold',
    }}
  >
    {genero ? genero : 'Gênero'}
  </Text>
</TouchableOpacity>

{mostrarGenero && (
  <View style={styles.containerGenero}>
    {['Masculino', 'Feminino', 'Outro'].map(item => (
      <TouchableOpacity
        key={item}
        style={styles.opcaoGenero}
        onPress={() => {
          setGenero(item);
          setMostrarGenero(false);
        }}
      >
        <Text style={styles.textoGenero}>{item}</Text>
      </TouchableOpacity>
    ))}
  </View>
)}

<TouchableOpacity
  style={[
    styles.botao2,
    pressionado2 && styles.botaoPressionado
  ]}
  activeOpacity={0.8}
  onPressIn={() => setPressionado2(true)}
  onPressOut={() => setPressionado2(false)}
  onPress={() => navigation.replace('Home')}
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

export default TelaDeCadastro;
