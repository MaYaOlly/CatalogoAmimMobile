import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TelaDeLogin from "./view/pages/logarCadastrar/TelaDeLogin";
import TelaDeCadastro from "./view/pages/logarCadastrar/TelaDeCadastro";
import { Carrinho } from "./view/pages/carrinho/Carrinho";
import TelaDeCheckout1 from "./view/pages/carrinho/TelaDeCheckout1";
import { BottomTabs } from "./navigation/BottomTabs";
import TelaDeCheckout2 from "./view/pages/carrinho/TelaDeCheckout2";
import TelaDeCheckout3 from "./view/pages/carrinho/TelaDeCheckout3";
import QuemSomos from "./view/pages/user/informacao";
import Cupom from "./view/pages/cupom/cupom";
import { AuthProvider } from "./contexts/AuthContext";
import { CarrinhoProvider } from "./contexts/CarrinhoContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <CarrinhoProvider>
        <CheckoutProvider>
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
            name="Cupom"
            component={Cupom}
            options={{ headerShown: true, title: "Cupom" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
        </CheckoutProvider>
      </CarrinhoProvider>
    </AuthProvider>
  );
}

export default App;
