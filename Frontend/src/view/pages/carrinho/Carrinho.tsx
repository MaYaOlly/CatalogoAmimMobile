import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, Modal, TextInput, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../../navigation/types";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../contexts/AuthContext';
import { useCarrinhoViewModel } from '../../../ViewModel/useCarrinhoViewModel';


type CarrinhoNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Carrinho'
>;

type Props = {
  navigation: CarrinhoNavigationProp;
};

export const Carrinho = ({ navigation }: Props) => {
  const { estaLogado } = useAuth();
  
  // ViewModel do carrinho
  const {
    itens,
    carregando,
    dadosFormatados,
    incrementarQuantidade,
    decrementarQuantidade,
    removerDoCarrinho,
    limparCarrinho,
    calcularPrecoItem,
    modalCupomVisivel,
    codigoCupom,
    aplicandoCupom,
    abrirModalCupom,
    fecharModalCupom,
    setCodigoCupom,
    aplicarCupomComValidacao,
    removerCupom,
  } = useCarrinhoViewModel();
  
  // serve para mudar a cor  do botão clicável
  const [pressionado2, setPressionado2] = React.useState(false); 
  const [pressionado4, setPressionado4] = React.useState(false);
  const [pressionado5, setPressionado5] = React.useState(false);

  // Função para limpar carrinho com confirmação
  const handleLimparCarrinho = () => {
    if (itens.length === 0) {
      Alert.alert("Carrinho vazio", "Não há itens no carrinho para limpar.");
      return;
    }
    
    Alert.alert(
      "Limpar carrinho",
      "Tem certeza que deseja remover todos os itens do carrinho?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Limpar", 
          style: "destructive",
          onPress: () => limparCarrinho()
        }
      ]
    );
  };

  // Função para continuar o pedido
  const continuarPedido = () => {
    if (itens.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione produtos ao carrinho antes de continuar.");
      return;
    }
    
    if (estaLogado) {
      navigation.navigate('TelaDeCheckout1');
    } else {
      Alert.alert(
        "Login necessário",
        "Você precisa estar logado para fazer um pedido. Deseja fazer login agora?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Fazer Login", onPress: () => navigation.navigate('Login') }
        ]
      );
    }
  };

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfbfc' }} edges={['left', 'right']}>
    <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}>
      <Image 
        source={require("../../../../assets/logo/logo3.png")}
        style={styles.logo}
      />
      <View style={styles.suaSacolaELimpar}> 
        <Text style={styles.suaSacola}> Sua sacola</Text>
        <TouchableOpacity 
          style={[ styles.botao2, pressionado2 && styles.botaoPressionado
          ]}
            activeOpacity={0.8}
            onPressIn={() => setPressionado2(true)}
            onPressOut={() => setPressionado2(false)}
            onPress={handleLimparCarrinho}
        >
        <Text style={styles.textoDoBotao}>LIMPAR</Text>
        </TouchableOpacity>
      </View>

      {/* Renderiza os itens do carrinho ou mensagem de carrinho vazio */}
      {carregando ? (
        <View style={styles.balao}>
          <Text style={styles.textoDoBalao}>Carregando carrinho...</Text>
        </View>
      ) : dadosFormatados.carrinhoVazio ? (
        <View style={styles.balao}>
          <Text style={styles.textoDoBalao}>
            Seu carrinho está vazio. Adicione produtos na tela inicial do catálogo!
          </Text>
        </View>
      ) : (
        <View style={styles.itensCarrinhoContainer}>
          {itens.map((item) => (
            <View key={item.produto.id} style={styles.itemCarrinho}>
              {/* Imagem do produto */}
              <Image 
                source={{ uri: item.produto.imagem }} 
                style={styles.imagemProduto}
                resizeMode="cover"
              />
              
              {/* Informações do produto */}
              <View style={styles.infoProduto}>
                <Text style={styles.nomeProduto}>{item.produto.nome}</Text>
                <Text style={styles.precoProduto}>{item.produto.preco}</Text>
                <Text style={styles.precoTotal}>
                  Total: {calcularPrecoItem(item.produto.preco, item.quantidade)}
                </Text>
              </View>
              
              {/* Controles de quantidade */}
              <View style={styles.controlesQuantidade}>
                <TouchableOpacity 
                  style={styles.botaoQuantidade}
                  onPress={() => decrementarQuantidade(item.produto.id)}
                >
                  <Text style={styles.botaoQuantidadeTexto}>-</Text>
                </TouchableOpacity>
                
                <Text style={styles.quantidadeTexto}>{item.quantidade}</Text>
                
                <TouchableOpacity 
                  style={styles.botaoQuantidade}
                  onPress={() => incrementarQuantidade(item.produto.id)}
                >
                  <Text style={styles.botaoQuantidadeTexto}>+</Text>
                </TouchableOpacity>
              </View>
              
              {/* Botão de remover */}
              <TouchableOpacity 
                style={styles.botaoRemover}
                onPress={() => removerDoCarrinho(item.produto.id)}
              >
                <Text style={styles.botaoRemoverTexto}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      <View style={styles.valoresDoProduto}> 
        <View style={styles.linhaValor}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.valor}>{dadosFormatados.subtotal}</Text>
        </View>

        {dadosFormatados.cupomAplicado ? (
          <View style={styles.linhaCupomAplicado}>
            <View style={styles.cupomTextos}>
              <Text style={styles.labelCupom}>Cupom: {dadosFormatados.cupomAplicado.codigo}</Text>
              <Text style={styles.valorDesconto}>-{dadosFormatados.desconto}</Text>
            </View>
            <TouchableOpacity onPress={removerCupom} style={styles.botaoRemoverContainer}>
              <Text style={styles.botaoRemoverCupom}>✕</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.linhaValor}
            onPress={abrirModalCupom}
            activeOpacity={0.7}
          >
            <Text style={styles.label}>Aplicar cupom</Text>
            <Text style={styles.setaAplicarCupom}>›</Text>
          </TouchableOpacity>
        )}

        <View style={[styles.linhaValor, styles.linhaTotal]}>
          <Text style={styles.labelTotal}>Total</Text>
          <Text style={styles.valorTotal}>{dadosFormatados.total}</Text>
        </View>
      </View>
      <TouchableOpacity 
          style={[ styles.botao5, pressionado5 && styles.botaoPressionado5
          ]}
            activeOpacity={0.8}
            onPressIn={() => setPressionado5(true)}
            onPressOut={() => setPressionado5(false)}
            onPress={() => navigation.navigate('Cupom')} 
        >
      <View style={styles.areaDeCupom}>
      <Image 
        source={require("../../../../assets/icons/etiquetav2.png")}
        style={styles.etiqueta}
      />
        <Text style={styles.textoDoBotao3}>Você tem um cupom? Clique e use aqui.
        </Text>

      <Image
      source={require("../../../../assets/icons/seta.png")}
      style={styles.seta}
      />
      </View>
      </TouchableOpacity>
      </ScrollView>

      <View style={styles.areaDoBotao}>
      <TouchableOpacity 
          style={[ styles.botao4, pressionado4 && styles.botaoPressionado4
          ]}
            activeOpacity={0.8}
            onPressIn={() => setPressionado4(true)}
            onPressOut={() => setPressionado4(false)}
            onPress={continuarPedido}
        >
        <Text style={styles.textoDoBotao}>CONTINUAR PEDIDO </Text>
        </TouchableOpacity>
        </View>

    {/* Modal de Cupom */}
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalCupomVisivel}
      onRequestClose={fecharModalCupom}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header do Modal */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitulo}>Adicionar Cupom</Text>
          </View>

          {/* Descrição */}
          <Text style={styles.modalDescricao}>
            Digite o código do seu cupom de desconto abaixo:
          </Text>

          {/* Input do Cupom */}
          <TextInput
            style={styles.inputCupom}
            placeholder="Ex: DESCONTO10"
            placeholderTextColor="#ff9ebf"
            value={codigoCupom}
            onChangeText={setCodigoCupom}
            autoCapitalize="characters"
            maxLength={20}
            editable={!aplicandoCupom}
          />

          {/* Botões */}
          <View style={styles.modalBotoes}>
            <TouchableOpacity 
              style={styles.botaoCancelar}
              onPress={fecharModalCupom}
              disabled={aplicandoCupom}
            >
              <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.botaoAplicar, aplicandoCupom && styles.botaoAplicarDesabilitado]}
              onPress={aplicarCupomComValidacao}
              disabled={aplicandoCupom}
            >
              {aplicandoCupom ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.botaoAplicarTexto}>Aplicar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fcfbfc',
    alignItems:"center",
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
  },
  logo: {
    width: 110,
    height: 50,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  suaSacolaELimpar: {
    backgroundColor: '#fcfbfc',
    width: '95%',
    flexDirection:"row",
    alignItems:"center",
    justifyContent: "space-between",
  },
  suaSacola: {
    color: '#a3214d',
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
  },
  botao2: {
    backgroundColor: "#ff4da6", 
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius:30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
    
  },
  textoDoBotao: {
    fontWeight: 'bold',
    color: "#ffffff",
  },
  botaoPressionado: {
    backgroundColor: "#ff9ebf",
  },
  balao: {
    backgroundColor: '#fce4ec',
    borderRadius: 30,
    paddingVertical: "7%",
    paddingHorizontal: "7%",
    width: '95%',
    alignItems: 'center',
    marginTop: "5%",
  },
  textoDoBalao: {
    color: '#a3214d',
    fontSize: 16,
    textAlign: 'center',
  },
  valoresDoProduto: {
    backgroundColor: '#fce4ec',
    width: '95%',
    marginTop: "5%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding:"5%",
    gap: 12,
  },
  linhaValor: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  label: {
    color: '#a3214d',
    fontSize: 16,
  },
  valor: {
    color: '#a3214d',
    fontSize: 16,
  },
  linhaTotal: {
    borderTopWidth: 1,
    borderTopColor: '#a3214d40',
    paddingTop: 12,
    marginTop: 8,
  },
  labelTotal: {
    color: '#a3214d',
    fontSize: 18,
    fontWeight: 'bold',
  },
  valorTotal: {
    color: '#a3214d',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Botão de aplicar cupom dentro do card de valores
  btnAplicarCupom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: '#a3214d40',
    marginTop: 8,
  },

  iconeCupomPequeno: {
    width: 24,
    height: 20,
  },

  textoAplicarCupom: {
    flex: 1,
    marginLeft: 10,
    color: '#a3214d',
    fontSize: 15,
    fontWeight: '600',
  },

  setaAplicarCupom: {
    color: '#a3214d',
    fontSize: 24,
    fontWeight: 'bold',
  },

  // Estilos para cupom aplicado
  linhaCupomAplicado: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  cupomTextos: {
    flex: 1,
    gap: 4,
  },

  labelCupom: {
    color: '#a3214d',
    fontSize: 16,
  },

  valorDesconto: {
    color: '#a3214d',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoRemoverContainer: {
    padding: 4,
  },

  botaoRemoverCupom: {
    color: '#a3214d',
    fontSize: 20,
    fontWeight: 'bold',
  },

  areaDeCupom: {
    padding:"5%",
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  etiqueta: {
    width: 40,
    height: 30,
    padding: "10%",
    marginLeft:-20,
  },
  botao3: {
    flex:1,
    backgroundColor: "#fce4ec",
    width:"50%", 
    
  },
  textoDoBotao3: {
    flex:1,
    fontWeight: 'bold',
    color: "#a3214d",
    textAlign:"justify",
    marginRight:30,
    width:"50%", 
  },
  seta: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginRight:-20,
  },
  areaDoBotao:{
    //paddingHorizontal: 16,
    paddingBottom: 16,
    //backgroundColor: 'transparent',
    alignItems: "center",
    justifyContent: "center",
  },
  botao4: {
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
    //marginBottom: 20,
    //marginVertical: 16,
    paddingVertical: 0, // padding vertical zero para não crescer
    //paddingHorizontal: 16,
  },
  botaoPressionado4: {
    backgroundColor: "#ff9ebf",
  },
  botao5: {
    backgroundColor: '#fce4ec',
    width: '95%',
    marginTop: "1%",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    padding:"5%",
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:10,
  },
  botaoPressionado5: {
    backgroundColor: "#ff9ebf",
  },
  
  // Estilos para itens do carrinho
  itensCarrinhoContainer: {
    width: '95%',
    gap: 12,
    marginTop: "5%",
  },
  
  itemCarrinho: {
    backgroundColor: '#fce4ec',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  imagemProduto: {
    width: 70,
    height: 70,
    borderRadius: 15,
  },
  
  infoProduto: {
    flex: 1,
    gap: 4,
  },
  
  nomeProduto: {
    color: '#a3214d',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  precoProduto: {
    color: '#a3214d',
    fontSize: 14,
  },
  
  precoTotal: {
    color: '#a3214d',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  controlesQuantidade: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  botaoQuantidade: {
    width: 30,
    height: 30,
    backgroundColor: '#a3214d',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  botaoQuantidadeTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  quantidadeTexto: {
    color: '#a3214d',
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 25,
    textAlign: 'center',
  },
  
  botaoRemover: {
    width: 30,
    height: 30,
    backgroundColor: '#ff4da6',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  botaoRemoverTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Estilos do Modal de Cupom
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContainer: {
    backgroundColor: '#fcfbfc',
    borderRadius: 30,
    padding: 25,
    width: '85%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
  },

  modalIcon: {
    width: 35,
    height: 28,
    marginRight: 10,
  },

  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#a3214d',
  },

  botaoFechar: {
    position: 'absolute',
    right: 0,
    top: -5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fce4ec',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoFecharTexto: {
    color: '#a3214d',
    fontSize: 20,
    fontWeight: 'bold',
  },

  modalDescricao: {
    color: '#a3214d',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },

  inputCupom: {
    backgroundColor: '#fce4ec',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#a3214d',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ff9ebf',
  },

  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  botaoCancelar: {
    flex: 1,
    backgroundColor: '#fce4ec',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  botaoCancelarTexto: {
    color: '#a3214d',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoAplicar: {
    flex: 1,
    backgroundColor: '#ff4da6',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  botaoAplicarDesabilitado: {
    backgroundColor: '#ff9ebf',
    opacity: 0.7,
  },

  botaoAplicarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Carrinho;
