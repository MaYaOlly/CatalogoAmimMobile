import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, SafeAreaView, ScrollView, Switch } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../navigation/types";

type TelaDeNotificacoesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TelaDeNotificacoes'
>;

type Props = {
  navigation: TelaDeNotificacoesNavigationProp;
};

export const TelaDeNotificacoes = ({ navigation }: Props) => {
  //const navigation = useNavigation();
  
  // Estado para as configurações de notificação
  const [notifications, setNotifications] = useState({
    promo: true,
    pedidos: true,
    novidades: false,
    alertas: true,
    email: false,
  });

  const toggleSwitch = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  function handleSaveSettings() {
    Alert.alert("Sucesso", "Configurações de notificação salvas com sucesso!");
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* RETÂNGULO INFORMATIVO */}
        <View style={styles.infoBox}>
          <View style={styles.infoHeader}>
            <Ionicons name="notifications-outline" size={24} color="#a3214d" />
            <Text style={styles.infoTitle}>Configurações de Notificação</Text>
          </View>
          <Text style={styles.infoText}>
            Para gerenciar como você deseja receber as notificações do aplicativo Amim.
            Acesse as configurações do seu dispositivo em 
            Configurações / Amim / Notificações.
          </Text>
        </View>

        {/* OPÇÕES DE NOTIFICAÇÃO 
        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>Notificações do App</Text>
          
          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={styles.optionIconContainer}>
                <Ionicons name="pricetag-outline" size={20} color="#a3214d" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Promoções e Ofertas</Text>
                <Text style={styles.optionDescription}>Receba alertas sobre descontos especiais</Text>
              </View>
            </View>
            <Switch
              value={notifications.promo}
              onValueChange={() => toggleSwitch('promo')}
              trackColor={{ false: '#e8c4d4', true: '#a3214d' }}
              thumbColor="#fcfbfc"
              ios_backgroundColor="#e8c4d4"
            />
          </View>

          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={styles.optionIconContainer}>
                <Ionicons name="cart-outline" size={20} color="#a3214d" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Status de Pedidos</Text>
                <Text style={styles.optionDescription}>Atualizações sobre seus pedidos</Text>
              </View>
            </View>
            <Switch
              value={notifications.pedidos}
              onValueChange={() => toggleSwitch('pedidos')}
              trackColor={{ false: '#e8c4d4', true: '#a3214d' }}
              thumbColor="#fcfbfc"
              ios_backgroundColor="#e8c4d4"
            />
          </View>

          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={styles.optionIconContainer}>
                <Ionicons name="gift-outline" size={20} color="#a3214d" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Novidades e Lançamentos</Text>
                <Text style={styles.optionDescription}>Novos produtos e serviços</Text>
              </View>
            </View>
            <Switch
              value={notifications.novidades}
              onValueChange={() => toggleSwitch('novidades')}
              trackColor={{ false: '#e8c4d4', true: '#a3214d' }}
              thumbColor="#fcfbfc"
              ios_backgroundColor="#e8c4d4"
            />
          </View>

          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={styles.optionIconContainer}>
                <Ionicons name="alert-circle-outline" size={20} color="#a3214d" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Alertas Importantes</Text>
                <Text style={styles.optionDescription}>Avisos sobre horários e fechamentos</Text>
              </View>
            </View>
            <Switch
              value={notifications.alertas}
              onValueChange={() => toggleSwitch('alertas')}
              trackColor={{ false: '#e8c4d4', true: '#a3214d' }}
              thumbColor="#fcfbfc"
              ios_backgroundColor="#e8c4d4"
            />
          </View>

          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={styles.optionIconContainer}>
                <Ionicons name="mail-outline" size={20} color="#a3214d" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Notificações por Email</Text>
                <Text style={styles.optionDescription}>Receba também por email</Text>
              </View>
            </View>
            <Switch
              value={notifications.email}
              onValueChange={() => toggleSwitch('email')}
              trackColor={{ false: '#e8c4d4', true: '#a3214d' }}
              thumbColor="#fcfbfc"
              ios_backgroundColor="#e8c4d4"
            />
          </View>
        </View> */}

        {/* STATUS ATUAL */}
        <View style={styles.statusContainer}>
          <View style={styles.statusHeader}>
            <Ionicons 
              name={notifications.promo || notifications.pedidos ? "notifications" : "notifications-off"} 
              size={24} 
              color="#a3214d" 
            />
            <Text style={styles.statusTitle}>Status Atual</Text>
          </View>
          <Text style={styles.statusText}>
            {notifications.promo || notifications.pedidos || notifications.novidades 
              ? "Notificações ativas" 
              : "Todas as notificações desativadas"}
          </Text>
        </View>
      </ScrollView>

      {/* BOTÃO SALVAR 
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleSaveSettings}
        >
          <Text style={styles.saveButtonText}>SALVAR CONFIGURAÇÕES</Text>
        </TouchableOpacity>
      </View>*/}
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
  
  infoBox: {
    backgroundColor: "#fce4ec",
    padding: 20,
    borderRadius: 30,
    marginBottom: 10,
  },
  
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#a3214d",
    marginLeft: 8,
  },
  
  infoText: {
    fontSize: 14,
    color: "#a3214d",
    textAlign: "justify",
    lineHeight: 20,
    opacity: 0.9,
  },
  
  optionsContainer: {
    backgroundColor: "#fce4ec",
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#a3214d",
    marginBottom: 16,
  },
  
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(163, 33, 77, 0.1)",
  },
  
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  
  optionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  
  optionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#a3214d",
    marginBottom: 2,
  },
  
  optionDescription: {
    fontSize: 12,
    color: "#a3214d",
    opacity: 0.7,
  },
  
  systemButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fce4ec",
    padding: 16,
    borderRadius: 15,
    marginBottom: 16,
  },
  
  systemButtonText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#a3214d",
    marginLeft: 12,
  },
  
  statusContainer: {
    backgroundColor: "#fce4ec",
    padding: 20,
    borderRadius: 30,
    marginBottom: 20,
  },
  
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  
  statusTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#a3214d",
    marginLeft: 8,
  },
  
  statusText: {
    fontSize: 14,
    color: "#a3214d",
    opacity: 0.9,
  },
  
  footer: {
    padding: 16,
    backgroundColor: "#fcfbfc",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  
  saveButton: {
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
  
  saveButtonText: {
    color: "#fcfbfc",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default TelaDeNotificacoes;