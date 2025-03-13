import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { RootStackParamList } from '../routes/StackNavigator';
import api from '../services/api';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Função de login
  const login = async () => {
    const data = { email, password };

    try {

      // Faz a requisição de login
      const response = await api.post('api/Account/LoginUser', data);

      // Armazenando dados de login com SecureStore
      await SecureStore.setItemAsync('email', email);
      await SecureStore.setItemAsync('token', response.data.token);
      await SecureStore.setItemAsync('expiration', response.data.expiration);

      // Buscando o ID do usuário pelo email
      const responseId = await api.get('api/Account/IdUserByEmail', {
        params: { email: email },
      });

      // Armazenando o ID do usuário com SecureStore
      await SecureStore.setItemAsync('IdUser', responseId.data.id);

      // Navegando para a tela principal
      navigation.navigate('Home');

    } catch (error) {
      Alert.alert('Erro', 'Falha no login.');
    }
  };

  // Função para redirecionar para a página de criação de usuário
  const handleCreateUser = () => {

    navigation.navigate('Register');
  };

  // Função para redirecionar para a página de recuperação de senha
  const handleForgotPassword = () => {
    alert("Função de redefinir senha ainda não implementado!");
  };

  // Simulação de login com o Google
  const handleGoogleLogin = () => {
    alert("Login com o Google ainda não implementado!");
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.projectName}>Bibliocanto</Text>

      <Text style={styles.subtitle}>Login do Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder='Senha'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={login}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Entrar com Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Ou</Text>

      <View style={styles.createUserContainer}>
        <TouchableOpacity style={styles.createUserButton} onPress={handleCreateUser}>
          <Text style={styles.buttonText}>Criar Usuário</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  projectName: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: '#db4437',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  forgotPassword: {
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 20,
  },
  orText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  createUserContainer: {
    alignItems: 'center',
  },
  createUserButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
