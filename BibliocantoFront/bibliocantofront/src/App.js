import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
//import {Modal, ModalBody, ModalFooter, ModalHeadr} from 'reactstrap';
import logo from './assets/logo.png'

function App() {

  const baseUrl = "http://localhost:5162/api/Livros";

  const [data, setData]=useState([]);

  const pedidoGet = async()=>{
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error=>{
        console.log(error);
    })
  };

  useEffect(()=>{
    pedidoGet();
  });

  return (
    <div className="App">
      <br/>
      <h3>Nossa Biblioteca</h3>
      <header className="App-header">
        <img src={logo} alt='Bibliocanto'/>
        <button className="btn btn-success">Incluir um Livro</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Autor</th>
            <th>Genero</th>
            <th>Imagem</th>
            <th>Editora</th>
          </tr>
        </thead>
        <tbody>
          {data.map(livro=>(
            <tr key={livro.id}>
              <td>{livro.id}</td>
              <td>{livro.nomeLivro}</td>
              <td>{livro.idAutor}</td>
              <td>{livro.idGenero}</td>
              <td>{livro.caminhoImagem}</td>
              <td>{livro.idEditora}</td>
              <td>
                <button className='btn btn-primary'>Editar Livro</button>
                <button className='btn btn-danger'>Excluir Livro</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;