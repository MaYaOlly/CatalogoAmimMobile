import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './App';
import TelaInicial from './home/telaInicial';

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
    <TelaInicial />
  );
};

export default DetailsScreen;
