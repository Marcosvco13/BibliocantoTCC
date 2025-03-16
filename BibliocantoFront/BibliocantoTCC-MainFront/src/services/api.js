import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44331'
});

api.validarToken = async () => {
    return await api.get("/auth/validar-token", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

// Método para obter o token
const getToken = () => localStorage.getItem('token');

// Método GET para buscar livro por ISBN
api.buscarLivroPorISBN = async function(isbn) {
    try {
        const response = await api.get(`/api/Livros/GetLivroByIsbn?isbn=${isbn}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response; // Retorna o objeto completo, incluindo status e data
    } catch (error) {
        console.error("Erro ao buscar o livro:", error);
        throw error;
    }
};

// Função para cadastrar um único autor
api.cadastrarAutor = async (autor) => {
    const response = await api.post("/Autores", autor);
    return response.data; // Retorna o autor cadastrado com o ID
  };
  
  // Função para cadastrar um único gênero
  api.cadastrarGenero = async (genero) => {
    const response = await api.post("/Generos", genero);
    return response.data; // Retorna o gênero cadastrado com o ID
  };
  
// Função para normalizar o nome (para autores e gêneros)
function normalizarNome(nome) {
    if (!nome) return ""; // Retorna uma string vazia se o nome for undefined ou null
    return nome
      .normalize("NFD") // Separa os acentos das letras
      .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
      .toLowerCase(); // Converte para minúsculas
  }
  
  // Função para buscar autor existente com verificação robusta e token de autenticação
api.buscarAutorPorNomeAjustado = async (nomeAutor) => {
  try {
    const response = await api.get("/api/Autores", {
      headers: {
        Authorization: `Bearer ${getToken()}` // Inclui o token de autorização
      }
    });
    const autores = response.data;
    const nomeNormalizado = normalizarNome(nomeAutor);

    // Verifica se já existe um autor com o nome normalizado
    const autorExistente = autores.find(autor => 
      normalizarNome(autor.nomeAutor) === nomeNormalizado
    );

    return autorExistente || null; // Retorna o autor encontrado ou null
  } catch (error) {
    console.error("Erro ao buscar autor:", error);
    throw error;
  }
};

// Função para buscar gênero existente com verificação robusta e token de autenticação
api.buscarGeneroPorNomeAjustado = async (nomeGenero) => {
    try {
      const response = await api.get("/api/Generos", {
        headers: {
          Authorization: `Bearer ${getToken()}` // Inclui o token de autorização
        }
      });
      const generos = response.data;
      const nomeNormalizado = normalizarNome(nomeGenero);
  
      // Verifica se já existe um gênero com o nome normalizado
      const generoExistente = generos.find(genero => 
        normalizarNome(genero.nomegenero) === nomeNormalizado
      );
  
      return generoExistente || null; // Retorna o gênero encontrado ou null
    } catch (error) {
      console.error("Erro ao buscar gênero:", error);
      throw error;
    }
  };
  
  // Função para cadastrar múltiplos autores e gêneros armazenados com verificação de duplicidade
api.cadastrarAutoresEGêneros = async function(autoresArmazenados, generosArmazenados) {
    try {
      const autorIds = await Promise.all(autoresArmazenados.map(async (autor) => {
        const autorExistente = await api.buscarAutorPorNomeAjustado(autor.nome);
        if (autorExistente) {
          //console.log(`Autor já existe: ${autor.nome} com ID ${autorExistente.id}`);
          return autorExistente.id; // Retorna o ID do autor existente
        } else {
          //console.log(`Cadastrando novo autor: ${autor.nome}`);
          const novoAutor = await api.cadastrarAutor({ NomeAutor: autor.nome });
          return novoAutor.id; // Retorna o ID do novo autor
        }
      }));
  
      // Cadastro de gêneros com verificação de duplicidade
      const generoIds = await Promise.all(generosArmazenados.map(async (genero) => {
        const nomeNormalizado = normalizarNome(genero.nome);
        const generoExistente = await api.buscarGeneroPorNomeAjustado(genero.nome);
        
        if (generoExistente) {
          //console.log(`Gênero já existe: ${genero.nome} com ID ${generoExistente.id}`);
          return generoExistente.id; // Retorna o ID do gênero existente
        } else {
          //console.log(`Cadastrando novo gênero: ${genero.nome}`);
          const novoGenero = await api.cadastrarGenero({ NomeGenero: genero.nome });
          return novoGenero.id; // Retorna o ID do novo gênero
        }
      }));
  
      //console.log('Autores e gêneros cadastrados com sucesso:', { autorIds, generoIds });
      return { autorIds, generoIds };
  
    } catch (error) {
      console.error('Erro ao cadastrar autores e gêneros:', error);
      throw error;
    }
  };

  // cadastrar na tabela LivroAutor
  api.cadastrarLivroAutor = async function (idLivro, autorIdSingle) {
    try {
        const autorLivroData = {
            idLivro: Number(idLivro),
            idAutor: Number(autorIdSingle),
        };

        console.log('Dados enviados para a API:', autorLivroData); // Log para verificar os dados

        const response = await axios.post('http://localhost:5162/api/AutorLivro', autorLivroData, {
            headers: {
                Authorization: `Bearer ${getToken()}` // Inclui o token de autorização
            }
        });

        console.log('Livro / Autor cadastrada com sucesso:', response.data);
        return response.data.id; // Retorna o ID da associação, se necessário
    } catch (error) {
        console.error('Erro ao cadastrar Livro / Autor:', error);
        throw error; // Relança o erro para ser tratado em outro lugar, se necessário
    }
};

// cadastrar na tabela LivroGenero
api.cadastrarLivroGenero = async function (idLivro, generoIdSingle) {
    try {
        const generoLivroData = {
            idLivro: Number(idLivro),
            idGenero: Number(generoIdSingle),
        };

        console.log('Dados enviados para a API:', generoLivroData); // Log para verificar os dados

        const response = await axios.post('http://localhost:5162/api/GenerosLivro', generoLivroData, {
            headers: {
                Authorization: `Bearer ${getToken()}` // Inclui o token de autorização
            }
        });

        console.log('Livro / Genero associado com sucesso:', response.data);
        return response.data.id; // Retorna o ID da associação, se necessário
    } catch (error) {
        console.error('Erro ao associar Livro / Genero:', error);
        throw error; // Relança o erro para ser tratado em outro lugar, se necessário
    }
};


api.cadastrarEditora = async function (nomeEditora) {
    try {
        let editoraExistente;

        // Tenta verificar se a editora já existe
        try {
            const verificaExistenciaResponse = await axios.get(`http://localhost:5162/api/Editoras/EditoraByName?name=${nomeEditora}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });

            // Filtra as editoras retornadas para encontrar uma correspondência exata
            editoraExistente = verificaExistenciaResponse.data.find(
                editora => editora.nomeEditora.toLowerCase() === nomeEditora.toLowerCase()
            );

        } catch (error) {
            if (error.response && error.response.status === 404) {
                //console.log(`Editora com o nome "${nomeEditora}" não encontrada, procedendo com o cadastro.`);
            } else {
                console.error('Erro ao verificar editora:', error);
                throw error;
            }
        }

        // Se a editora já existe, retorna o ID
        if (editoraExistente) {
            //console.log('Editora já existente:', editoraExistente);
            return editoraExistente.id;
        }

        // Caso contrário, cadastra uma nova editora
        const response = await axios.post(
            'http://localhost:5162/api/Editoras',
            { nomeEditora },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        );
        //console.log('Editora cadastrada com sucesso:', response.data);
        return response.data.id;

    } catch (error) {
        console.error('Erro ao verificar ou cadastrar editora:', error);
        throw error;
    }
};



api.PreCadastroLivro = async function (titulo, isbn, editoraId) {
    try {

        const response = await axios.post('http://localhost:5162/api/Livros', 
            {
                titulo: titulo,
                isbn: isbn,
                editoraId: editoraId
            },
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        );
        //console.log('Livro pré-cadastrado com sucesso:', response.data);
        return response.data.id;
    } catch (error) {
        console.error('Erro ao pré-cadastrar livro:', error);
        throw error; 
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

// Método GET para buscar uma editora por ID
api.getEditoraByID = async function(editoraid) {
    try {
        // Ajuste da URL para usar um endpoint com ID direto na URL
        const response = await api.get(`/api/Editoras/${editoraid}`, {
            headers: {
                Authorization: `Bearer ${getToken()}` // Incluindo o token de autorização
            }
        });
        
        // Verifica se a resposta contém dados
        if (response && response.data) {
            return response.data;
        } else {
            console.error("No data in response");
        }
    } catch (error) {
        console.error("Erro ao buscar a editora com ID:", error);
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

//metodo get para buscar os autores do livro
api.buscarAutoresPorLivro = async function(idLivro) {
    try {
        const response = await api.get(`/api/AutorLivro/livro/${idLivro}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data; // Retorna os IDs dos autores para esse livro
    } catch (error) {
        console.error("Erro ao buscar autores do livro:", error);
        throw error;
    }
};

//metodo get para buscar o autor por id
api.buscarAutorPorId = async function(idAutor) {
    try {
        const response = await api.get(`/api/Autores/${idAutor}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data; // Retorna os detalhes do autor (nomeAutor)
    } catch (error) {
        console.error("Erro ao buscar autor:", error);
        throw error;
    }
};

//metodo get para buscar o genero por id do livro
api.buscarGenerosPorLivro = async function(idLivro) {
    try {
        const response = await api.get(`/api/GenerosLivro/livro/${idLivro}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data; // Retorna os IDs dos gêneros para esse livro
    } catch (error) {
        console.error("Erro ao buscar gêneros do livro:", error);
        throw error;
    }
};


//metodo get para buscar o genero por id
api.buscarGeneroPorId = async function(idGenero) {
    try {
        const response = await api.get(`/api/Generos/${idGenero}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data; // Retorna os detalhes do gênero (nomegenero)
    } catch (error) {
        console.error("Erro ao buscar gênero:", error);
        throw error;
    }
};

// Método GET para buscar ID da editora pelo nome
api.getEditoraByName = async function(nameEditora) {
    try {
        const response = await api.get(`/api/Editoras/EditoraByName?name=${nameEditora}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        //console.log("Resposta da API:", response.data); // Log da resposta da API
        if (response && response.data) {
            return response.data; // Presumindo que a resposta retorna o ID da editora
        } else {
            console.error("No data in response");
        }
    } catch (error) {
        console.error("Erro ao buscar a editora:", error);
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
            //console.log(response.data);
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
            //console.log(response.data);
        } else {
            console.error("No data in response");
        }
    } catch (error) {
        console.error("Erro ao buscar os editoras:", error);
    }
};

// API para o email do usuario pelo id
api.EmailUserByID = async function(idUser) {
    try {
        const response = await api.get(`/api/Account/IdUserById?idUser=${idUser}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar o usuario:", error);
        throw error;
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
// Função para atualizar livro
api.putLivro = async function(id, livroData) {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    };
  
    console.log("Dados enviados para atualização do livro:", livroData); // Log dos dados
    try {
      const response = await api.put(`/api/Livros/${id}`, livroData, config);
      console.log("Livro atualizado com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar o livro:", error);
      throw error;
    }
  };  

export default api;

//metodos resenha

//Metodo Post Resenha
api.cadastrarResenha = async function(resenhaData) {
    try {
        const response = await api.post('/api/Resenha', resenhaData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log('Resenha enviada com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao enviar a resenha:", error);
        throw error;
    }
};

// Métodos GET para resenhas pelo id do livro e id do usuario
api.getResenhaByUserLivro = async function(idUser, id) {
    try {
        const response = await api.get(`/api/Resenha/ResenhaByUserLivro?idUser=${idUser}&idLivro=${id}`, {
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
        console.error("Erro ao buscar a resenha:", error);
        throw error;
    }
};

// Métodos GET para resenhas pelo id do livro
api.getResenhaByIdLivro = async function(id) {
    try {
        const response = await api.get(`/api/Resenha/ResenhaByLivro?idLivro=${id}`, {
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

//metodos like resenha

// Método post para dar like na resenha
api.cadastrarLikeResenha = async function(likeDataResenha) {
    try {
        const response = await api.post('/api/LikeResenha', likeDataResenha, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log('Like na Resenha enviado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao enviar o like para a resenha:", error);
        throw error;
    }
};

// Método get para buscar like do usuario na resenha especifica
api.LikeResenhaByUserResenha = async function(idUser, idResenha) {
    try {
        const response = await api.get(`/api/LikeResenha/LikeByUserResenha?idUser=${idUser}&idResenha=${idResenha}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log('Like do usuario na Resenha encontrado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar o like do usuario na resenha:", error);
        throw error;
    }
};

// Método get para buscar likes da resenha especifica
api.LikeResenhaByResenha = async function (idResenha) {
    try {
        const response = await api.get(`/api/LikeResenha/LikeByResenha?idResenha=${idResenha}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return []; // Suppresses error logs
        }
        return [];
    }
};


// Método delete excluir like do usuario na resenha
api.DeleteLikeResenha = async function(idLikeResenha) {
    try {
        const response = await api.delete(`/api/LikeResenha/${idLikeResenha}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log('Like na Resenha excluido com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir o like para a resenha:", error);
        throw error;
    }
};

//metodos comentario

// API para buscar comentários em uma resenha
api.ComentarioByResenha = async function(idResenha) {
    try {
        const response = await api.get(`/api/Comentario/ComentarioByResenha?idResenha=${idResenha}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        //console.log('Comentários obtidos com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar comentários:", error);
        throw error;
    }
};

// API para submeter um comentário em uma resenha
api.CadastrarComentario = async function(ComentarioData) {
    try {
        const response = await api.post('/api/Comentario', ComentarioData, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log('Comentário cadastrado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar o comentário:", error);
        throw error;
    }
};

// API dos meus livros / biblioteca

// API para buscar os livros da biblioteca do usuario
api.BibliotecaByUser = async function (idUser) {
    try {
      const response = await api.get(`/api/MeusLivros/BibliotecaByUser?idUser=${idUser}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar os livros do usuário:", error);
      throw error;
    }
  };

  // API para checar se o livro esta na biblioteca do usuario
api.ConfirmaByUserLivro = async function (idUser, idLivro) {
    try {
      const response = await api.get(`/api/MeusLivros/ConfirmaByUserLivro?idLivro=${idLivro}&idUser=${idUser}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao checar se o livro esta na biblioteca do usario:", error);
      throw error;
    }
  };

// RequestsLike Comentario

// API para dar like no comentario
api.cadastrarLikeComentario = async function(likeDataComentario) {
    try {
        const response = await api.post('/api/LikeComentario', likeDataComentario, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log('Like no comentario enviado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao enviar o like para o comentario:", error);
        throw error;
    }
};

// Método get para buscar like do usuario no comentario especifico
api.LikeComentarioByUserComentario = async function(idUser, idComentario) {
    try {
        const response = await api.get(`/api/LikeComentario/LikeByUserComentario?idUser=${idUser}&idComentario=${idComentario}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log('Like do usuario na Comentario encontrado com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar o like do usuario no Comentario:", error);
        throw error;
    }
};

// Método delete excluir like do usuario no comentario
api.DeleteLikeComentario = async function(idLikeComentario) {
    try {
        const response = await api.delete(`/api/LikeComentario/${idLikeComentario}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        console.log('Like no comentario excluido com sucesso:', response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao excluir o like para o comentario:", error);
        throw error;
    }
};

// Método get para buscar likes do comentario especifico
api.LikeComentarioByComentario = async function (idComentario) {
    try {
        const response = await api.get(`/api/LikeComentario/LikeByComentario?idComentario=${idComentario}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return []; // Suppresses error logs
        }
        return [];
    }
};