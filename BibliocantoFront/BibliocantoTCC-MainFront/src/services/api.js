import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5162'
});

//metodo get

api.getLivros = async function(setLivros) {
    try {
        const livrosFromApi = await api.get('/api/Livros');
        setLivros(livrosFromApi.data);
        console.log(livrosFromApi);
    } catch (error) {
        console.error("Erro ao buscar os livros:", error);
    }
}

api.getGeneros = async function(setGeneros) {
    try {
        const generosFromApi = await api.get('/api/Generos');
        setGeneros(generosFromApi.data);
        //console.log(generosFromApi);
    } catch (error) {
        console.error("Erro ao buscar os generos:", error);
    }
};

api.getAutores = async function(setAutores) {
    try {
        const autoresFromApi = await api.get('/api/Autores');
        setAutores(autoresFromApi.data);
        //console.log(autoresFromApi);
    } catch (error) {
        console.error("Erro ao buscar os autores:", error);
    }
};

//metodo post

api.cadastrarLivro = async function(livroData) {
    try {
        const response = await api.post('/api/Livros', livroData);
        console.log('Livro cadastrado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar o livro:", error);
        throw error;
    }
};

export default api;