//import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLoginViewModel } from '../../../ViewModel/useLoginViewModel';

type TelaDeLoginNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: TelaDeLoginNavigationProp;
};

const TelaDeLogin = ({ navigation }: Props) => {
  // ViewModel
  const {
    email,
    senha,
    senhaVisivel,
    carregando,
    emailComErro,
    senhaComErro,
    mensagemErro,
    setEmail,
    setSenha,
    toggleSenhaVisivel,
    realizarLogin
  } = useLoginViewModel();

  // serve para mudar a cor do botão clicável
  const [pressionado, setPressionado] = React.useState(false);
  const [pressionado2, setPressionado2] = React.useState(false);

  // Função para lidar com o login
  const handleLogin = async () => {
    const resultado = await realizarLogin();
    
    if (resultado.sucesso) {
      // Login bem-sucedido - navega para Home
      navigation.replace('Home');
    }
    // Se falhou, o erro já está visível na tela via mensagemErro
  };
  return (
    
<SafeAreaView style={{ flex: 1, backgroundColor: '#fcfbfc'  }}>
  <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}
  >
      <Image 
        source={require("../../../../assets/logo/logo3.png")}
        style={styles.logo}
      />
      
      {mensagemErro ? (
        <View style={styles.containerErro}>
          <Text style={styles.textoErro}>{mensagemErro}</Text>
        </View>
      ) : null}
      
      <TextInput
        style={[styles.textInput, emailComErro && styles.inputComErro]}
        placeholder="E-mail"
        placeholderTextColor="#a3214d"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!carregando}
      />

      <View style={[styles.containerSenha, senhaComErro && styles.inputComErro]}>
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

      <TouchableOpacity
        style={[
          styles.botao,
          pressionado && styles.botaoPressionado,
          carregando && styles.botaoDesabilitado
        ]}
        activeOpacity={0.8}
        onPressIn={() => setPressionado(true)}
        onPressOut={() => setPressionado(false)}
        onPress={handleLogin}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.textoDoBotao}>ENTRAR</Text>
        )}
      </TouchableOpacity>
      </ScrollView>



      <View style={styles.areaDoBotao}>
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
</View>

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
    height:"9%",
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
    height:56,
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
  botaoDesabilitado: {
    backgroundColor: "#ffb3d1",
    opacity: 0.7,
  },
  areaDoBotao:{
    //paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fcfbfc',
    alignItems: "center",
    justifyContent: "center",
  },
  botao2: {
    backgroundColor: "#fcfbfc", 
    width: "95%",
    height:56,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    //shadowColor: "#000",
    //shadowOffset: { width: 0, height: 4 },
    //shadowOpacity: 0.2,
    //shadowRadius: 5,
    //elevation: 6,
    //marginTop: 55,
    //position:"absolute",
    //bottom:30,
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
    height: '9%',
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
  inputComErro: {
    borderWidth: 2,
    borderColor: '#ff0000',
    backgroundColor: '#ffe6e6',
  },
  containerErro: {
    width: '95%',
    backgroundColor: '#ffebee',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ff0000',
  },
  textoErro: {
    color: '#c62828',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default TelaDeLogin;
