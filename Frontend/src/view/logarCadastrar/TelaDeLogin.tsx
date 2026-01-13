//import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLoginViewModel } from '../../ViewModel/useLoginViewModel';

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
    const sucesso = await realizarLogin();
    if (sucesso) {
      navigation.replace('Home');
    }
  };
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
  <Text style={styles.textoDoBotao}>Criar uma nova conta</Text>
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
    marginBottom:30,
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
  botaoDesabilitado: {
    backgroundColor: "#ffb3d1",
    opacity: 0.7,
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
