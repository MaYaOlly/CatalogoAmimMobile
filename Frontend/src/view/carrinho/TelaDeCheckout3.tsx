import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';


type TelaDeCheckout3NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TelaDeCheckout3'
>;

type Props = {
  navigation: TelaDeCheckout3NavigationProp;
  
};

export const TelaDeCheckout3 = ({ navigation }: Props) => {

  // serve para mudar a cor  do botão clicável
  const [pressionadoBotaoContinuar, setPressionadoBotaoContinuar] = React.useState(false);
  const [pressionado2, setPressionado2] = React.useState(false); 
  const [pressionado3, setPressionado3] = React.useState(false); 
  const [pressionado4, setPressionado4] = React.useState(false); 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfbfc' }}>
    <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}>
    

    <View style={styles.balao}>
      <View style={styles.ConteudoDoBalao}>
    
        {/* Área do item 1*/}
          <View style={styles.areaDoNumero1}>
            <View style={styles.bolaDoNumero1}>
              <Text style ={styles.texto1}>1</Text>
            </View>
            <View style={styles.blocoDeTexto}>
              <Text style ={styles.textoDaEntrega}>Entrega</Text>
            </View>
          </View>
        {/* Área do item 2*/}
        <View style={styles.areaDoNumero2}>
            <View style={styles.bolaDoNumero2}>
              <Text style ={styles.texto2}>2</Text>
            </View>

            <View style={styles.blocoDeTexto}>
              <Text style ={styles.textoDoPagamento}>Pagamento</Text>
            </View>
          </View>
          {/* Área do item 3*/}
        <View style={styles.areaDoNumero3}>
            <View style={styles.bolaDoNumero3}>
              <Text style ={styles.texto2}>3</Text>
            </View>
            <View style={styles.blocoDeTexto}>
              <Text style ={styles.textoDaConfirmação}>Confirmação</Text>
            </View>
          </View>
        </View>
    </View>
    <View style={styles.areaDoTextoSolto}>
      <Text style ={styles.texto}>Dados do consumidor</Text>
    </View>
    <TouchableOpacity
                  style={[ styles.botao4, pressionado4 && styles.botaoPressionado4
                  ]}
                    activeOpacity={0.8}
                    onPressIn={() => setPressionado4(true)}
                    onPressOut={() => setPressionado4(false)}
                    onPress={() => navigation.navigate('TelaDeCheckout1')}
        >
    <View style={styles.areaDeDadosDoConsumidor}>
      <View style={styles.containerEsquerdo}>
      <View style={styles.areaDeNomeTelefoneIcone}>
        <Image
          source={require("../../../assets/icons/user.png")}
          style={styles.figura1}
        />
        <View style={styles.areaDeNomeTelefone}>
          <Text style={styles.nomeDoUsuario}>Maria Yasmin</Text>
          <Text style={styles.telefoneDoUsuario}>(86) 4002-8922</Text>
        </View>
      </View>

      <View style={styles.areaDeRuaBairroIcone}>
        <Image
          source={require("../../../assets/icons/casa.png")}
          style={styles.figura1}
        />
        <View style={styles.areaDeRuaBairro}>
          <Text style={styles.nomeDaRua}>Avenida tomaz rebelo, 636 B</Text>
          <Text style={styles.nomeDoBairro}>Centro, Piripiri</Text>
        </View>
      </View>
      </View>
      
      <View style={styles.containerDireito}>
        
        <Image
            source={require("../../../assets/icons/editar.png")}
            style={styles.figura2}
          />
          
      </View>
    </View>
    </TouchableOpacity>



  <View style={styles.areaDoTextoSolto}>
    <Text style ={styles.texto}>Pagamento</Text>
  </View>
  <TouchableOpacity
    style={[ styles.botao4, pressionado3 && styles.botaoPressionado4
      ]}
      activeOpacity={0.8}
      onPressIn={() => setPressionado3(true)}
      onPressOut={() => setPressionado3(false)}
      onPress={() => navigation.navigate('TelaDeCheckout2')}
          >
  <View style={styles.areaDePagamentoDoConsumidor}>
      <View style={styles.containerEsquerdo2}>
      <View style={styles.areaDoMeioDePagamento}>
        <Image
          source={require("../../../assets/icons/mobile.png")}
          style={styles.figura1}
        />
        <View style={styles.areaDeRuaBairro}>
          <Text style={styles.nomeDoMeioDePagamento}>Pix</Text>
        </View>
      </View>
      </View>
      
      <View style={styles.containerDireito2}>

        <Image
            source={require("../../../assets/icons/editar.png")}
            style={styles.figura2}
          />

      </View>
    </View>
    </TouchableOpacity>

    <View style={styles.areaDoTextoSolto}>
    <Text style ={styles.texto}>Valor</Text>
  </View>
    <View style={styles.balao2}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.valor}>R$00,00</Text>
      </View>



<TouchableOpacity
  style={[
    styles.botaoContinuar,
    pressionadoBotaoContinuar && styles.botaoPressionadoContinuar
  ]}
  activeOpacity={0.8}
  onPressIn={() => setPressionadoBotaoContinuar(true)}
  onPressOut={() => setPressionadoBotaoContinuar(false)}
  onPress={() => navigation.navigate('TelaDeCheckout2')} // Bem aqui é para a página redirecionar para o zap do usuário os dados!
