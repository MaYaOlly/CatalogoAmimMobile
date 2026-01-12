import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../navigation/types";
import { SafeAreaView } from 'react-native-safe-area-context';

type TelaDePerfilNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TelaDePerfil'
>;

type Props = {
  navigation: TelaDePerfilNavigationProp;
};

export const TelaDePerfil = ({ navigation }: Props) => {
  //const navigation = useNavigation();
  
  // Estado para os dados do usuário
  const [userInfo, setUserInfo] = useState({
    telefone: "(11) 99999-9999",
    nome: "João Silva",
    email: "joao.silva@email.com",
    endereço: "Rua das Flores, 123 - São Paulo, SP",
  });

  // Estado para o modal
  const [modalVisible, setModalVisible] = useState(false);
  
  // Estado para os dados em edição
  const [editingData, setEditingData] = useState({
    telefone: "",
    nome: "",
    endereço: "",
  });

  // Abre o modal com os dados atuais
  const openEditModal = () => {
    setEditingData({
      telefone: userInfo.telefone,
      nome: userInfo.nome,
      endereço: userInfo.endereço
    });
    setModalVisible(true);
  };

  // Fecha o modal sem salvar
  const closeModal = () => {
    setModalVisible(false);
  };

  // Salva as alterações
  const saveChanges = () => {
    // Validações básicas
    if (!editingData.nome.trim()) {
      Alert.alert("Erro", "O nome é obrigatório");
      return;
    }

    // Atualiza os dados
    setUserInfo({
      ...editingData,
      email: userInfo.email
    });
    setModalVisible(false);
    Alert.alert("Sucesso", "Cadastro atualizado com sucesso!");
  };

    // serve para mudar a cor  do botão clicável
    const [pressionado2, setPressionado2] = React.useState(false); 

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#fcfbfc'  }}>
    <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}>
        {/* LISTA DE INFORMAÇÕES DO USUÁRIO */}
        <View style={styles.infoSection}>
          {/*<Text style={styles.sectionTitle}>Informações Pessoais</Text>*/}
          
          <View style={styles.infoItem}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nome</Text>
              <Text style={styles.infoValue}>{userInfo.nome}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>E-mail</Text>
              <Text style={styles.infoValue}>{userInfo.email}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Telefone</Text>
              <Text style={styles.infoValue}>{userInfo.telefone}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Endereço</Text>
              <Text style={styles.infoValue}>{userInfo.endereço}</Text>
            </View>
          </View>
        </View>
        </ScrollView>
        {/* BOTÃO ATUALIZAR CADASTRO */}
        <TouchableOpacity style={styles.updateButton} onPress={openEditModal}>
          <Text style={styles.updateText}>ATUALIZAR CADASTRO</Text>
        </TouchableOpacity>
      

      

      {/* MODAL DE EDIÇÃO */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Cadastro</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nome *</Text>
                <TextInput
                  style={styles.textInput}
                  value={editingData.nome}
                  onChangeText={(text) => setEditingData({...editingData, nome: text})}
                  placeholder="Digite seu nome completo"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Telefone</Text>
                <TextInput
                  style={styles.textInput}
                  value={editingData.telefone}
                  onChangeText={(text) => setEditingData({...editingData, telefone: text})}
                  placeholder="Digite seu telefone"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Endereço</Text>
                <TextInput
                  style={styles.textInput}
                  value={editingData.endereço}
                  onChangeText={(text) => setEditingData({...editingData, endereço: text})}
                  placeholder="Digite seu endereço completo"
                  multiline={true}
                  numberOfLines={3}
                />
              </View>

              <Text style={styles.requiredText}>* Campos obrigatórios</Text>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={styles.saveText}>SALVAR </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fcfbfc',
    //paddingTop: 20,
    justifyContent: 'flex-start',
  },
  
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
    
  },
  
  infoSection: {
    marginBottom: 24,
    width: "100%", // 🔥 essencial
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
    padding: 16,
    borderRadius: 30,
    marginBottom: 12,

  },
  
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#a3214d",
    opacity: 0.8,
  },
  
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#a97989",
    flex: 1,
    textAlign: "left",
    paddingLeft:20,
    
  },
  
  updateButton: {
    backgroundColor: "#ff4da6",
    marginHorizontal:5,
    height:"10%",          // 🔥 altura fixa
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  
  
  updateText: {
    color: "#fcfbfc",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  // Estilos do Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  
  modalContent: {
    backgroundColor: "#fcfbfc",
    marginHorizontal: 20,
    borderRadius: 20,
    maxHeight: "80%",
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fcfbfc",

  },
  
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a3214d",
  },
  
  closeButton: {
    padding: 5,
  },
  
  closeText: {
    fontSize: 20,
    color: "#a3214d",
    fontWeight: "bold",
  },
  
  modalBody: {
    padding: 20,
    maxHeight: 400,
  },
  
  inputGroup: {
    marginBottom: 20,
  },
  
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a3214d",
    marginBottom: 8,
  },
  
  textInput: {
    backgroundColor: "#fce4ec",
    borderRadius: 30,
    padding: 12,
    fontSize: 16,
    color: "#a3214d",
  },
  
  requiredText: {
    fontSize: 12,
    color: "#a3214d",
    marginTop: 10,
    fontStyle: "italic",
    opacity: 0.7,
  },
  
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#fcfbfc",

  },
  
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: "#fcfbfc",
    borderWidth: 1,
    borderColor: "#a3214d",
    minWidth: 100,
    alignItems: "center",
    //shadowColor: "#000",
    //shadowOffset: { width: 0, height: 4 },
    //shadowOpacity: 0.2,
    //shadowRadius: 5,
    //elevation: 6,
  },
  
  cancelText: {
    color: "#a3214d",
    fontWeight: "600",
  },
  
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: "#ff4da6",
    minWidth: 160,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  
  saveText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
botao2: {
  position: "absolute",
  bottom: 20,
  left: 16,
  right: 16,
  height: 56,
  paddingHorizontal:"5%",
  borderRadius: 30,
  alignItems: "center",
  justifyContent: "center",
},

  textoDoBotao: {
    fontWeight: 'bold',
    color: "#ffffff",
  },
  botaoPressionado2: {
    backgroundColor: "#ff9ebf",
  },
});
export default TelaDePerfil;