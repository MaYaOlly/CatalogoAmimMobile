import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCadastroViewModel } from '../../ViewModel/useCadastroViewModel';

type TelaDeCadastroNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CadastrarUsuário'
>;

type Props = {
  navigation: TelaDeCadastroNavigationProp;
};

const TelaDeCadastro = ({ navigation }: Props) => {
  // ViewModel
  const {
    nome,
    email,
    senha,
    confirmarSenha,
    endereco,
    telefone,
    senhaVisivel,
    carregando,
    setNome,
    setEmail,
    setSenha,
    setConfirmarSenha,
    setEndereco,
    setTelefone,
    toggleSenhaVisivel,
    cadastrarUsuario
  } = useCadastroViewModel();

  // serve para mudar a cor  do botão clicável
  const [pressionado2, setPressionado2] = React.useState(false);

  // Função para lidar com o cadastro
  const handleCadastro = async () => {
    const sucesso = await cadastrarUsuario();
    if (sucesso) {
      navigation.replace('Home');
    }
  }; 

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfbfc'  }}>
    <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}>
      <Text style ={styles.texto}>Insira as seguintes informações para criar uma conta</Text>
      
      <TextInput
        style={styles.textInput}
        placeholder="Nome"
        placeholderTextColor="#a3214d"
        value={nome}
        onChangeText={setNome}
        editable={!carregando}
      />

      <TextInput
        style={styles.textInput}
        placeholder="E-mail"
        placeholderTextColor="#a3214d"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!carregando}
      />

      <View style={styles.containerSenha}>
        <TextInput
          style={styles.inputSenha}
          placeholder="Senha"
          placeholderTextColor="#a3214d"
          secureTextEntry={!senhaVisivel}
          value={senha}
          onChangeText={setSenha}
          editable={!carregando}
        />

        <TouchableOpacity
          onPress={toggleSenhaVisivel}
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
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          editable={!carregando}
        />

        <TouchableOpacity
          onPress={toggleSenhaVisivel}
          style={styles.botaoOlho}
        >
          <Ionicons
            name={senhaVisivel ? 'eye-off' : 'eye'}
            size={22}
            color="#a3214d"
          />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Endereço"
        placeholderTextColor="#a3214d"
        value={endereco}
        onChangeText={setEndereco}
        editable={!carregando}
      />

      <TextInput
        style={styles.textInput}
        placeholder="Telefone"
        placeholderTextColor="#a3214d"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        editable={!carregando}
      />

      <TouchableOpacity
        style={[
          styles.botao2,
          pressionado2 && styles.botaoPressionado2,
          carregando && styles.botaoDesabilitado
        ]}
        activeOpacity={0.8}
        onPressIn={() => setPressionado2(true)}
        onPressOut={() => setPressionado2(false)}
        onPress={handleCadastro}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.textoDoBotao}>CADASTRAR</Text>
        )}
      </TouchableOpacity>

    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  botaoDesabilitado: {
    backgroundColor: "#ffb3d1",
    opacity: 0.7,
  },
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
