import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList } from "react-native";

// Definição do tipo para os livros
interface Livro {
  id: number;
  titulo: string;
  caminhoImagem: string;
}

export default function HomeScreen() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:5162/api/Livros");
        setLivros(response.data);
      } catch (err) {
        setError("Erro ao carregar os dados.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Função para tratar clique na imagem
  const handleImageClick = (livro: Livro) => {
    console.log(`Livro selecionado: ${livro.titulo}`);
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}

      {livros.length > 0 ? (
        <FlatList
          data={livros}
          keyExtractor={(livro) => livro.id.toString()}
          numColumns={2} // Exibe os livros em duas colunas
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleImageClick(item)}>
              <Image source={{ uri: item.caminhoImagem }} style={styles.livroCard} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.livrosContainer}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Carregando os livros...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  livrosContainer: {
    justifyContent: "center",
  },
  livroCard: {
    width: 100,
    height: 150,
    margin: 8,
    borderRadius: 8,
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
});