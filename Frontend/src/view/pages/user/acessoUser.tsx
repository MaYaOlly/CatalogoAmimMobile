import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView} from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../../navigation/types";
import { useAcessoUserViewModel } from "../../../ViewModel/useAcessoUserViewModel";

type TelaDeConfiguracaoNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TelaDeConfiguracao'
>;

type Props = {
  navigation: TelaDeConfiguracaoNavigationProp;
};

export const TelaDeConfiguracao = ({ navigation }: Props) => {
  const {
    dadosUsuario,
    estaLogado,
    pressionado4,
    pressionado3,
    pressionado2,
    pressionadoLogin,
    setPressionado4,
    setPressionado3,
    setPressionado2,
    setPressionadoLogin,
    handleLogout,
  } = useAcessoUserViewModel();

  // Função para confirmar e realizar logout
  async function confirmarLogout() {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            const resultado = await handleLogout();
            if (!resultado.sucesso) {
              Alert.alert("Erro", resultado.mensagem);
            }
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={require("../../../../assets/logo/logo3.png")} style={styles.logo}/>
        
        {/* LISTA DE OPÇÕES */}
        
          <TouchableOpacity
            style={[ styles.botao4, pressionado4 && styles.botaoPressionado4
            ]}
              activeOpacity={0.8}
              onPressIn={() => setPressionado4(true)}
              onPressOut={() => setPressionado4(false)}
              onPress={() => navigation.navigate('TelaDePerfil')}
                  >
          <View style={styles.balao}>
              <View style={styles.iconeETexto}>
                <Image
                  source={require("../../../../assets/icons/user.png")}
                  style={styles.figura1}
                />
                  <View style={styles.areaDoTexto}>
                    <Text style={styles.nomeDoMeioDePagamento}>Dados da conta</Text>
                  </View>
               </View>
          </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[ styles.botao4, pressionado3 && styles.botaoPressionado4
            ]}
              activeOpacity={0.8}
              onPressIn={() => setPressionado3(true)}
              onPressOut={() => setPressionado3(false)}
              onPress={() => navigation.navigate('TelaDeNotificacoes')}
                  >
          <View style={styles.balao}>
              <View style={styles.iconeETexto}>
                <Image
                  source={require("../../../../assets/icons/sino.png")}
                  style={styles.figura1}
                />
                  <View style={styles.areaDoTexto}>
                    <Text style={styles.nomeDoMeioDePagamento}>Notificações</Text>
                  </View>
               </View>
          </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[ styles.botao4, pressionado2 && styles.botaoPressionado4
            ]}
              activeOpacity={0.8}
              onPressIn={() => setPressionado2(true)}
              onPressOut={() => setPressionado2(false)}
              onPress={() => navigation.navigate('QuemSomos')}
                  >
          <View style={styles.balao}>
              <View style={styles.iconeETexto}>
                <Image
                  source={require("../../../../assets/icons/information.png")}
                  style={styles.figura1}
                />
                  <View style={styles.areaDoTexto}>
                    <Text style={styles.nomeDoMeioDePagamento}>Quem somos</Text>
                  </View>
               </View>
          </View>
          </TouchableOpacity>

      </ScrollView>

      {/* BOTÃO LOGIN ou SAIR (FIXO NO FINAL) */}
      <View style={styles.footer}>
        {estaLogado ? (
          // Botão de SAIR se estiver logado
          <TouchableOpacity style={styles.BotaodeSair} onPress={confirmarLogout}>
            <View style={styles.DetalhesDoBotaodeSair}>
              <View style={styles.containerEsquerdo2}>
                <Image source={require("../../../../assets/icons/saida.png")} style={styles.icon}/>
                <Text style={styles.TextoDoBotaoDeSair}>Sair</Text>
              </View>
              <View style={styles.containerDireito2}>
                <Image source={require("../../../../assets/icons/seta.png")} style={styles.icon2}/>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          // Botão de LOGIN se NÃO estiver logado
          <TouchableOpacity 
            style={[styles.BotaodeSair]} 
            onPressIn={() => setPressionadoLogin(true)}
            onPressOut={() => setPressionadoLogin(false)}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <View style={styles.DetalhesDoBotaodeSair}>
              <View style={styles.containerEsquerdo2}>
                <Image source={require("../../../../assets/icons/user.png")} style={styles.icon}/>
                <Text style={styles.TextoDoBotaoDeSair}>Entrar</Text>
              </View>
              <View style={styles.containerDireito2}>
                <Image source={require("../../../../assets/icons/seta.png")} style={styles.icon2}/>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fcfbfc',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
    width:"100%",
    alignItems:"center",
  },

  logo: {
    width: 120,
    height: 60,
    marginBottom: "10%",
  },

  DetalhesDoBotaodeSair: {
    backgroundColor: "#fce4ec", 
    paddingVertical: 25,
    borderRadius: 30,
    
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-between",
  },

  optionText: {
    fontSize: 16,
    color: "#a3214d",
    fontWeight: "bold",
  },

  BotaodeSair: {
    backgroundColor: "#fce4ec",
    padding: 22,
    borderRadius: 30,
    marginHorizontal: 16,
    marginBottom: 16,
    justifyContent:"center",
  },

  TextoDoBotaoDeSair: {
    color: "#a3214d",
    fontSize: 16,
  },

  icon: {
    width: 44,
    height: 44,
    marginRight: 25,
  },
  icon2: {
    width: 25,
    height: 25,

  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 34,
  },

  footer: {
    backgroundColor: "#fcfbfc",
    paddingTop: 8,
    
  },
  botao4: {
    width: '105%',
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom:20,
    marginTop:-10,
  },
  
  botaoPressionado4: {
    backgroundColor: "#ff9ebf",
  },
  
  textoDoBotao: {
    fontWeight: 'bold',
    color: "#ffffff",
    textAlign:"justify",
  },
  balao: {
    backgroundColor: '#fce4ec',
    borderRadius: 30,
    paddingVertical: 24,
    //marginBottom:20,
    flexDirection: 'row',
    alignItems: 'center',
    //marginTop:-10,
  },
  
  nomeDoMeioDePagamento:{
    color: "#a3214d",
    fontWeight: "bold",
    fontSize: 16,  
  },
  containerEsquerdo2:{
    backgroundColor: '#fce4ec',
    flexDirection: 'row',
    alignItems: 'center', // 🔥 ícone e texto alinhados no meio
  },
  containerDireito2:{
    backgroundColor: '#fce4ec',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeETexto:{

    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

 areaDoTexto:{
  flex: 1,
  marginLeft: 16,
},
  figura1:{
    width: 25,
    height: 25,
  },

});
export default TelaDeConfiguracao;