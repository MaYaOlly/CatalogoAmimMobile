import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts/AuthContext';

type TelaDeCheckout1NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TelaDeCheckout1'
>;

type Props = {
  navigation: TelaDeCheckout1NavigationProp;
  
};

export const TelaDeCheckout1 = ({ navigation }: Props) => {
  const { usuario } = useAuth();
  
  // Estados para os campos de endereço
  const [cep, setCep] = React.useState("");
  const [rua, setRua] = React.useState("");
  const [numero, setNumero] = React.useState("");
  const [bairro, setBairro] = React.useState("");
  
  // serve para mudar a cor  do botão clicável
  const [pressionadoBotaoContinuar, setPressionadoBotaoContinuar] = React.useState(false);
  const [pressionado2, setPressionado2] = React.useState(false);

  // Preencher endereço do usuário se disponível
  useEffect(() => {
    if (usuario?.endereco) {
      // Se o endereço estiver disponível, você pode fazer um parse
      // Por enquanto, apenas colocamos o endereço completo na rua
      setRua(usuario.endereco);
    }
  }, [usuario]); 

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
            <View style={styles.bolaDoNumero2}>
              <Text style ={styles.texto2}>3</Text>
            </View>
            <View style={styles.blocoDeTexto}>
              <Text style ={styles.textoDaConfirmação}>Confirmação</Text>
            </View>
          </View>
        </View>
    </View>
    <View style={styles.areaDoTextoSolto}>
      <Text style ={styles.texto}>Endereço de entrega</Text>
    </View>
      
      <TextInput
        style={styles.textInput}
        placeholder="CEP"
        placeholderTextColor="#a3214d"
        value={cep}
        onChangeText={setCep}
      />
      
      <TextInput
        style={styles.textInput}
        placeholder="Rua"
        placeholderTextColor="#a3214d"
        value={rua}
        onChangeText={setRua}
      />
      
      <TextInput
        style={styles.textInput}
        placeholder="Nº"
        placeholderTextColor="#a3214d"
        value={numero}
        onChangeText={setNumero}
      />
      
      <TextInput
        style={styles.textInput}
        placeholder="Bairro"
        placeholderTextColor="#a3214d"
        value={bairro}
        onChangeText={setBairro}
      />
  

<TouchableOpacity
  style={[
    styles.botaoContinuar,
    pressionadoBotaoContinuar && styles.botaoPressionadoContinuar
  ]}
  activeOpacity={0.8}
  onPressIn={() => setPressionadoBotaoContinuar(true)}
  onPressOut={() => setPressionadoBotaoContinuar(false)}
  onPress={() => navigation.navigate('TelaDeCheckout2')}
>
  <View style={styles.AreaInternaDoBotao}>
  <View style={styles.areaDoContinuar}>
  <Text style={styles.textoDoBotaoContinuar}>CONTINUAR</Text>
  </View>
  <View style={styles.areaDaSeta}>
  <Image 
        source={require("../../../assets/icons/setaBranca.png")}
        style={styles.seta}
      />
  </View>
  </View>
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
  textInput: {
    width: "95%",
    height: 60,
    backgroundColor: '#fce4ec',
    borderRadius: 30,
    padding: 20,
    marginVertical: 6,
    color: '#a3214d',
    fontWeight: 'bold',
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
    marginTop: 90,
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
    backgroundColor: '#ff9ebf',
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
    backgroundColor: '#fcfbfc',
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
  seta: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight:20,
  },
  areaDoContinuar:{
    backgroundColor: '#ff4da6',
    width: '85%',
    flexDirection: 'column',
    alignItems: 'center',   
    marginLeft: 16,  
  },
  areaDaSeta:{
    //backgroundColor: '#ff4da6',
  },
  AreaInternaDoBotao:{
    backgroundColor: '#ff4da6',
    borderRadius: 30,
    //width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:24,
    
  },
});

export default TelaDeCheckout1;
