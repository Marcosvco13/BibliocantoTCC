import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useRoute } from '@react-navigation/native';
import api from "../services/api";
import NavBar from "../components/NavBar";

interface Livro {
    id: number;
    titulo: string;
    caminhoImagem: string;
    descricao: string;
    editoras: string;
    nomeEditora: string;
    isbn: number;
  }

export default function BookScreen() {
    const route = useRoute();
    const { idLivro } = route.params as { idLivro: number };
    const [error, setError] = useState<string | null>(null);
    const [selectedLivro, setSelectedLivro] = useState<Livro | null>(null);
    const [autores, setAutores] = useState<string[]>([]);
    const [generos, setGeneros] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmail = async () => {
            const storedEmail = await SecureStore.getItemAsync("email");
            setEmail(storedEmail);
        };
        fetchEmail();

        const getToken = async () => {
            return await SecureStore.getItemAsync("token");
        };

        const fetchData = async () => {
            setLoading(true);
    
            try {
                
                const token = await getToken();
                if (!token) throw new Error("Token não encontrado");
                const headers = { Authorization: `Bearer ${token}` };

                const dadosLivro = await api.get(`/api/Livros/${idLivro}`)
                setSelectedLivro(dadosLivro.data);
    
                const autorLivrosResponse = await api.get(`/api/AutorLivro/livro/${idLivro}`, { headers });
                const autoresDetalhados = await Promise.all(
                    autorLivrosResponse.data.map(async (autorLivro: any) => {
                        const autorResponse = await api.get(`/api/Autores/${autorLivro.idAutor}`, { headers });
                        return autorResponse.data.nomeAutor;
                    })
                );
                setAutores(autoresDetalhados);
    
                const generoLivrosResponse = await api.get(`/api/GenerosLivro/livro/${idLivro}`, { headers });
                const generosDetalhados = await Promise.all(
                    generoLivrosResponse.data.map(async (generoLivro: any) => {
                        const generoResponse = await api.get(`/api/Generos/${generoLivro.idGenero}`, { headers });
                        return generoResponse.data.nomeGenero;
                    })
                );
                setGeneros(generosDetalhados);

                console.log(generos);

            } catch (err) {
                setError("Erro ao carregar autores ou gêneros.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        
    }, []);

    const handleAddMeuLivro = async () => {
        const idUser = await SecureStore.getItemAsync("Id");
    
        if (!idUser) {
          alert("Usuário não encontrado");
          return;
        }
    
        if (selectedLivro) {
          const idLivro = selectedLivro.id;
    
          const data = { idUser, idLivro };
    
          try {
            const response = await api.post("/api/MeusLivros", data);
            console.log(response);
            alert("Livro adicionado com sucesso!");

          } catch (error) {
            console.error(error);
            alert("Falha ao salvar livro na biblioteca!");
          }
        } else {
          alert("Nenhum livro selecionado");
        }
      };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{selectedLivro ? selectedLivro.titulo : "Livro"}</Text>
            </View>

            <View style={styles.body}>
                <Image
                    source={{ uri: selectedLivro?.caminhoImagem || "https://via.placeholder.com/150" }}
                    style={styles.image}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>{selectedLivro ? selectedLivro.descricao : "Descrição do livro"}</Text>
                    <Text style={styles.text}>Autor(es): {autores.length > 0 ? autores.join(", ") : "Autor do livro"}</Text>
                    <Text style={styles.text}>Gênero(s): {generos.length > 0 ? generos.join(", ") : "Gênero do livro"}</Text>
                    <Text style={styles.text}>Editora: {selectedLivro?.nomeEditora || "Editora do livro"}</Text>
                    <Text style={styles.text}>ISBN: {selectedLivro ? selectedLivro.isbn : "ISBN"}</Text>
                </View>
            </View>

            {email && (
                <View style={styles.footer}>

                    {/* <TouchableOpacity style={styles.iconButton} onPress={handleEditClick}>
                        <FontAwesome name="edit" size={24} color="black" />
                    </TouchableOpacity> */}

                    {/* {selectedLivro?.linkCompra && (
                        <TouchableOpacity style={styles.iconButton} onPress={() => Linking.openURL(selectedLivro.linkCompra)}>
                            <FontAwesome name="shopping-cart" size={24} color="black" />
                        </TouchableOpacity>
                    )} */}

                    <TouchableOpacity style={styles.iconButton} onPress={handleAddMeuLivro}>
                        <FontAwesome name="bookmark" size={24} color="black" />
                    </TouchableOpacity>

                </View>
            )}

            <NavBar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    backButton: {
        fontSize: 16,
        color: "blue",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    body: {
        flexDirection: "row",
        alignItems: "flex-start",
    },
    image: {
        width: 100,
        height: 150,
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
    },
    text: {
        marginBottom: 5,
        textAlign:"justify",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 15,
    },
    iconButton: {
        padding: 10,
    },
});
