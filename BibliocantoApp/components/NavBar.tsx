import React from 'react';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { RootStackParamList } from '../routes/StackNavigator';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function NavBar() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync('email');
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('expiration');
        await SecureStore.deleteItemAsync('IdUser');
        
        navigation.navigate('Login');
    };

    return (
        <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
                <Icon name="home" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Icon name="logout" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#6200ea',
        paddingVertical: 10,
        paddingHorizontal: 20,
        bottom: 0,
        height: 60,
        position: "static",
    },
    button: {
        padding: 10,
    }
});
