import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, ScrollView } from "react-native";
import api from "../services/api";
import NavBar from "../components/NavBar";
import * as SecureStore from "expo-secure-store";

interface Generos {
    id: number;
    nomegenero: string;
}

export default function PreferenciaScreen() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [generos, setGeneros] = useState<Generos[]>([]);
    const [selecionados, setSelecionados] = useState<number[]>([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await api.get("api/Generos");
                setGeneros(response.data);
            } catch (err) {
                setError("Erro ao carregar os dados.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const fetchDataByUser = async () => {
            const idUser = await SecureStore.getItemAsync("IdUser");
            if (idUser) {
                try {
                    const response = await api.get('api/Preferencias/PreferenciaByUser', {
                        params: { idUser: idUser },
                    });

                    if(response.data === "Não foi encontrada preferências para os seus usuários."){
                        return;
                    }

                    const idsSelecionados = response.data.map((item: { idGenero: number }) => item.idGenero);
                    setSelecionados(idsSelecionados);
                } catch (err) {
                    console.error("Erro ao carregar preferências do usuário:", err);
                }
            }
        }

        fetchData();
        fetchDataByUser();
    }, []);


    const limpaPreferenciasAntesDeSalvar = async (idUser: string) => {
        if (idUser) {
            try {
                await api.delete(`api/Preferencias/usuario/${idUser}`);
            } catch (err) {
                console.error("Erro ao limpar preferências:", err);
            }
        }
    }

    const toggleGenero = (id: number) => {
        if (selecionados.includes(id)) {
            setSelecionados(selecionados.filter((item) => item !== id));
        } else {
            if (selecionados.length >= 5) {
                Alert.alert("Limite de Gêneros", "Você pode escolher no máximo 5 gêneros.");
                return;
            }
            setSelecionados([...selecionados, id]);
        }
    };

    const handleConfirmar = async () => {
        try {
            const idUser = await SecureStore.getItemAsync("IdUser");

            if (!idUser) {
                Alert.alert("Erro", "Usuário não identificado.");
                return;
            }

            if (selecionados.length === 0) {
                Alert.alert("Atenção", "Selecione pelo menos um gênero.");
                return;
            }

            limpaPreferenciasAntesDeSalvar(idUser);

            for (const idGenero of selecionados) {

                const data = {
                    idUser: idUser,
                    idGenero: idGenero,
                }

                await api.post("api/Preferencias", data);
            }

            Alert.alert("Sucesso", "Preferências salvas com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar preferências:", error);
            Alert.alert("Erro", "Não foi possível salvar as preferências.");
        }
    };

    return (
        <View style={styles.container}>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={{ flex: 1, marginBottom: 10 }}>
                    <Text style={styles.title}>Escolha até 5 gêneros preferidos</Text>
                    {error && <Text style={styles.error}>{error}</Text>}

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text style={styles.loadingText}>Carregando gêneros...</Text>
                        </View>
                    ) : (
                        <View style={styles.generosWrapper}>
                            {generos.map((item) => {
                                const isSelected = selecionados.includes(item.id);
                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() => toggleGenero(item.id)}
                                        style={[
                                            styles.generoCard,
                                            isSelected && styles.generoSelecionado,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.generoText,
                                                isSelected && styles.generoTextSelecionado,
                                            ]}
                                        >
                                            {item.nomegenero}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    )}

                    <TouchableOpacity style={styles.confirmarButton} onPress={handleConfirmar}>
                        <Text style={styles.confirmarText}>Confirmar Preferências</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <NavBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F2F5",
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 10,
        marginTop: 20,
        fontWeight: "bold",
    },
    error: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10,
    },
    scrollContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    generosWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    generoCard: {
        padding: 15,
        margin: 6,
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
    },
    generoSelecionado: {
        backgroundColor: "#007bff",
        borderColor: "#0056b3",
    },
    generoText: {
        color: "#000",
        fontSize: 16,
    },
    generoTextSelecionado: {
        color: "#fff",
        fontWeight: "bold",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    confirmarButton: {
        backgroundColor: "#28a745",
        padding: 12,
        marginHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 12,
    },
    confirmarText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
