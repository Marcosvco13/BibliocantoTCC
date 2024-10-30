import './CadLivro.css';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function CadastrarLivro() {
    const location = useLocation();
    const livroPreCarregado = location.state;

    // Estados para o formulário
    const [titulo, setTitulo] = useState(livroPreCarregado?.titulo || '');
    const [descricao, setDescricao] = useState(livroPreCarregado?.descricao || '');
    const [isbn, setIsbn] = useState(livroPreCarregado?.isbn || '');
    const [caminhoImagem, setCaminhoImagem] = useState(livroPreCarregado?.caminhoImagem || livroPreCarregado?.cover_url || '');
    const [autorId, setAutorId] = useState([]);
    const [generoId, setGeneroId] = useState([]);
    const [editoraId, setEditoraId] = useState('');
    const [linkCompra, setLinkCompra] = useState('');

    const navigate = useNavigate();
    
    const [livros, setLivros] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [autores, setAutores] = useState([]);
    const [editoras, setEditoras] = useState([]);

    useEffect(() => {
        api.getLivros(setLivros);
        api.getGeneros(setGeneros);
        api.getAutores(setAutores);
        api.getEditoras(setEditoras);
    }, []);
    
    const handleCadastrarLivro = async (e) => {
        e.preventDefault();

        // Cria objeto com os dados do livro para envio
        const livroData = {
            titulo,
            descricao,
            isbn,
            caminhoImagem,
            linkCompra,
            autorId: autorId.map(id => parseInt(id)), // converte cada ID para inteiro
            generoId: generoId.map(id => parseInt(id)),
            editoraId: parseInt(editoraId),
        };

        try {
            const livroCadastrado = await api.cadastrarLivro(livroData);
            console.log('Livro cadastrado com sucesso:', livroCadastrado);
            
            // Atualiza a lista de livros e limpa o formulário
            api.getLivros(setLivros);
            setTitulo('');
            setDescricao('');
            setIsbn('');
            setCaminhoImagem('');
            setAutorId([]);
            setGeneroId([]);
            setEditoraId('');
            setLinkCompra('');

            alert('Livro cadastrado com sucesso');
            navigate('/');
            window.location.reload();
        } catch (error) {
            console.error('Erro ao cadastrar o livro:', error);
        }
    };

    const token = localStorage.getItem('token');
    const authorization = {
        headers: { Authorization: `Bearer ${token}` }
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
                <span><Link to="/CadAutores">Cadastrar Autor</Link></span>
                <span><Link to="/CadEditoras">Cadastrar Editora</Link></span>
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
                                onChange={(e) => setAutorId([...e.target.selectedOptions].map(option => option.value))} 
                                multiple
                                required
                            >
                                <option value="">Selecione um ou mais autores</option>
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
                                onChange={(e) => setGeneroId([...e.target.selectedOptions].map(option => option.value))} 
                                multiple
                                required
                            >
                                <option value="">Selecione um ou mais gêneros</option>
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

                        <div className='col-4'>
                            <label>Link de Compra</label>
                            <input 
                                type="text" 
                                className='form-control' 
                                placeholder='Link de compra do livro'
                                value={linkCompra}
                                onChange={(e) => setLinkCompra(e.target.value)}
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