import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/screens/HomePage';
import LoginScreen from './src/screens/LoginScreen';
import Modulos from './src/screens/Modulos';
import Consumo from './src/screens/Consumo';
import AcompanhamentoConsumo from './src/screens/AcompanhamentoConsumo';
import EdicaoConsumos from './src/screens/EdicaoConsumos';
import Cadastro from './src/screens/Cadastro'; 


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Modulos" component={Modulos} />
      <Stack.Screen name="Consumo" component={Consumo} />
      <Stack.Screen name="AcompanhamentoConsumo" component={AcompanhamentoConsumo} />
      <Stack.Screen name="EdicaoConsumos" component={EdicaoConsumos} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
