import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from "./services/api";

//componentes
import Linha from "./Componentes/Linha de Livros/Linha";
import Nav from "./Componentes/Nav/Nav";

//paginas
import CadastrarLivro from "./Paginas/Cadastrar Livros/Index";
import Login from "./Paginas/Login";
import NewUser from "./Paginas/NewUser";
import CadAutor from './Paginas/Cad Autores/index';

export default function App() {
  const [generos, setGeneros] = useState([]);
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    api.getGeneros(setGeneros);
    api.getLivros(setLivros);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Linha key={generos.id} />} />
          <Route path="/CadastrarLivro" element={<CadastrarLivro />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/NewUser" element={<NewUser/>}/>
          <Route path="/CadAutores" element={<CadAutor />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}