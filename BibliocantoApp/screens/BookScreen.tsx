import React, { useEffect, useState } from "react";
import { View, Text, Alert, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useRoute } from '@react-navigation/native';
import api from "../services/api";
import NavBar from "../components/NavBar";
import { faBookmark, faFlag, faSquarePlus } from "@fortawesome/free-regular-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

interface Livro {
    id: number;
    titulo: string;
    caminhoImagem: string;
    descricao: string;
    editoras: string;
    nomeEditora: string;
    isbn: number;
  }

interface Genero {
    generos: string;
    nomeGenero: string;
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
        
                const [dadosLivroResponse, autorLivrosResponse, generoLivrosResponse] = await Promise.all([
                    api.get(`/api/Livros/${idLivro}`, { headers }),
                    api.get(`/api/AutorLivro/livro/${idLivro}`, { headers }),
                    api.get(`/api/GenerosLivro/livro/${idLivro}`, { headers })
                ]);
        
                setSelectedLivro(dadosLivroResponse.data);
        
                const autoresDetalhados = await Promise.all(
                    autorLivrosResponse.data.map(async (autorLivro: any) => {
                        const autorResponse = await api.get(`/api/Autores/${autorLivro.idAutor}`, { headers });
                        return autorResponse.data.nomeAutor;
                    })
                );
                setAutores(autoresDetalhados);
        
                const generosDetalhados = await Promise.all(
                    generoLivrosResponse.data.map(async (generoLivro: any) => {
                        const generoResponse = await api.get(`/api/Generos/${generoLivro.idGenero}`);
                        return generoResponse.data.nomeGenero;
                    })
                );
                setGeneros(generosDetalhados);
        
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
        const idUser = await SecureStore.getItemAsync("IdUser");

        if (!idUser) {
          alert("Usuário não encontrado");
          return;
        }
    
        if (selectedLivro) {
          const idLivro = selectedLivro.id;
          const dados = { idUser, idLivro };

          try{
            const verifica = await api.get("api/MeusLivros/GetMeuLivroByIdLivroIdUser", { params: { idUser, idLivro } });
            const id = verifica.data.id;
            try{
                await api.delete(`/api/MeusLivros/${id}`)
                Alert.alert('Sucesso!', "Livro removido da biblioteca!");
            }catch{
                Alert.alert('Erro!', "Falha ao remover livro na biblioteca!");
            }
          }catch{
            try {
                const response = await api.post("/api/MeusLivros", dados);
                Alert.alert('Sucesso!', "Livro adicionado com sucesso!");
    
            } catch (error) {
                Alert.alert('Erro!', "Falha ao salvar livro na biblioteca!");
            }
          }
        } else {
            Alert.alert('Erro!', "Nenhum livro selecionado");
        }
    };

    const handleAddLido = async () => {
        try {
            const idUser = await SecureStore.getItemAsync("IdUser");
            if (!idUser) {
                Alert.alert("Erro!", "Usuário não encontrado");
                return;
            }
    
            if (!selectedLivro) return;
    
            const idLivro = selectedLivro.id;
    
            // Verifica se o livro está na biblioteca do usuário
            const { data } = await api.get("api/MeusLivros/GetMeuLivroByIdLivroIdUser", {
                params: { idUser, idLivro },
            });
    
            const { id, lido } = data;
            const novoStatus = lido === 1 ? 0 : 1;
            const mensagem = novoStatus === 1 ? "Livro marcado como lido!" : "Livro desmarcado como lido!";
    
            const dataAtualizado = { idLivro, idUser, lido: novoStatus };
    
            await api.put(`api/MeusLivros/lido/${id}`, dataAtualizado, {
                headers: { "Content-Type": "application/json" },
            });
    
            Alert.alert("Sucesso!", mensagem);
        } catch (error) {
            Alert.alert("Erro!", "Ocorreu um problema ao atualizar o status do livro.");
        }
    };

    const handleAddRelido = async () => {
        try {
            const idUser = await SecureStore.getItemAsync("IdUser");
            if (!idUser) {
                Alert.alert("Erro!", "Usuário não encontrado");
                return;
            }
    
            if (!selectedLivro) return;
    
            const idLivro = selectedLivro.id;
    
            // Verifica se o livro está na biblioteca do usuário
            const { data } = await api.get("api/MeusLivros/GetMeuLivroByIdLivroIdUser", {
                params: { idUser, idLivro },
            });
    
            const { id, relido } = data;
            const novoStatus = relido === 1 ? 0 : 1;
            const mensagem = novoStatus === 1 ? "Livro marcado como relido!" : "Livro desmarcado como relido!";
    
            const dataAtualizado = { idLivro, idUser, relido: novoStatus };
    
            await api.put(`api/MeusLivros/relido/${id}`, dataAtualizado, {
                headers: { "Content-Type": "application/json" },
            });
    
            Alert.alert("Sucesso!", mensagem);
        } catch (error) {
            Alert.alert("Erro!", "Ocorreu um problema ao atualizar o status do livro.");
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView 
                contentContainerStyle={{ flexGrow: 10, paddingBottom: 80 }} 
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                
                <View style={styles.header}>
                    <Text style={styles.title}>{selectedLivro ? selectedLivro.titulo : "Livro"}</Text>
                </View>

                <View style={styles.body}>
                    <Image
                        source={{ uri: selectedLivro?.caminhoImagem || "https://via.placeholder.com/150" }}
                        style={styles.image}
                    />

                    <View style={styles.iconContainer}>

                        <TouchableOpacity style={styles.iconButton} onPress={handleAddMeuLivro}>
                            <FontAwesomeIcon icon={faSquarePlus} size={20} color="black" />
                            <Text style={styles.texto}>Adicionar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={handleAddLido}>
                            <FontAwesomeIcon icon={faBookmark} size={20} color="black" />
                            <Text style={styles.texto}>Lido</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={handleAddRelido}>
                            <FontAwesomeIcon icon={faFlag} size={20} color="black" />
                            <Text style={styles.texto}>Relido</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>{selectedLivro ? selectedLivro.descricao : "Descrição do livro"}</Text>
                        <Text style={styles.text}>Autor(es): {autores.length > 0 ? autores.join(", ") : "Autor do livro"}</Text>
                        <Text style={styles.text}>Gênero(s): {generos.length > 0 ? generos.join(", ") : "Gênero do livro"}</Text>
                        <Text style={styles.text}>Editora: {selectedLivro?.nomeEditora || "Editora do livro"}</Text>
                        <Text style={styles.text}>ISBN: {selectedLivro ? selectedLivro.isbn : "ISBN"}</Text>
                    </View>
                </View>
            </ScrollView>
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
        alignItems: "center",
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },
    body: {
        alignItems: "center",
    },
    image: {
        width: 150,
        height: 220,
        marginBottom: 10,
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 15,
        marginTop: 10, // Ajustado para ficar abaixo da capa do livro
    },
    iconButton: {
        padding: 10,
        marginHorizontal: 10,
        alignItems:'center'
    },
    infoContainer: {
        width: "100%",
        paddingHorizontal: 20,
    },
    text: {
        marginBottom: 5,
        textAlign: "justify",
    },
    footer: {
        position: "relative", // Alterado para não ficar fixo na parte inferior
        marginTop: 20, // Espaçamento para separar das informações
    },
    texto:{
        fontSize: 10,
        color: "black",
    }
});