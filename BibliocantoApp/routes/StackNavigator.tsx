import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';


export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
    </Stack.Navigator>
  );
}
