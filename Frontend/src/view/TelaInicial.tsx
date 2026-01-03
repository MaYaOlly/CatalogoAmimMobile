import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App';

type DetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'TelaInicial'
>;

type Props = {
  route: DetailsScreenRouteProp;
};

const DetailsScreen = ({ route }: Props) => {
  const { nome } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bem-vindo à tela Inicial da Amim.</Text>
      <Text>Ainda estamos em construção!</Text>
    </View>
  );
};

export default DetailsScreen;
