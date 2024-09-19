import './CadLivro.css';
import api from '../../services/api';
import { useEffect, useState} from 'react';
import Livro from '../../Componentes/Livro/index';
import { Link, useNavigate } from "react-router-dom";

export default function CadastrarLivro() {

    // input formulario
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isbn, setIsbn] = useState('');
    const [caminhoImagem, setCaminhoImagem] = useState('');
    const [autorId, setAutorId] = useState('');
    const [generoId, setGeneroId] = useState('');
    const [editoraId, setEditoraId] = useState('');

    const [livroEditando, setLivroEditando] = useState(null); // Estado para o livro em edição

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({ // Estado para o formulário
        titulo: '',
        descricao: '',
        isbn: '',
        autorId: '',
        generoId: '',
        editoraId: '',
        caminhoImagem: ''
    });

    //armazenar os dados
    const [livros, setLivros] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [autores, setAutores] = useState([]);
    const [editoras, setEditoras] = useState([]);

    //carregar os dados
    useEffect(() => {
        api.getLivros(setLivros);
        api.getGeneros(setGeneros);
        api.getAutores(setAutores);
        api.getEditoras(setEditoras);
    }, []);
    
    // Função para oenvio do formulário
    const handleCadastrarLivro = async (e) => {
        e.preventDefault();

        // Criar objeto com os dados do livro
        const livroData = {
            titulo,
            descricao,
            isbn,
            caminhoImagem,
            autorId: parseInt(autorId),
            generoId: parseInt(generoId),
            editoraId: parseInt(editoraId),
        };

        try {
            // Chamar api para cadastrar o livro
            const livroCadastrado = await api.cadastrarLivro(livroData);
            console.log('Livro cadastrado com sucesso:', livroCadastrado);
            
            // Atualiza a lista depois do cadastro
            api.getLivros(setLivros);
            
            // Limpar o formulário
            setTitulo('');
            setDescricao('');
            setIsbn('');
            setCaminhoImagem('');
            setAutorId('');
            setGeneroId('');
            setEditoraId('');

            alert('livro cadastrado com sucesso')

            navigate('/');

            window.location.reload();
        } catch (error) {
            console.error('Erro ao cadastrar o livro:', error);
        }
    };

    const token = localStorage.getItem('token');

    const authorization = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/Livros/${id}`, authorization);
            setLivros(livros.filter(livro => livro.id !== id)); 
            console.log('Livro deletado com sucesso!');
        } catch (error) {
            console.error('Erro ao deletar o livro:', error);
        }
    };

    return (
        <div className="Container-CadLivro">
            
            <div className="linha-crear">
                <span>
                    <Link to="/CadAutores">Cadastrar Autor</Link>
                </span>
                <span>
                    <Link to="/CadEditoras">Cadastrar Editora</Link>
                </span>
                <hr className='hrCriarLivro'></hr>
            </div>

            <br />
            <h2>Cadastrar Livro</h2>
            <br />

            <div className="jumbotron jumbotron-custom">
                <form onSubmit={handleCadastrarLivro} className='formCad'>
                    <div className='row'>
                        
                        <div className='col-4'>
                            <label>Título</label>
                            <input 
                                type="text" 
                                className='form-control' 
                                placeholder='Título do livro'
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)} 
                                required
                            />
                        </div>

                        <div className='col-4'>
                            <label>Descrição</label>
                            <input 
                                type="text" 
                                className='form-control' 
                                placeholder='Descrição do livro'
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)} 
                                required
                            />
                        </div>

                        <div className='col-4'>
                            <label>ISBN</label>
                            <input 
                                type="text" 
                                className='form-control' 
                                placeholder='ISBN do livro'
                                value={isbn}
                                onChange={(e) => setIsbn(e.target.value)} 
                                required
                            />
                            <br />
                        </div>

                        <div className='col-4'>
                            <label>Autor</label>
                            <select 
                                className="form-control"
                                value={autorId}
                                onChange={(e) => setAutorId(e.target.value)} 
                                required
                            >
                                <option value="">Selecione um autor</option>
                                {autores.map((autor) => (
                                    <option key={autor.id} value={autor.id}>
                                        {autor.nomeAutor}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='col-4'>
                            <label>Gênero</label>
                            <select 
                                className="form-control"
                                value={generoId}
                                onChange={(e) => setGeneroId(e.target.value)} 
                                required
                            >
                                <option value="">Selecione um gênero</option>
                                {generos.map((genero) => (
                                    <option key={genero.id} value={genero.id}>
                                        {genero.nomegenero}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='col-4'>
                            <label>Editora</label>
                            <select 
                                className="form-control"
                                value={editoraId}
                                onChange={(e) => setEditoraId(e.target.value)} 
                                required
                            >
                                <option value="">Selecione uma editora</option>
                                {editoras.map((editora) => (
                                    <option key={editora.id} value={editora.id}>
                                        {editora.nomeEditora}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='col-4'>
                            <label>Link da Capa</label>
                            <input 
                                type="text" 
                                className='form-control' 
                                placeholder='Link da Capa do livro'
                                value={caminhoImagem}
                                onChange={(e) => setCaminhoImagem(e.target.value)}
                                required 
                            />
                        </div>

                    </div>
                    <br />
                    <button type="submit" className='btn btn-success btn-lg btn-block'>
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}