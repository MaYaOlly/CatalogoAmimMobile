import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";

export default function Perfil() {
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
    <View style={styles.container}>
      {/* LISTA DE INFORMAÇÕES DO USUÁRIO */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <View style={styles.row}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Telefone</Text>
              <Text style={styles.infoValue}>{userInfo.telefone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.row}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Nome</Text>
              <Text style={styles.infoValue}>{userInfo.nome}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.row}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>E-mail</Text>
              <Text style={styles.infoValue}>{userInfo.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoItem}>
          <View style={styles.row}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Endereço</Text>
              <Text style={styles.infoValue}>{userInfo.endereço}</Text>
            </View>
          </View>
        </View>
      </View>

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
                <Text style={styles.inputLabel}>Nome *</Text>
                <TextInput
                  style={styles.textInput}
                  value={editingData.nome}
                  onChangeText={(text) => setEditingData({...editingData, nome: text})}
                  placeholder="Digite seu nome completo"
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
                  numberOfLines={2}
                />
              </View>

              <Text style={styles.requiredText}>* Campos obrigatórios</Text>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={styles.saveText}>SALVAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfbfc",
    padding: 16,
    justifyContent: "space-between",
  },
  
  infoSection: {
    marginBottom: 20,
  },
  
  infoItem: {
    backgroundColor: "#fce4ec",
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
  },
  
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  
  infoLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#a3214d",
  },
  
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#835c68ff",
    flex: 1,
    marginLeft: 16,
  },
  
  updateButton: {
    backgroundColor: "#b91588ff",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    paddingBottom: 20,
  },
  
  updateText: {
    color: "#fcfbfc",
    fontSize: 13,
    fontWeight: "bold",
  },
  
  // Estilos do Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  
  modalContent: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 20,
    maxHeight: "80%",
    overflow: "hidden",
  },
  
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#fcfbfc",
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
    color: "#999",
  },
  
  modalBody: {
    padding: 20,
    maxHeight: 400,
  },
  
  inputGroup: {
    marginBottom: 16,
  },
  
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a3214d",
    marginBottom: 6,
  },
  
  textInput: {
    backgroundColor: "#fcfbfc",
    borderWidth: 1,
    borderColor: "#fcfbfc",
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
  },
  
  modalFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#fcfbfc",
    gap: 12,
  },
  
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#fcfbfc",
  },
  
  cancelText: {
    color: "#a3214d",
    fontWeight: "500",
  },
  
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: "#ff4081",
  },
  
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
});