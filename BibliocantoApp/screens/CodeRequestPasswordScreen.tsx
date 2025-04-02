import React, { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { RootStackParamList } from '../routes/StackNavigator';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import api from '../services/api';

export default function RequestResetCodeScreen() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const requestCode = async () => {
    setIsLoading(true);  
    if (!email) {
      Alert.alert("Erro", "Digite seu e-mail.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('api/Account/RequestPasswordResetCode', {email});
      Alert.alert("Aviso", response.data);
      navigation.navigate('CodeValidation', { email: email});
    } catch (error) {
      setIsLoading(false);  
      Alert.alert("Erro", "Não foi possível enviar o código.");
    }
  };

  return (
    <View style={styles.container}>

        <Text style = {styles.title}>Problemas para entrar?</Text>
      
        <Text style={styles.subtitle}>Digite seu e-mail para receber o código de redefinição de senha:</Text>
      
        <TextInput placeholder="E-mail" value={email} onChangeText={setEmail}  style={styles.inputContainer}/>

        <TouchableOpacity style={styles.button} onPress={requestCode}>
            {isLoading ?  (
            <ActivityIndicator size="small" color="#fff" />
            ) : (
            <Text style={styles.buttonText}>Solicitar código</Text>
            )}
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F2F5',
      padding: 20,
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
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'Merriweather, serif',
      color: 'black',
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
      flex: 1,
      height: "100%",
    },
    button: {
      backgroundColor: "#007bff",
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      width: "100%",
      marginBottom: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
});