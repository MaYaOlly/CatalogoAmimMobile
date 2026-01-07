import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaDeLogin from '../view/logarCadastrar/TelaDeLogin';
import TelaDeCadastro from '../view/logarCadastrar/TelaDeCadastro';
import { BottomTabs } from '../navigation/BottomTabs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={TelaDeLogin} />
        <Stack.Screen name="Cadastrar" component={TelaDeCadastro} />
        <Stack.Screen name="Home" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
