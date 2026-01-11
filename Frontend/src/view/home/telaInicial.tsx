import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../navigation/types";

const { width } = Dimensions.get("window");

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// CARROSSEL DE IMAGENS
const imagensCarrossel = [  
  "https://picsum.photos/id/1015/1000/500",
  "https://picsum.photos/id/20/1000/500",  
];

const bolos = [
  {
    id: 1,
    nome: "Bolo de Chocolate",
    categoria: "Bolo",
    descricaoDetalhada: "Delicioso bolo de chocolate feito com cacau 100% puro, massa úmida e fofinha, coberto com ganache de chocolate meio amargo. Perfeito para qualquer ocasião!",
    preco: "R$ 25,00",
    imagem: "https://picsum.photos/id/16/300/300",
    imagemDetalhada: "https://picsum.photos/id/16/600/400"
  },
  {
    id: 2,
    nome: "Chocolate Trufado",
    categoria: "Bolo.",
    descricaoDetalhada: "Bolo de chocolate trufado com recheio de ganache cremoso e pedaços de chocolate belga. Finalizado com raspas de chocolate e ouro comestível.",
    preco: "R$ 35,00",
    imagem: "https://picsum.photos/id/17/300/300",
    imagemDetalhada: "https://picsum.photos/id/17/600/400"
  },
  {
    id: 3,
    nome: "Chocolate com Morango",
    categoria: "Bolo",
    descricaoDetalhada: "Massa de chocolate com recheio de creme de morango fresco e cobertura de chocolate branco. Decorado com morangos inteiros.",
    preco: "R$ 30,00",
    imagem: "https://picsum.photos/id/18/300/300",
    imagemDetalhada: "https://picsum.photos/id/18/600/400"
  },
  {
    id: 4,
    nome: "Chocolate Simples",
    categoria: "Bolo",
    descricaoDetalhada: "Nosso tradicional bolo de chocolate simples, perfeito para o café da tarde. Macio, fofinho e com aquele sabor de chocolate que todo mundo adora.",
    preco: "R$ 20,00",
    imagem: "https://picsum.photos/id/19/300/300",
    imagemDetalhada: "https://picsum.photos/id/19/600/400"
  },
  {
    id: 5,
    nome: "Cenoura com Chocolate",
    categoria: "Bolo",
    descricaoDetalhada: "Massa de cenoura com chocolate, úmida e saborosa, coberta com brigadeiro de chocolate. A combinação perfeita entre doce e saudável.",
    preco: "R$ 20,00",
    imagem: "https://picsum.photos/id/20/300/300",
    imagemDetalhada: "https://picsum.photos/id/20/600/400"
  },
];

interface Bolo {
  id: number;
  nome: string;
  categoria: string;
  descricaoDetalhada: string;
  preco: string;
  imagem: string;
  imagemDetalhada: string;
}

