import React from 'react';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from '../routes/StackNavigator';
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function NavBar() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
                <Icon name="home" size={24} color="black" />
                <Text style={styles.text}>Início</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MyLibrary')} style={styles.button}>
                <Icon name="book" size={24} color="black" />
                <Text style={styles.text}>Seu Acervo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('OpcoesScreen')} style={styles.button}>
                <Icon name="person" size={30} color="black" />
                <Text style={styles.text}>Perfil</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 'auto',
        bottom: 0,
        left: 0,
        right: 0,
        height: 65,
        position: "absolute",
        borderWidth: 0.2,
        borderRadius: 5,
        elevation: 5,
    },
    button: {
        padding: 10,
        alignItems:'center',
    },
    text: {
        fontSize: 16,
        color: '#757575',
        fontWeight: '500',
    }

});
