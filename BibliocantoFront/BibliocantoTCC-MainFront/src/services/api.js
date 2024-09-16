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
        const response = await api.get('/api/Livros', authorization);
        console.log(response);
        if (response && response.data) {
            setLivros(response.data);
            console.log(response.data);
        } else {
            console.error("No data in response");
        }
    } catch (error) {
        console.error("Erro ao buscar os livros:", error);
    }
};

api.getGeneros = async function(setGeneros) {
    try {
        const response = await api.get('/api/Generos', authorization);
        console.log(response);
        if (response && response.data) {
            setGeneros(response.data);
            console.log(response.data);
        } else {
            console.error("No data in response");
        }
    } catch (error) {
        console.error("Erro ao buscar os generos:", error);
    }
};

api.getAutores = async function(setAutores) {
    try {
        const response = await api.get('/api/Autores', authorization);
        console.log(response);
        if (response && response.data) {
            setAutores(response.data);
            console.log(response.data);
        } else {
            console.error("No data in response");
        }
    } catch (error) {
        console.error("Erro ao buscar os autores:", error);
    }
};

api.getEditoras = async function(setEditoras) {
    try {
        const response = await api.get('/api/Editoras', authorization);
        console.log(response);
        if (response && response.data) {
            setEditoras(response.data);
            console.log(response.data);
        } else {
            console.error("No data in response");
        }
    } catch (error) {
        console.error("Erro ao buscar os editoras:", error);
    }
};

//metodo post

api.cadastrarLivro = async function(livroData) {
    try {
        const response = await api.post('/api/Livros', livroData, authorization);
        console.log('Livro cadastrado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar o livro:", error);
        throw error;
    }
};

api.cadastrarAutor = async function(autorData) {
    try {
        const response = await api.post('/api/Autores', autorData, authorization);
        console.log('Autor cadastrado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar o autor:", error);
        throw error;
    }
};

export default api;