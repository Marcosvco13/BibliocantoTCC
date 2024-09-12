import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5162'
});

const token = localStorage.getItem('token');

const authorization = {
    headers : {
        Authorization : `Bearer ${token}`
    }
};

//metodo get

api.getLivros = async function(setLivros) {
    try {
        const livrosFromApi = await api.get('/api/Livros', authorization).then(response => {setLivros(response.data)}, token);
        setLivros(livrosFromApi.data);
        console.log(livrosFromApi);
    } catch (error) {
        console.error("Erro ao buscar os livros:", error);
    }
}

api.getGeneros = async function(setGeneros) {
    try {
        const generosFromApi = await api.get('/api/Generos', authorization).then(response => {setGeneros(response.data)}, token);
        setGeneros(generosFromApi.data);
        //console.log(generosFromApi);
    } catch (error) {
        console.error("Erro ao buscar os generos:", error);
    }
};

api.getAutores = async function(setAutores) {
    try {
        const autoresFromApi = await api.get('/api/Autores', authorization).then(response => {setAutores(response.data)}, token);
        setAutores(autoresFromApi.data);
        //console.log(autoresFromApi);
    } catch (error) {
        console.error("Erro ao buscar os autores:", error);
    }
};

api.getEditoras = async function(setEditoras) {
    try {
        const editorasFromApi = await api.get('/api/Editoras');
        setEditoras(editorasFromApi.data);
        console.log(editorasFromApi);
    } catch (error) {
        console.error("Erro ao buscar as editoras:", error);
    }
};

//metodo post

api.cadastrarLivro = async function(livroData) {
    try {
        const response = await api.post('/api/Livros', livroData, authorization).then(response => {livroData(response.data)}, token);
        console.log('Livro cadastrado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar o livro:", error);
        throw error;
    }
};

export default api;