import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { RootStackParamList } from '../routes/StackNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import api from '../services/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterScreen(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const CreateUser = async () => {
        const data = { email, password, confirmPassword };

        //valida o formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, insira um e-mail válido.");
            return;
        }

        //valida a senha
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert("A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.");
            return;
        }

        // faz a verificação se as senhas são iguais
        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        // Check if email is already registered
        try {
            const verificaEmail = await api.get('api/Account/UserByEmail', {
                params: { email }
            });

            if (!verificaEmail.data) {

                const response = await api.post('api/Account/CreateUser', data);

                console.log(response);

                const loginResponse = await api.post('api/Account/LoginUser', {
                    email,
                    password
                });

                if (loginResponse.data) {
                    console.log('User logged in successfully:', loginResponse.data);

                    await SecureStore.setItemAsync('email', email);
                    await SecureStore.setItemAsync('token', response.data.token);
                    await SecureStore.setItemAsync('expiration', response.data.expiration);

                    try{
                
                        const responseId = await api.get('api/Account/IdUserByEmail', {
                            params: {
                              email: email,
                            },
                        });
                        
                        localStorage.setItem('Id', responseId.data.id);
                        
                    }catch (erroe){
                        alert('O login falhou ');
                    }
        
                    const navigation = useNavigation<NavigationProp>();
                    navigation.navigate('Home');

                } else {
                    alert('Erro ao efetuar o login. Tente novamente.');
                }

            } else {
                alert('Usuário já cadastrado no sistema!');
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            alert('Erro ao criar usuário. Tente novamente.');
        }

    }

    return (
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Bibliocanto</Text>
            <Text style={styles.subtitle}>Criar Usuário</Text>
    
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
            />
    
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
    
            <TextInput
              style={styles.input}
              placeholder="Confirme a senha"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
    
            <TouchableOpacity style={styles.button} onPress={CreateUser}>
              <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
    },
    formContainer: {
      backgroundColor: 'white',
      padding: 40,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 60,
      elevation: 5,
      width: '80%',
      textAlign: 'center',
    },
    title: {
      fontSize: 40,
      fontFamily: 'Merriweather, serif',
      color: '#47211c',
      marginBottom: 20,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#47211c',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      height: 50,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 4,
      marginBottom: 15,
      paddingHorizontal: 10,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#007BFF',
      paddingVertical: 15,
      borderRadius: 4,
      marginTop: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });


