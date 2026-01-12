import React, { useEffect, useRef } from "react";
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { useTelaInicialViewModel } from "../../ViewModel/useTelaInicialViewModel";

const { width } = Dimensions.get("window");

// CARROSSEL DE IMAGENS
const imagensCarrossel = [  
  "https://picsum.photos/id/1015/1000/500",
  "https://picsum.photos/id/20/1000/500",  
];

export default function TelaInicial() {
  const scrollRef = useRef<ScrollView>(null);
  
  // ViewModel
  const {
    produtos,
    carregando,
    indexCarrossel,
    modalVisible,
    produtoSelecionado,
    quantidades,
    abrirDetalhesProduto,
    fecharModal,
    adicionarItem,
    removerItem,
    adicionarAoCarrinho,
    avancarCarrossel,
    voltarCarrossel,
    irParaIndiceCarrossel,
  } = useTelaInicialViewModel();

  // Autoplay do carrossel com loop
  useEffect(() => {
    const intervalo = setInterval(() => {
      avancarCarrossel();
      const proximo = (indexCarrossel + 1) % imagensCarrossel.length;
      scrollRef.current?.scrollTo({
        x: proximo * width,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(intervalo);
  }, [indexCarrossel]);

  // Funções de navegação do carrossel
  const proximo = () => {
    const novo = (indexCarrossel + 1) % imagensCarrossel.length;
    scrollRef.current?.scrollTo({ x: novo * width, animated: true });
    avancarCarrossel();
  };

  const anterior = () => {
    const novo = indexCarrossel === 0 ? imagensCarrossel.length - 1 : indexCarrossel - 1;
    scrollRef.current?.scrollTo({ x: novo * width, animated: true });
    voltarCarrossel();
  };

  return (
    <View style={styles.container}>
            <ScrollView 
        style={styles.cardsContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardsContentContainer}
      >
      <Image source={require("../../../assets/logo/logo3.png")} style={styles.logo} />
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
            irParaIndiceCarrossel(novoIndex);
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
                index === indexCarrossel ? styles.indicatorActive : styles.indicatorInactive
              ]}
            />
          ))}
        </View>
      </View>

      {/* CARDS */}

        <Text style={styles.tituloCardapio}>Cardápio</Text>
        {carregando ? (
          <Text style={styles.carregandoTexto}>Carregando produtos...</Text>
        ) : (
          produtos.map((produto) => (
            <TouchableOpacity 
              key={produto.id} 
              style={styles.card}
              onPress={() => abrirDetalhesProduto(produto)}
              activeOpacity={0.7}
            >
              <View style={styles.textContainer}>
                <Text style={styles.title}>{produto.nome}</Text>
                <Text style={styles.description}>{produto.categoria}</Text>
                <Text style={styles.price}>{produto.preco}</Text>
              </View>

              <Image 
                source={{ uri: produto.imagem }} 
                style={styles.cardImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))
        )}
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
                {produtoSelecionado && (
                  <>
                    <Image 
                      source={{ uri: produtoSelecionado.imagem }} 
                      style={styles.modalImage}
                      resizeMode="cover"
                    />
                    
                    <Text style={styles.modalTitle}>{produtoSelecionado.nome}</Text>
                    
                    <Text style={styles.modalDescription}>
                      {produtoSelecionado.descricao}
                    </Text>
                    
                    <View style={styles.precoContainer}>
                      <Text style={styles.modalPreco}>{produtoSelecionado.preco}</Text>
                    </View>
                    
                    <View style={styles.bottomContainer}>
                      <View style={styles.botaoQuantidadeWrapper}>
                        <TouchableOpacity 
                          style={styles.botaoQuantidadeMenos}
                          onPress={() => removerItem(produtoSelecionado.id)}
                          disabled={!quantidades[produtoSelecionado.id] || quantidades[produtoSelecionado.id] === 0}
                        >
                          <Text style={styles.botaoQuantidadeTexto}>-</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.quantidadeDisplay}>
                          <Text style={styles.quantidadeNumero}>
                            {quantidades[produtoSelecionado.id] || 0}
                          </Text>
                        </View>
                        
                        <TouchableOpacity 
                          style={styles.botaoQuantidadeMais}
                          onPress={() => adicionarItem(produtoSelecionado.id)}
                        >
                          <Text style={styles.botaoQuantidadeTexto}>+</Text>
                        </TouchableOpacity>
                      </View>
                      
                      <TouchableOpacity 
                        style={styles.botaoAdicionarCarrinho}
                        onPress={adicionarAoCarrinho}
                      >
                        <Text style={styles.botaoAdicionarCarrinhoTexto}>
                          Adicionar ao Carrinho
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
    height: 60,
    alignSelf: "center",
    marginBottom: 10,
    marginTop:10, 
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

  carregandoTexto: {
    fontSize: 16,
    color: "#a3214d",
    textAlign: "center",
    marginTop: 20,
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