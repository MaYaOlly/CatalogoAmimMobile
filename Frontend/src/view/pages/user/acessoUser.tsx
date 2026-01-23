import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView} from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../../navigation/types";
import { useAcessoUserViewModel } from "../../../ViewModel/useAcessoUserViewModel";
import { SafeAreaView } from 'react-native-safe-area-context';

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

  // Estado para os dados do usuário
  const [userInfo, setUserInfo] = useState({
    telefone: "(11) 99999-9999",
    nome: "João Silva",
    email: "joao.silva@email.com",
    endereço: "Rua Felinto Resende, 123 - Piripiri, PI",
  });
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={require("../../../../assets/logo/logo3.png")} style={styles.logo}/>
        
        {/* LISTA DE OPÇÕES */}
        <View style={styles.areaDoTextoSolto}>
          <Text style ={styles.texto}>Informações do usuário</Text>
        </View>
        {/* LISTA DE INFORMAÇÕES DO USUÁRIO */}
        <View style={styles.infoSection}>
          {/*<Text style={styles.sectionTitle}>Informações Pessoais</Text>*/}
          
          <View style={styles.infoItem}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nome</Text>
              <Text style={styles.infoValueNome}>{userInfo.nome}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>E-mail</Text>
              <Text style={styles.infoValueEmail}>{userInfo.email}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Endereço</Text>
              <Text style={styles.infoValueEndereco}>{userInfo.endereço}</Text>
            </View>
          </View>
        </View>
        <View style={styles.areaDoTextoSolto2}>
          <Text style ={styles.texto2}>Informações da empresa</Text>
        </View>
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
    backgroundColor: "transparent", 
    paddingVertical: 10,
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
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#a3214d",
    padding: 22,
    paddingVertical:12,
    borderRadius: 30,
    marginHorizontal: 16,
    marginBottom: 16,
    justifyContent:"center",

  },

  TextoDoBotaoDeSair: {
    color: "#a3214d",
    fontSize: 16,
    fontWeight: "500",
  },

  icon: {
    width: 34,
    height: 34,
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
    
  },
  botao4: {
    width: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop:-10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  nomeDoMeioDePagamento:{
    color: "#a3214d",
    fontWeight: "bold",
    fontSize: 16,  
  },
  containerEsquerdo2:{
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center', 
  },
  containerDireito2:{
    backgroundColor: 'transparent',
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
  areaDoTextoSolto:{
    alignSelf: 'flex-start',
    paddingBottom:10,
  },
  texto: {
    color:"#a3214d",
    fontWeight:"bold",
  },
  areaDoTextoSolto2:{
    alignSelf: 'flex-start',
    paddingBottom:20,
  },
  texto2: {
    color:"#a3214d",
    fontWeight:"bold",
  },
  infoSection: {
    marginBottom: 24,
    width: "100%", 
    backgroundColor: '#fce4ec',
    borderRadius: 30,
    padding: 16,
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#a3214d",
    marginBottom: 16,
    marginLeft: 8,
  },
  
  infoItem: {
    backgroundColor: "#fce4ec",
    marginBottom: 10,

  },
  
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  infoLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#a3214d",
  },

  infoValue: {
    fontSize: 16,
    fontWeight: "400",
    color: "#a97989",
    flex: 1,
    marginLeft:25,
    
  },
  infoValueNome: {
    fontSize: 16,
    fontWeight: "700",
    color: "#a97989",
    flex: 1,
    marginLeft: 40,
  },
  infoValueEmail: {
    fontSize: 16,
    fontWeight: "400",
    color: "#a97989",
    flex: 1,
    marginLeft:40,
  },
  infoValueEndereco: {
    fontSize: 16,
    fontWeight: "400",
    color: "#a97989",
    flex: 1,
    marginLeft:16,
  },

});
export default TelaDeConfiguracao;