export default function TelaInicial() {
  const navigation = useNavigation<NavigationProp>();
  const scrollRef = useRef<ScrollView>(null);
  const [indexAtual, setIndexAtual] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [boloSelecionado, setBoloSelecionado] = useState<Bolo | null>(null);

  // Carrossel autoplay
  useEffect(() => {
    const intervalo = setInterval(() => {
      const proximo = indexAtual === imagensCarrossel.length - 1 ? 0 : indexAtual + 1;
      scrollRef.current?.scrollTo({
        x: proximo * width,
        animated: true,
      });
      setIndexAtual(proximo);
    }, 3000);

    return () => clearInterval(intervalo);
  }, [indexAtual]);

  function proximo() {
    const novo = indexAtual === imagensCarrossel.length - 1 ? 0 : indexAtual + 1;
    scrollRef.current?.scrollTo({ x: novo * width, animated: true });
    setIndexAtual(novo);
  }

  function anterior() {
    const novo = indexAtual === 0 ? imagensCarrossel.length - 1 : indexAtual - 1;
    scrollRef.current?.scrollTo({ x: novo * width, animated: true });
    setIndexAtual(novo);
  }

  // Funções do modal
  const abrirDetalhesBolo = (bolo: Bolo) => {
    setBoloSelecionado(bolo);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setBoloSelecionado(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Image source={require("../../../assets/logo/logo3.png")} style={styles.logo} />
        <Text style={styles.headerTitle}>Amim Doces</Text>
      </View>

      {/* CARROSSEL */}
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const novoIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            setIndexAtual(novoIndex);
          }}
          snapToInterval={width}
          decelerationRate="fast"
        >
          {imagensCarrossel.map((img, index) => (
            <View key={index} style={styles.carouselImageContainer}>
              <Image 
                source={{ uri: img }} 
                style={styles.carouselImage}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.leftButton} onPress={anterior}>
          <Text style={styles.arrow}>‹</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rightButton} onPress={proximo}>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.indicators}>
          {imagensCarrossel.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === indexAtual ? styles.indicatorActive : styles.indicatorInactive
              ]}
            />
          ))}
        </View>
      </View>

      {/* CARDS DE BOLOS */}
      <ScrollView 
        style={styles.cardsContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardsContentContainer}
      >
        <Text style={styles.tituloCardapio}>Nossos Bolos em Destaque</Text>
        {bolos.map((bolo) => (
          <TouchableOpacity 
            key={bolo.id} 
            style={styles.card}
            onPress={() => abrirDetalhesBolo(bolo)}
            activeOpacity={0.7}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{bolo.nome}</Text>
              <Text style={styles.description}>{bolo.categoria}</Text>
              <Text style={styles.price}>{bolo.preco}</Text>
            </View>

            <Image 
              source={{ uri: bolo.imagem }} 
              style={styles.cardImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}

        {/* SEÇÃO DE INFORMAÇÕES */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Como Fazer seu Pedido</Text>
          
          <View style={styles.infoStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>Escolha o bolo que mais te agrada</Text>
          </View>
          
          <View style={styles.infoStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>Entre em contato pelo WhatsApp</Text>
          </View>
          
          <View style={styles.infoStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>Combine horário de entrega</Text>
          </View>
        </View>

        {/* HORÁRIO DE FUNCIONAMENTO */}
        <View style={styles.horarioContainer}>
          <Text style={styles.horarioTitle}>Horário de Funcionamento</Text>
          <View style={styles.horarioItem}>
            <Text style={styles.horarioDia}>Segunda a Sábado:</Text>
            <Text style={styles.horarioHora}>08:00 - 19:00</Text>
          </View>
          <View style={styles.horarioItem}>
            <Text style={styles.horarioDia}>Domingo:</Text>
            <Text style={styles.horarioHora}>08:00 - 12:00</Text>
          </View>
        </View>
      </ScrollView>

      {/* MODAL DE DETALHES */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
        <TouchableWithoutFeedback onPress={fecharModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {boloSelecionado && (
                  <>
                    <Image 
                      source={{ uri: boloSelecionado.imagemDetalhada || boloSelecionado.imagem }} 
                      style={styles.modalImage}
                      resizeMode="cover"
                    />
                    
                    <Text style={styles.modalTitle}>{boloSelecionado.nome}</Text>
                    
                    <Text style={styles.modalDescription}>
                      {boloSelecionado.descricaoDetalhada}
                    </Text>
                    
                    <View style={styles.precoContainer}>
                      <Text style={styles.modalPreco}>{boloSelecionado.preco}</Text>
                    </View>
                    
                    <TouchableOpacity 
                      style={styles.botaoFecharModal}
                      onPress={fecharModal}
                    >
                      <Text style={styles.botaoFecharModalTexto}>Continuar Navegando</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfbfc",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#fce4ec",
    position: 'relative',
  },
  logo: {
    width: 60,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a3214d',
  },
  carouselContainer: {
    position: "relative",
    width: "100%",
    marginBottom: 10,
    height: 250,
  },
  carouselImageContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: width - 40,
    height: 250,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  leftButton: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: [{ translateY: -20 }],
    backgroundColor: "rgba(240, 98, 146, 0.8)", 
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
  },
  rightButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -20 }],
    backgroundColor: "rgba(240, 98, 146, 0.8)",
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
  },
  arrow: {
    color: "#fcfbfc",
    fontSize: 24,
    fontWeight: "bold",
  },
  indicators: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  indicatorActive: {
    backgroundColor: "#f06292",
    width: 12,
    height: 8,
  },
  indicatorInactive: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  cardsContentContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fce4ec", 
    borderRadius: 19,
    padding: 15,
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textContainer: {
    flex: 1,
    paddingRight: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a3214d", 
  },
  description: {
    fontSize: 14,
    color: "#a3214d",
    marginVertical: 8,
    lineHeight: 18,
  },
  price: {
    fontSize: 17,
    color: "#a3214d",
    fontWeight: "bold",
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  tituloCardapio: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginVertical: 16,
    color: "#a3214d",
  },
  infoSection: {
    backgroundColor: "#fce4ec",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#a3214d",
    marginBottom: 15,
    textAlign: "center",
  },
  infoStep: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#a3214d",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  stepNumberText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  stepText: {
    fontSize: 16,
    color: "#a3214d",
    flex: 1,
  },
  whatsappButton: {
    backgroundColor: "#25D366",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  whatsappButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  horarioContainer: {
    backgroundColor: "#fce4ec",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  horarioTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#a3214d",
    marginBottom: 15,
    textAlign: "center",
  },
  horarioItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(163, 33, 77, 0.2)",
  },
  horarioDia: {
    fontSize: 16,
    color: "#a3214d",
    fontWeight: "500",
  },
  horarioHora: {
    fontSize: 16,
    color: "#a3214d",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fce4ec",
    borderRadius: 20,
    padding: 24,
    width: "90%",
    maxHeight: "80%",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalImage: {
    width: "100%",
    height: 220,
    borderRadius: 15,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#a3214d",
    marginBottom: 10,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    color: "#a3214d",
    marginBottom: 16,
    lineHeight: 22,
    textAlign: "justify",
  },
  precoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  modalPreco: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#a3214d",
  },
  whatsappButtonModal: {
    backgroundColor: "#25D366",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },
  whatsappButtonTextModal: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoFecharModal: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#a3214d',
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoFecharModalTexto: {
    color: '#a3214d',
    fontSize: 14,
    fontWeight: 'bold',
  },
});