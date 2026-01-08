import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

const { width } = Dimensions.get("window");

{/* HEADER COM LOGO */}
const Header = () => {
  <View style={styles.header}>
    <Image
      source={require("../assets/logo.png")}
      style={styles.logo}
      resizeMode="contain"
    />
  </View>
}

{/* CARROSSEL DE IMAGENS - Imagens maiores para melhor qualidade */}
const imagensCarrossel = [  
  "https://picsum.photos/id/1015/1000/500", // Imagem maior (1000x500)
  "https://picsum.photos/id/20/1000/500",   // Imagem maior (1000x500)
];

const bolos = [
  {
    id: 1,
    nome: "Bolo de Chocolate",
    descricao: "Sabor: Chocolate intenso. Recheio: Nutella",
    descricaoDetalhada: "Delicioso bolo de chocolate feito com cacau 100% puro, massa úmida e fofinha, coberto com ganache de chocolate meio amargo. Perfeito para qualquer ocasião!",
    preco: "R$ 25,00",
    imagem: "https://picsum.photos/id/16/300/300", // Imagem maior para nitidez
    imagemDetalhada: "https://picsum.photos/id/16/600/400" // Imagem maior
  },
  {
    id: 2,
    nome: "Chocolate Trufado",
    descricao: "Recheio trufado gourmet.",
    descricaoDetalhada: "Bolo de chocolate trufado com recheio de ganache cremoso e pedaços de chocolate belga. Finalizado com raspas de chocolate e ouro comestível.",
    preco: "R$ 35,00",
    imagem: "https://picsum.photos/id/17/300/300",
    imagemDetalhada: "https://picsum.photos/id/17/600/400"
  },
  {
    id: 3,
    nome: "Chocolate com Morango",
    descricao: "Combinação perfeita.",
    descricaoDetalhada: "Massa de chocolate com recheio de creme de morango fresco e cobertura de chocolate branco. Decorado com morangos inteiros.",
    preco: "R$ 30,00",
    imagem: "https://picsum.photos/id/18/300/300",
    imagemDetalhada: "https://picsum.photos/id/18/600/400"
  },
  {
    id: 4,
    nome: "Chocolate Simples",
    descricao: "Clássico e fofinho.",
    descricaoDetalhada: "Nosso tradicional bolo de chocolate simples, perfeito para o café da tarde. Macio, fofinho e com aquele sabor de chocolate que todo mundo adora.",
    preco: "R$ 20,00",
    imagem: "https://picsum.photos/id/19/300/300",
    imagemDetalhada: "https://picsum.photos/id/19/600/400"
  },
  {
    id: 5,
    nome: "Cenoura com Chocolate",
    descricao: "Clássico e fofinho.",
    descricaoDetalhada: "Massa de cenoura com chocolate, úmida e saborosa, coberta com brigadeiro de chocolate. A combinação perfeita entre doce e saudável.",
    preco: "R$ 20,00",
    imagem: "https://picsum.photos/id/20/300/300",
    imagemDetalhada: "https://picsum.photos/id/20/600/400"
  },
];

interface Bolo {
  id: number;
  nome: string;
  descricao: string;
  descricaoDetalhada: string;
  preco: string;
  imagem: string;
  imagemDetalhada: string;
}

