import './CadLivro.css';
import api from '../../services/api';
import { useEffect, useState} from 'react';
import Livro from '../../Componentes/Livro/index';

function CadastrarLivro() {

    const [livros, setLivros] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [autores, setAutores] = useState([]);

    useEffect(() => {
        api.getLivros(setLivros);
        api.getGeneros(setGeneros);
        api.getAutores(setAutores);
    }, []);

    return (
        <div className="Container">
            <br />
            <h2>Cadastrar Livro</h2>
            <br />
            <div className="jumbotron jumbotron-custom">
                <div className='row'>
                    <div className='col-4'>
                        <label>Título</label>
                        <input type="text" className='form-control' placeholder='Título do livro'/>
                    </div>
                    <div className='col-4'>
                        <label>Descrição</label>
                        <input type="text" className='form-control' placeholder='Descrição do livro'/>
                    </div>
                    <div className='col-4'>
                        <label>ISBN</label>
                        <input type="text" className='form-control' placeholder='ISBN do livro'/>
                        <br />
                    </div>
                    <div className='col-4'>
                        <label>Autor</label>
                        <select className="form-control">
                            {autores.map((autor) => (
                                <option key={autor.id} value={autor.id}>
                                    {autor.nomeAutor}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='col-4'>
                        <label>Genero</label>
                        <select className="form-control">
                            {generos.map((genero) => (
                                <option key={genero.id} value={genero.id}>
                                    {genero.nomegenero}
                                </option>
                            ))}
                        </select>
                        <br />
                        < button className='btn btn-success btn-lg btn-block'>Cadastrar</button>
                    </div>
                    <div className='col-4'>
                        <label>Link da Capa</label>
                        <input type="text" className='form-control' placeholder='Link da Capa do livro'/>
                    </div>
                </div>
            </div>
            <table className="table table-hover table-dark table-custom">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Genero</th>
                    </tr>
                </thead>
                <tbody>
                    <Livro livros={livros} />
                </tbody>
            </table>
        </div>
    );
}

export default CadastrarLivro;
