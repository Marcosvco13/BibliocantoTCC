import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import BookScreen from '../screens/BookScreen';
import MyLibrary from '../screens/MyLibraryScreen';
import CodeRequest from '../screens/CodeRequestPasswordScreen';
import CodeValidation from '../screens/CodeValidationScreen';
import ResetPassword from '../screens/ResetPasswordScreen';
import { Image } from 'react-native';

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: undefined;
  Book: { idLivro: number };
  MyLibrary: undefined;
  CodeRequest : undefined;
  CodeValidation: { email: string };
  ResetPassword: { email: string; code: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro',}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login', headerBackVisible: false, headerShown: false }} />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Acervo', 
          headerBackVisible: false,
          headerTitle: () => (
            <Image 
              source={require('../assets/BibliocantoTCC-mainlogo.png')} 
              style={{ width: 35, height: 35 }} 
            />
          ),
        }} 
      />
      <Stack.Screen name="Book" component={BookScreen} options={{ title: 'Sobre o livro' }} />
      <Stack.Screen name="CodeValidation" component={CodeValidation} options={{ title: 'Validar Código', headerBackVisible: true }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: 'Redefinir Senha', headerBackVisible: true }} />
      <Stack.Screen name="CodeRequest" component={CodeRequest} options={{ title: 'Recuperar Senha', headerBackVisible: true }} />
      <Stack.Screen name="MyLibrary" component={MyLibrary} options={{ title: 'Minha Biblioteca', headerBackVisible: true  }} />
    </Stack.Navigator>
  );
}
