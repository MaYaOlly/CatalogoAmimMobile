import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../navigation/types";

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

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER COM BOTÃO VOLTAR */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* LISTA DE INFORMAÇÕES DO USUÁRIO */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
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

        {/* BOTÃO ATUALIZAR CADASTRO */}
        <TouchableOpacity style={styles.updateButton} onPress={openEditModal}>
          <Text style={styles.updateText}>ATUALIZAR CADASTRO</Text>
        </TouchableOpacity>
      </ScrollView>

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
                <Text style={styles.saveText}>SALVAR ALTERAÇÕES</Text>
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
    flex: 1,
    backgroundColor: "#fcfbfc",
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fce4ec",
    borderBottomWidth: 1,
    borderBottomColor: '#e8c4d4',
  },
  
  backButton: {
    padding: 8,
  },
  
  backButtonText: {
    fontSize: 24,
    color: "#a3214d",
    fontWeight: "bold",
  },
  
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a3214d",
  },
  
  headerPlaceholder: {
    width: 40,
  },
  
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  
  infoSection: {
    marginBottom: 24,
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
    borderRadius: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a3214d",
    opacity: 0.8,
  },
  
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#a3214d",
    flex: 1,
    textAlign: "right",
    marginLeft: 16,
  },
  
  updateButton: {
    backgroundColor: "#a3214d",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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
    backgroundColor: "#fce4ec",
    borderBottomWidth: 1,
    borderBottomColor: "#e8c4d4",
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
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e8c4d4",
    borderRadius: 10,
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
    backgroundColor: "#fce4ec",
    borderTopWidth: 1,
    borderTopColor: "#e8c4d4",
  },
  
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#a3214d",
    minWidth: 100,
    alignItems: "center",
  },
  
  cancelText: {
    color: "#a3214d",
    fontWeight: "600",
  },
  
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: "#a3214d",
    minWidth: 160,
    alignItems: "center",
  },
  
  saveText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});
export default TelaDePerfil;