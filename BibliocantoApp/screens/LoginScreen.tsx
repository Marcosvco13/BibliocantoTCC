import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet,ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { RootStackParamList } from '../routes/StackNavigator';
import api from '../services/api';
import Icon from "react-native-vector-icons/MaterialIcons";
import { AxiosError } from 'axios';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const login = async () => {
    const data = { email, password };

    if (!email || !password) {
      Alert.alert('Atenção!', 'Por favor, preencha todos os campos para continuar.');
      return;
    }

    setLoading(true);

    try {

      const response = await api.post('api/Account/LoginUser', data);

      await SecureStore.setItemAsync('email', email);
      await SecureStore.setItemAsync('token', response.data.token);
      await SecureStore.setItemAsync('expiration', response.data.expiration);

      const responseId = await api.get('api/Account/IdUserByEmail', {
        params: { email: email },
      });

      await SecureStore.setItemAsync('IdUser', responseId.data.id);

      navigation.navigate('Home');

    }catch (error) {
      setLoading(false);
      let errorMessage = 'Erro desconhecido. Tente novamente.';
      let responseBody = '';
  
      if (error instanceof AxiosError) {
        responseBody = JSON.stringify(error.response?.data, null, 2);
        errorMessage = error.response?.data?.message || 'Erro ao conectar com o servidor.';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      Alert.alert('Atenção!', responseBody);
  }
  };

  const handleCreateUser = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    alert("Função de redefinir senha ainda não implementado!");
  };

  const handleGoogleLogin = () => {
    alert("Login com o Google ainda não implementado!");
  };

  return (
    <View style={styles.loginContainer}>

      <Text style={styles.projectName}>Bibliocanto</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
            <Icon name={showPassword ? "visibility" : "visibility-off"} size={24} color="gray" />
          </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={login}>
        {isLoading ?  (
        <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Entrar com Google</Text>
      </TouchableOpacity>
      
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>ou</Text>

        <TouchableOpacity onPress={handleCreateUser}>
            <Text style={styles.forgotPassword}>Criar Usuário</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 10,
  },
  projectName: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
    fontFamily: "Merriweather",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "100%",
    height: 50,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: "100%",
  },
  eyeButton: {
    padding: 5,
  },
  loginButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: "#db4437",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  createUserButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#007bff",
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },
  orText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
    color: "#888",
  },
});
