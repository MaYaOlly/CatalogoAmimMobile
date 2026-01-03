import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaDeLogin from './logarCadastrar/TelaDeLogin';
import TelaDeCadastro from './logarCadastrar/TelaDeCadastro';
import TelaInicial from './TelaInicial';

export type RootStackParamList = {
  Login: undefined;
  TelaInicial: { nome: string };
  CadastrarUsuário: { nome: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={TelaDeLogin} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="CadastrarUsuário" component={TelaDeCadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