export default function BoloChocolateScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [indexAtual, setIndexAtual] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [boloSelecionado, setBoloSelecionado] = useState<Bolo | null>(null);
  const [quantidades, setQuantidades] = useState<{[key: number]: number}>({});

  /* Autoplay com loop */
  useEffect(() => {
    const intervalo = setInterval(() => {
      const proximo =
        indexAtual === imagensCarrossel.length - 1
          ? 0
          : indexAtual + 1;

      scrollRef.current?.scrollTo({
        x: proximo * width,
        animated: true,
      });

      setIndexAtual(proximo);
    }, 3000);

    return () => clearInterval(intervalo);
  }, [indexAtual]);

  function proximo() {
    const novo =
      indexAtual === imagensCarrossel.length - 1 ? 0 : indexAtual + 1;
    scrollRef.current?.scrollTo({ x: novo * width, animated: true });
    setIndexAtual(novo);
  }

  function anterior() {
    const novo =
      indexAtual === 0 ? imagensCarrossel.length - 1 : indexAtual - 1;
    scrollRef.current?.scrollTo({ x: novo * width, animated: true });
    setIndexAtual(novo);
  }

  // Função para abrir o modal com os detalhes do bolo
  const abrirDetalhesBolo = (bolo: React.SetStateAction<Bolo | null>) => {
    setBoloSelecionado(bolo);
    setModalVisible(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setModalVisible(false);
    setBoloSelecionado(null);
  };

  // Função para adicionar item
  const adicionarItem = (boloId: number) => {
    setQuantidades(prev => ({
      ...prev,
      [boloId]: (prev[boloId] || 0) + 1
    }));
    console.log(`Adicionado bolo ${boloId}. Quantidade atual: ${(quantidades[boloId] || 0) + 1}`);
  };

  // Função para remover item
  const removerItem = (boloId: number) => {
    if (quantidades[boloId] && quantidades[boloId] > 0) {
      setQuantidades(prev => ({
        ...prev,
        [boloId]: prev[boloId] - 1
      }));
      console.log(`Removido bolo ${boloId}. Quantidade atual: ${quantidades[boloId] - 1}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* CARROSSEL */}
      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const novoIndex = Math.round(
              e.nativeEvent.contentOffset.x / width
            );
            setIndexAtual(novoIndex);
          }}
          snapToInterval={width}
          decelerationRate="fast"
        >
          {imagensCarrossel.map((img, index) => (
            <View key={index} style={styles.carouselImageContainer}>
              <Image 
                key={index} 
                source={{ uri: img }} 
                style={styles.carouselImage}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>

        {/* ESQUERDA */}
        <TouchableOpacity style={styles.leftButton} onPress={anterior}>
          <Text style={styles.arrow}>‹</Text>
        </TouchableOpacity>

        {/* DIREITA */}
        <TouchableOpacity style={styles.rightButton} onPress={proximo}>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Indicadores de página */}
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

      {/* CARDS */}
      <ScrollView 
        style={styles.cardsContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardsContentContainer}
      >
        <Text style={styles.tituloCardapio}>Cardápio</Text>
        {bolos.map((bolo) => (
          <TouchableOpacity 
            key={bolo.id} 
            style={styles.card}
            onPress={() => abrirDetalhesBolo(bolo)}
            activeOpacity={0.7}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{bolo.nome}</Text>
              <Text style={styles.description}>{bolo.descricao}</Text>
              <Text style={styles.price}>{bolo.preco}</Text>
            </View>

            <Image 
              source={{ uri: bolo.imagem }} 
              style={styles.cardImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
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
                    
                    {/* PREÇO ABAIXO DA DESCRIÇÃO */}
                    <View style={styles.precoContainer}>
                      <Text style={styles.modalPreco}>{boloSelecionado.preco}</Text>
                    </View>
                    
                    {/* CONTROLE DE QUANTIDADE E BOTÃO DE ADICIONAR */}
                    <View style={styles.bottomContainer}>
                      {/* BOTÃO DE QUANTIDADE */}
                      <View style={styles.botaoQuantidadeWrapper}>
                        <TouchableOpacity 
                          style={styles.botaoQuantidadeMenos}
                          onPress={() => removerItem(boloSelecionado.id)}
                          disabled={!quantidades[boloSelecionado.id] || quantidades[boloSelecionado.id] === 0}
                        >
                          <Text style={styles.botaoQuantidadeTexto}>-</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.quantidadeDisplay}>
                          <Text style={styles.quantidadeNumero}>
                            {quantidades[boloSelecionado.id] || 0}
                          </Text>
                        </View>
                        
                        <TouchableOpacity 
                          style={styles.botaoQuantidadeMais}
                          onPress={() => adicionarItem(boloSelecionado.id)}
                        >
                          <Text style={styles.botaoQuantidadeTexto}>+</Text>
                        </TouchableOpacity>
                      </View>
                      
                      {/* BOTÃO DE ADICIONAR NO CANTO INFERIOR DIREITO */}
                      <TouchableOpacity 
                        style={styles.botaoAdicionarCarrinho}
                        onPress={() => adicionarItem(boloSelecionado.id)}
                      >
                        <Text style={styles.botaoAdicionarCarrinhoTexto}>
                          Adicionar
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

/* ESTILOS */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfbfc",
  },

  header: {
    height: 80,
    backgroundColor: "#fce4ec", 
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 120,
    height: 50,
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
    justifyContent: 'flex-start'
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

  /* Estilos do Modal */
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
    alignItems: "flex-start",
  },

  modalPreco: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#a3214d",
  },

  /* Container inferior com botões */
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  /* Estilos para o botão de quantidade */
  botaoQuantidadeWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  botaoQuantidadeMenos: {
    width: 40,
    height: 40,
    backgroundColor: "#a3214d",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 18,
    borderTopLeftRadius: 18,
  },

  botaoQuantidadeMais: {
    width: 40,
    height: 40,
    backgroundColor: "#a3214d",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 18,
    borderTopRightRadius: 18,
  },

  quantidadeDisplay: {
    width: 40,
    height: 40,
    backgroundColor: "#a3214d",
    justifyContent: "center",
    alignItems: "center",
  },

  quantidadeNumero: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fcfbfc",
  },

  botaoQuantidadeTexto: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fcfbfc",
  },

  /* Botão de Adicionar */
  botaoAdicionarCarrinho: {
    backgroundColor: "#a3214d",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    marginLeft: 10,
  },

  botaoAdicionarCarrinhoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});