import React, { useEffect, useState, useRef } from "react";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList, Dimensions, ScrollView, Animated } from "react-native";
import { RootStackParamList } from '../routes/StackNavigator';
import api from "../services/api";
import NavBar from "../components/NavBar";
import * as SecureStore from "expo-secure-store";

interface Livro {
    id: number;
    titulo: string;
    caminhoImagem: string;
}

const ITEM_WIDTH = 120;
const ITEM_SPACING = 10;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function HomeScreen() {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [carrosselLivros, setCarrosselLivros] = useState<Livro[]>([]);
    const [error, setError] = useState<string | null>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const flatListRef = useRef<FlatList<Livro>>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("api/Livros");
                const allLivros = response.data;
                setLivros(allLivros);

                const idUser = await SecureStore.getItemAsync("IdUser");
                const responseSugestao = await api.get("api/Livros/SugestaoParaUser", { params: { idUser } });
                const livrosSugestao = responseSugestao.data;

                if (livrosSugestao.length > 0) {
                    setCarrosselLivros(livrosSugestao);

                    setTimeout(() => {
                        const middleIndex = Math.floor(livrosSugestao.length / 2);

                        flatListRef.current?.scrollToOffset({
                            offset: middleIndex * (ITEM_WIDTH + ITEM_SPACING),
                            animated: false, // false para não animar no carregamento inicial
                        });
                    }, 100);

                } else {
                    const randomLivros = allLivros
                        .map((livro: Livro) => ({ livro, sort: Math.random() }))
                        .sort((a: { livro: Livro; sort: number }, b: { livro: Livro; sort: number }) => a.sort - b.sort)
                        .slice(0, 9)
                        .map(({ livro }: { livro: Livro; sort: number }) => livro);
                    setCarrosselLivros(randomLivros);

                    setTimeout(() => {
                        const middleIndex = Math.floor(randomLivros.length / 2);

                        flatListRef.current?.scrollToOffset({
                            offset: middleIndex * (ITEM_WIDTH + ITEM_SPACING),
                            animated: false, // false para não animar no carregamento inicial
                        });
                    }, 100);
                }
            } catch (err) {
                setError("Erro ao carregar os dados.");
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const handleImageClick = (livro: Livro) => {
        navigation.navigate('Book', { idLivro: livro.id });
    };

    const handleAcervoClick = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                {error && <Text style={styles.error}>{error}</Text>}

                {livros.length > 0 ? (
                    <>
                        <Text style={styles.Titulo}>Sugestões para você</Text>

                        <Animated.FlatList
                            ref={flatListRef}
                            data={carrosselLivros}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            snapToInterval={ITEM_WIDTH + ITEM_SPACING}
                            decelerationRate="fast"
                            bounces={false}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                { useNativeDriver: true }
                            )}
                            scrollEventThrottle={16}
                            contentContainerStyle={{
                                paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
                            }}
                            renderItem={({ item, index }) => {
                                const inputRange = [
                                    (index - 1) * (ITEM_WIDTH + ITEM_SPACING),
                                    index * (ITEM_WIDTH + ITEM_SPACING),
                                    (index + 1) * (ITEM_WIDTH + ITEM_SPACING),
                                ];

                                const scale = scrollX.interpolate({
                                    inputRange,
                                    outputRange: [0.9, 1, 0.9],
                                    extrapolate: 'clamp',
                                });

                                return (
                                    <TouchableOpacity onPress={() => handleImageClick(item)}>
                                        <Animated.View style={[styles.carouselItem, { transform: [{ scale }] }]}>
                                            <Image source={{ uri: item.caminhoImagem }} style={styles.carouselImage} />
                                            <Text style={styles.carouselTitle} numberOfLines={1}>{item.titulo}</Text>
                                        </Animated.View>
                                    </TouchableOpacity>
                                );
                            }}
                        />

                        <TouchableOpacity onPress={handleAcervoClick}>
                            <Text style={styles.acervoTitulo}>Ver Acervo Completo</Text>
                        </TouchableOpacity>

                        <FlatList
                            data={livros.slice(0, 3)}
                            keyExtractor={(livro) => livro.id.toString()}
                            numColumns={3}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleImageClick(item)}>
                                    <Image source={{ uri: item.caminhoImagem }} style={styles.livroCard} />
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={styles.livrosContainer}
                            scrollEnabled={false}
                        />
                    </>
                ) : (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text style={styles.loadingText}>Carregando os livros...</Text>
                    </View>
                )}
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
    error: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
        marginVertical: 10,
    },
    carouselItem: {
        width: ITEM_WIDTH,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginRight: ITEM_SPACING,
        marginTop: 10,
    },
    carouselImage: {
        width: 120,
        height: 180,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000',
    },
    carouselTitle: {
        marginTop: 4,
        fontSize: 12,
        textAlign: 'center',
        width: ITEM_WIDTH,
    },
    acervoTitulo: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'grey',
        textAlign: 'left',
        marginTop: 35,
        marginLeft: 10,
        textDecorationLine: 'underline',
    },
    livrosContainer: {
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    livroCard: {
        width: 120,
        height: 180,
        margin: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    Titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'Black',
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 10,
    },
});
