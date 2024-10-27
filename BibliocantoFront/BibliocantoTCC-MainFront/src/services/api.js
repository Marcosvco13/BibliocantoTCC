import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5162'
});

// Método para obter o token
const getToken = () => localStorage.getItem('token');

// Método GET para buscar livro por ISBN
api.buscarLivroPorISBN = async function(isbn) {
    try {
        const response = await api.get(`/api/Livros/ISBN/${isbn}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar o livro:", error);
        throw error;
    }
};

// Função para cadastrar autores e gêneros armazenados
api.cadastrarAutoresEGêneros = async function(autoresArmazenados, generosArmazenados) {
    try {
        const autorIds = await Promise.all(autoresArmazenados.map(async (autor) => {
            console.log(`Cadastrando autor: ${autor.nome}`); // Log para o cadastro
            const novoAutor = await api.cadastrarAutor({ NomeAutor: autor.nome });
            return novoAutor.id; // Retornar ID do novo autor
        }));

        const generoIds = await Promise.all(generosArmazenados.map(async (genero) => {
            console.log(`Cadastrando gênero: ${genero.nome}`); // Log para o cadastro
            // Modificado para usar 'NomeGenero' ou o que sua API espera
            const novoGenero = await api.cadastrarGenero({ NomeGenero: genero.nome });
            return novoGenero.id; // Retornar ID do novo gênero
        }));

        console.log('Autores e gêneros cadastrados com sucesso:', { autorIds, generoIds });

    } catch (error) {
        console.error('Erro ao cadastrar autores e gêneros:', error);
    }
};


// Cadastro de autor
api.cadastrarAutor = async function(autorData) {
    try {
        const response = await api.post('/api/Autores', autorData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log('Autor cadastrado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar o autor:", error);
        throw error;
    }
};

// Cadastro de gênero
api.cadastrarGenero = async function(generoData) {
    try {
        const response = await api.post('/api/Generos', generoData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log('Gênero cadastrado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar o gênero:", error);
        throw error;
    }
};



// Método GET para buscar livros de um gênero específico
api.getLivrosByGenero = async function(generoId) {
    try {
        const response = await api.get(`/api/GenerosLivro/GetById?id=${generoId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        if (response && response.data) {
            return response.data;
        } else {
            console.error("No data in response");
        }
    } catch (error) {
        console.error("Erro ao buscar os livros do gênero:", error);
        throw error;
    }
};

// Método GET para buscar id generos de pelo nome
api.getGeneroByName = async function(nameGenero) {
    try {
        const response = await api.get(`/api/Generos/GeneroByName?name=${nameGenero}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        if (response && response.data) {
            return response.data;
        } else {
            console.error("No data in response");
        }
    } catch (error) {
        console.error("Erro ao buscar o generos:", error);
        throw error;
    }
};

// Método GET para buscar id autor pelo nome
api.getAutorByName = async function(nameAutor) {
    try {
        const response = await api.get(`/api/Autores/AutorByName?name=${nameAutor}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        if (response && response.data) {
            return response.data;
        } else {
            console.error("No data in response");
        }
    } catch (error) {
        console.error("Erro ao buscar o generos:", error);
        throw error;
    }
};

// Métodos GET para detalhes do livro
api.getLivroById = async function(id) {
    try {
        const response = await api.get(`/api/Livros/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
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
        const response = await api.get('/api/Livros', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        if (response && response.data) {
            setLivros(response.data);
        } else {
            console.error("No data in response");
        }
    } catch (error) {
        console.error("Erro ao buscar os livros:", error);
    }
};

api.getGeneros = async function() {
    try {
        const response = await api.get('/api/Generos', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        if (response && response.data) {
            return response.data;
        } else {
            console.error("No data in response");
        }
    } catch (error) {
        console.error("Erro ao buscar os generos:", error);
        throw error;
    }
};

api.getAutores = async function(setAutores) {
    try {
        const response = await api.get('/api/Autores', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
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
        const response = await api.get('/api/Editoras', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
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

api.cadastrarLivro = async function(livroData) {
    try {
        const response = await api.post('/api/Livros', livroData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log('Livro cadastrado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar o livro:", error);
        throw error;
    }
};

// Métodos PUT
api.putLivro = async function(id, livroData) {
    try {
        const response = await api.put(`/api/Livros/${id}`, livroData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log('Livro atualizado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar o livro:", error);
        throw error;
    }
};

api.putAutor = async function(id, autorData) {
    try {
        const response = await api.put(`/api/Autores/${id}`, autorData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log('Autor atualizado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar o autor:", error);
        throw error;
    }
};

api.putEditora = async function(id, editoraData) {
    try {
        const response = await api.put(`/api/Editoras/${id}`, editoraData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
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
        const response = await api.delete(`/api/Editoras/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
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
        const response = await api.delete(`/api/Livros/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log('Livro excluído com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir o livro:', error);
        throw error;
    }
};

export default api;
