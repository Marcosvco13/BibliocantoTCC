import React, { useState } from "react";
import { useRoute } from '@react-navigation/native';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { RootStackParamList } from '../routes/StackNavigator';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import api from '../services/api';


export default function ValidateResetCodeScreen() {
    const route = useRoute();
    const { email } = route.params as { email: string };
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  
    const validateCode = async () => {
       setIsLoading(true); 
        if (!code) {
        Alert.alert("Erro", "Digite o código.");
        setIsLoading(false);
        return;
      }

      try {
        const data = {email, code};
        const response = await api.post('api/Account/ValidateResetCode', data);

        Alert.alert("Aviso", response.data);
  
        navigation.navigate("ResetPassword", { email: email, code: code });

      } catch (error) {
        setIsLoading(false); 
        Alert.alert("Erro", "Código inválido.");
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quase lá!</Text>
        <Text style={styles.subtitle}>Digite o código enviado para seu e-mail:</Text>
        <TextInput placeholder="Código" value={code} onChangeText={setCode} keyboardType="numeric" style={styles.inputContainer}/>
        <TouchableOpacity style={styles.button} onPress={validateCode}>
            {isLoading ?  (
            <ActivityIndicator size="small" color="#fff" />
            ) : (
            <Text style={styles.buttonText}>Validar o código</Text>
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
      backgroundColor: '#f9f9f9',
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