import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaDeLogin from './logarCadastrar/TelaDeLogin';
import TelaDeCadastro from './logarCadastrar/TelaDeCadastro';
import TelaInicial from './TelaInicial';
import Perfil from '../view/user/perfil';
import TrocarSenha from '../view/user/trocarSenha';
import Notificacoes from '../view/user/notificacoes';
import Informacoes from '../view/user/informacao';
 
export type RootStackParamList = {
  Login: undefined;
  TelaInicial: { nome: string };
  CadastrarUsuário: { nome: string };
  Perfil: undefined;
  TrocarSenha: undefined;
  Notificacoes: undefined;
  Informacoes: undefined;
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

export function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="TrocarSenha" component={TrocarSenha} />
      <Stack.Screen name="Notificacoes" component={Notificacoes} />
      <Stack.Screen name="Informacoes" component={Informacoes} />
    </Stack.Navigator>
  )
}

export default App;
