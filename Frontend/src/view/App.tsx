import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaDeLogin from '../view/logarCadastrar/TelaDeLogin';
import TelaDeCadastro from '../view/logarCadastrar/TelaDeCadastro';
import CarrinhoVazio from "../view/carrinho/CarrinhoVazio";
import CarrinhoCheio from './carrinho/CarrinhoCheio';
import { BottomTabs } from '../navigation/BottomTabs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={TelaDeLogin} />
        <Stack.Screen name="Cadastrar" component={TelaDeCadastro} />
        <Stack.Screen name="Home" component={BottomTabs} />
        <Stack.Screen 
          name="CarrinhoVazio" 
          component={CarrinhoVazio}
          options={{headerShown: true, title: "Carrinho vazio"}} />
        <Stack.Screen 
          name="CarrinhoCheio" 
          component={CarrinhoCheio}
          options={{headerShown: true, title: "Carrinho cheio"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
