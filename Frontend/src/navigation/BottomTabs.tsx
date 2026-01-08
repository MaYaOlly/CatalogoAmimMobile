import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import TelaInicial from '../view/home/telaInicial';
import CarrinhoVazio from '../view/carrinho/CarrinhoVazio';
import TelaDeCupom from '../view/cupom/cupom';
import TelaDeConfiguracao from '../view/user/acessoUser';

import IconeDeInicio from '../../assets/icons/navbar1Clicavel.png';
import IconeDeCarrinho from '../../assets/icons/navbar2Clicavel.png';
import IconeDeCupom from '../../assets/icons/navbar3Clicavel.png';
import IconeDePerfil from '../../assets/icons/navbar4Clicavel.png';

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#a3214d',
        tabBarInactiveTintColor: '#9e9e9e',
        tabBarStyle: {
          height: 100,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={TelaInicial}
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <Image source={IconeDeInicio} style={{ width: 30, height: 30, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Carrinho"
        component={CarrinhoVazio}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={IconeDeCarrinho} style={{ width: 30, height: 30, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Cupom"
        component={TelaDeCupom}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={IconeDeCupom} style={{ width: 30, height: 30, tintColor: color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={TelaDeConfiguracao}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={IconeDePerfil} style={{ width: 30, height: 30, tintColor: color }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
