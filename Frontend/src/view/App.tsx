import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaDeLogin from "../view/logarCadastrar/TelaDeLogin";
import TelaDeCadastro from "../view/logarCadastrar/TelaDeCadastro";
import CarrinhoCheio, { Carrinho } from "./carrinho/Carrinho";
import TelaDeCheckout1 from "./carrinho/TelaDeCheckout1";
import { BottomTabs } from "../navigation/BottomTabs";
import { StackScreen } from "react-native-screens";
import TelaDeCheckout2 from "./carrinho/TelaDeCheckout2";
import TelaDeCheckout3 from "./carrinho/TelaDeCheckout3";
import QuemSomos from "./user/informacao";
import Perfil, { TelaDePerfil } from "./user/perfil";
import TelaDeNotificacoes from "./user/notificacoes";
import Cupom from "./cupom/cupom";
import { AuthProvider } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={BottomTabs} />
          <Stack.Screen name="Login" component={TelaDeLogin} />

          <Stack.Screen name="Cadastrar" component={TelaDeCadastro} />

          <Stack.Screen
            name="Carrinho"
            component={Carrinho}
            options={{ headerShown: true, title: "Carrinho" }}
          />

          <Stack.Screen
            name="TelaDeCheckout1"
            component={TelaDeCheckout1}
            options={{ headerShown: true, title: "Tela De Checkout 1" }}
          />

          <Stack.Screen
            name="TelaDeCheckout2"
            component={TelaDeCheckout2}
            options={{ headerShown: true, title: "Tela De Checkout 2" }}
          />

          <Stack.Screen
            name="TelaDeCheckout3"
            component={TelaDeCheckout3}
            options={{ headerShown: true, title: "Tela De Checkout 3" }}
          />

          <Stack.Screen
            name="QuemSomos"
            component={QuemSomos}
            options={{ headerShown: true, title: "QuemSomos" }}
          />

          <Stack.Screen
            name="TelaDePerfil"
            component={TelaDePerfil}
            options={{ headerShown: true, title: "Perfil" }}
          />

          <Stack.Screen
            name="TelaDeNotificacoes"
            component={TelaDeNotificacoes}
            options={{ headerShown: true, title: "TelaDeNotificacoes" }}
          />

          <Stack.Screen
            name="Cupom"
            component={Cupom}
            options={{ headerShown: true, title: "Cupom" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
