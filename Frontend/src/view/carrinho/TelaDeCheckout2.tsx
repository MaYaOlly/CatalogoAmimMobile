import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type TelaDeCheckout2NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TelaDeCheckout2'
>;

type Props = {
  navigation: TelaDeCheckout2NavigationProp;
  
};

export const TelaDeCheckout2 = ({ navigation }: Props) => {
  // serve para mudar a cor  do botão clicável
  const [pressionadoBotaoContinuar, setPressionadoBotaoContinuar] = React.useState(false);
  const [pressionado2, setPressionado2] = React.useState(false); 

  //Serve para mudar cor dos itens de pagamento
  const [pagamentoSelecionado, setPagamentoSelecionado] = React.useState<string | null>(null);

  return (
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
            <View style={styles.bolaDoNumero1}>
              <Text style ={styles.texto2}>3</Text>
            </View>
            <View style={styles.blocoDeTexto}>
              <Text style ={styles.textoDaConfirmação}>Confirmação</Text>
            </View>
          </View>
        </View>
    </View>
    <View style={styles.areaDoTextoSolto}>
      <Text style ={styles.texto}>Formas de pagamento</Text>
    </View>

  <View style={styles.areaDoPagamento}>
  <TouchableOpacity
  style={[
    styles.itemPagamento,
    pagamentoSelecionado === 'pix' && styles.itemPagamentoSelecionado
  ]}
  onPress={() => setPagamentoSelecionado('pix')}
>
  <Image
    source={require("../../../assets/icons/mobile.png")}
    style={styles.figura1}
  />
  <Text style={styles.textoPix}>Pix</Text>
</TouchableOpacity>


<TouchableOpacity
  style={[
    styles.itemPagamento,
    pagamentoSelecionado === 'dinheiro' && styles.itemPagamentoSelecionado
  ]}
  onPress={() => setPagamentoSelecionado('dinheiro')}
>
  <Image
    source={require("../../../assets/icons/money.png")}
    style={styles.figura1}
  />
  <Text style={styles.textoPix}>Dinheiro</Text>
</TouchableOpacity>


<TouchableOpacity
  style={[
    styles.itemPagamento,
    pagamentoSelecionado === 'debito' && styles.itemPagamentoSelecionado
  ]}
  onPress={() => setPagamentoSelecionado('debito')}
>
  <Image
    source={require("../../../assets/icons/credit-card.png")}
    style={styles.figura1}
  />
  <Text style={styles.textoPix}>Cartão de débito</Text>
</TouchableOpacity>


<TouchableOpacity
  style={[
    styles.itemPagamento,
    pagamentoSelecionado === 'credito' && styles.itemPagamentoSelecionado
  ]}
  onPress={() => setPagamentoSelecionado('credito')}
>
  <Image
    source={require("../../../assets/icons/credit-card.png")}
    style={styles.figura1}
  />
  <Text style={styles.textoPix}>Cartão de crédito</Text>
</TouchableOpacity>
</View>


<TouchableOpacity
  style={[
    styles.botaoContinuar,
    pressionadoBotaoContinuar && styles.botaoPressionadoContinuar
  ]}
  activeOpacity={0.8}
  onPressIn={() => setPressionadoBotaoContinuar(true)}
  onPressOut={() => setPressionadoBotaoContinuar(false)}
  onPress={() => navigation.navigate('TelaDeCheckout3')}
>
  <Text style={styles.textoDoBotaoContinuar}>CONTINUAR</Text>
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
    borderRadius: 30, // metade do width/height
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
    backgroundColor: '#ff9ebf',
    borderRadius: 30, // metade do width/height
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



  areaDoPagamento1:{
    borderRadius: 30,
    paddingVertical: 20,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between', // 🔥 distribui os itens
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor:"yellow",
  },
  
  item1:{
    backgroundColor: '#fce4ec',
    borderRadius: 30,
    width: '40%',            // 🔥 dois itens por linha
    alignItems: 'center',
    paddingVertical: 16,
    margin:20,
  },
  
  figura1:{
    width: 70,
    height: 70,
  },
  textoPix:{
    color:"#a3214d",
    fontWeight:"bold",
    marginTop: 10,
    textAlign: 'center',
    width: '100%', 
  },
  areaDoPagamento2:{
    backgroundColor: 'green',
    borderRadius: 30,
    paddingVertical: 24,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaDoPagamento:{
    borderRadius: 30,
    paddingVertical: 10,
    width: '95%',
    flexDirection: 'row',
    flexWrap: 'wrap',              
    justifyContent: 'center',
    gap: 22, 
  },
  
  itemPagamento:{
    backgroundColor: '#fce4ec',
    borderRadius: 30,
    width: '45%',                  
    alignItems: 'center',
    paddingVertical: 26,
    paddingHorizontal: 21,    
  },
  itemPagamentoSelecionado:{
    borderWidth: 2,
    borderColor: '#ff4da6',   
    backgroundColor: '#ff9ebf',
  }
  
});

export default TelaDeCheckout2;