>
  <Text style={styles.textoDoBotaoContinuar}>ENVIAR PEDIDO</Text>
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
    justifyContent: 'flex-start',
    paddingTop: 13,
    paddingBottom:50,
  },
  areaDoTextoSolto:{
    alignSelf: 'flex-start',
  },
  texto: {
    color:"#a3214d",
    fontWeight:"bold",
    padding:20,
    marginBottom:-10,
  },
  botaoContinuar: {
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
  textoDoBotaoContinuar: {
    fontWeight: 'bold',
    color: "#ffffff",
  },
  botaoPressionadoContinuar: {
    backgroundColor: "#ff9ebf",
  },
  balao: {
    backgroundColor: '#fce4ec',
    borderRadius: 30,
    paddingVertical: 24,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:-10,
  },

  areaDoNumero1: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, 
  },
  texto1: {
    color: "#a3214d",
    fontWeight: "bold",
    fontSize: 18,
  },
  bolaDoNumero1: {
    width: 60,
    height: 60,
    backgroundColor: '#fcfbfc',
    borderRadius: 30, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoDaEntrega: {
    color:"#a3214d",
    fontWeight:"bold",
    marginTop: 10,
    fontSize: 13,
    textAlign: 'center',
    width: '100%',
    minHeight: 22,
  },
  
  areaDoNumero2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, 
  },
  texto2: {
    color: "#a3214d",
    fontWeight: "bold",
    fontSize: 18,
  },
  bolaDoNumero2: {
    width: 60,
    height: 60,
    backgroundColor: '#fcfbfc',
    borderRadius: 30, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoDoPagamento: {
    color:"#a3214d",
    fontWeight:"bold",
    marginTop:10,
    textAlign: 'center',
    fontSize: 13,
    width: '100%',
    minHeight: 22,
  },
  areaDoNumero3: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, 
  },
  textoDaConfirmação: {
    color:"#a3214d",
    fontWeight:"bold",
    marginTop: 10,
    fontSize: 13,
    textAlign: 'center',
    width: '100%',
    minHeight: 22,
  },
  ConteudoDoBalao: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 16,
  },
  blocoDeTexto:{
    width: 90,          
    alignItems: 'center',
  },
  bolaDoNumero3: {
    width: 60,
    height: 60,
    backgroundColor: '#ff9ebf',
    borderRadius: 30, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaDeDadosDoConsumidor:{
    backgroundColor: '#fce4ec',
    borderRadius: 30,
    paddingVertical: 24,
    //width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaDeNomeTelefoneIcone:{
    backgroundColor: '#fce4ec',
    paddingHorizontal: 24,
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  figura1:{
    width: 40,
    height: 40,
  },
  nomeDoUsuario:{
    color: "#a3214d",
    fontWeight: "bold",
    fontSize: 16,  
  },
  telefoneDoUsuario:{
    color: "#a97989",
    fontWeight: "bold",
    fontSize: 14, 
    marginTop: 4,  
  },
  areaDeNomeTelefone:{
    backgroundColor: '#fce4ec',
    //paddingHorizontal: 24,
    //width: '95%',
    flexDirection: 'column',
    alignItems: 'center',   
    marginLeft: 16
  },
  areaDeRuaBairroIcone:{
    backgroundColor: '#fce4ec',
    paddingHorizontal: 24,
    marginTop:10,
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',   
  },
  nomeDaRua:{
    color: "#a3214d",
    fontWeight: "bold",
    fontSize: 16,  
  },
  nomeDoBairro:{
    color: "#a97989",
    fontWeight: "bold",
    fontSize: 14, 
    marginTop: 4,  
  },
  areaDeRuaBairro:{
    backgroundColor: '#fce4ec',
    width: '85%',
    flexDirection: 'column',
    alignItems: 'flex-start',   
    marginLeft: 16,  
  },
  areaDolapis:{
    backgroundColor: '#fce4ec',
    flexDirection: 'row',
    alignItems: 'center',    
  },
  botao4: {
    width: '95%',
    borderRadius: 30,
    alignSelf: 'center',
  },
  
  botaoPressionado4: {
    backgroundColor: "#ff9ebf",
  },
  containerEsquerdo:{
    backgroundColor: '#fce4ec',
    width:"85%",
  },
  containerDireito:{
    backgroundColor: '#fce4ec',
    paddingTop:70,
    //marginBottom:-32,

  },
  areaDePagamentoDoConsumidor:{
    backgroundColor: '#fce4ec',
    borderRadius: 30,
    //width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:24,
  },
  nomeDoMeioDePagamento:{
    color: "#a3214d",
    fontWeight: "bold",
    fontSize: 16,  
  },
  containerEsquerdo2:{
    backgroundColor: '#fce4ec',
    width:"85%",
  },
  containerDireito2:{
    backgroundColor: '#fce4ec',
  },
  areaDoMeioDePagamento:{
    backgroundColor: '#fce4ec',
    paddingHorizontal: 24,
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',   
  },
  figura2:{
    width: 30,
    height: 30,
  },
  balao2: {
    backgroundColor: '#fce4ec',
    borderRadius: 30,
    paddingVertical: 24,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: "space-between",
  },
  total: {
    color: '#a3214d',
    fontSize: 16,
    textAlign: 'left',
    fontWeight: "bold",
    marginLeft:30,
  },
  valor: {
    color: '#a3214d',
    fontSize: 16,
    textAlign: 'left',
    fontWeight: "bold",
    marginRight:30,
  },
});

export default TelaDeCheckout3;
