import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5162'
});

const token = localStorage.getItem('token');

const authorization = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

//metodo get

// Métodos GET para detalhes do livro
api.getLivroById = async function(id) {
    try {
        const response = await api.get(`/api/Livros/${id}`, authorization);
        if (response && response.data) {
            return response.data;
        } else {
            console.error("No data in response");
        }
    } catch (error) {
        console.error("Erro ao buscar o livro:", error);
        throw error;
    }
};

api.getLivros = async function(setLivros) {
    try {
        const response = await api.get('/api/Livros');
        //console.log(response);
        if (response && response.data) {
            setLivros(response.data);
            //console.log(response.data);
        } else {
            console.error("No data in response");
        }
    } catch (error) {
        console.error("Erro ao buscar os livros:", error);
    }
};

api.getGeneros = async function(setGeneros) {
    try {
        const response = await api.get('/api/Generos');
        //console.log(response);
        if (response && response.data) {
            setGeneros(response.data);
            //console.log(response.data);
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
        //console.log(response);
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
        //console.log(response);
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

api.cadastrarEditora = async function(editoraData) {
    try {
        const response = await api.post('/api/Editoras', editoraData, authorization);
        console.log('Editora cadastrado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar a editora:", error);
        throw error;
    }
};

// Métodos PUT
api.putLivro = async function(id, livroData) {
    try {
        const response = await api.put(`/api/Livros/${id}`, livroData, authorization);
        console.log('Livro atualizado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar o livro:", error);
        throw error;
    }
};

api.putAutor = async function(id, autorData) {
    try {
        const response = await api.put(`/api/Autores/${id}`, autorData, authorization);
        console.log('Autor atualizado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar o autor:", error);
        throw error;
    }
};

api.putEditora = async function(id, editoraData) {
    try {
        const response = await api.put(`/api/Editoras/${id}`, editoraData, authorization);
        console.log('Editora atualizada com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar a editora:', error);
        throw error;
    }
};

// Método DELETE para Editoras
api.deleteEditora = async function(id) {
    try {
        const response = await api.delete(`/api/Editoras/${id}`, authorization);
        console.log('Editora excluída com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir a editora:', error);
        throw error;
    }
};

// Método DELETE para Livros
api.deleteLivro = async function(id) {
    try {
        const response = await api.delete(`/api/Livros/${id}`, authorization);
        console.log('Livro excluído com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir o livro:', error);
        throw error;
    }
};

// Método DELETE para Autores
api.deleteAutor = async function(id) {
    try {
        const response = await api.delete(`/api/Autores/${id}`, authorization);
        console.log('Autor excluído com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir o autor:', error);
        throw error;
    }
};


export default api;