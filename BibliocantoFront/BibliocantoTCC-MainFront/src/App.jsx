import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from "./services/api";

//componentes
import Linha from "./Componentes/Linha de Livros/Linha";
import Nav from "./Componentes/Nav/Nav";
import TodosLivros from './Componentes/Todos Livros/index'
import Footer from './Componentes/Footer/index'

//paginas
import CadastrarLivro from "./Paginas/Cadastrar Livros/Index";
import Login from "./Paginas/Login";
import NewUser from "./Paginas/NewUser";
import CadAutor from './Paginas/Cad Autores/index';
import CadEditora from "./Paginas/Cad Editoras";
import EditarLivro from "./Paginas/Edit Livro";
import BuscaIsbn from "./Paginas/BuscaLivroIsbn";
import SobreSite from "./Paginas/Sobre o Site";
import PoliticaPrivacidade from "./Paginas/Politica de Privacidade";
import Inicio from "./Paginas/Inicio/inicio";

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
          <Route path="/CadastrarLivro/:id" element={<CadastrarLivro />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/NewUser" element={<NewUser/>}/>
          <Route path="/BuscaIsbn" element={<BuscaIsbn/>}/>
          <Route path="/CadAutores" element={<CadAutor />} />
          <Route path="/CadEditoras" element={<CadEditora />} />
          <Route path="/TodosLivros" element={<TodosLivros />} />
          <Route path="/EditarLivro/:id" element={<EditarLivro />} />
          <Route path="/about" element={<SobreSite />} />
          <Route path="/privacy-policy" element={<PoliticaPrivacidade />} />
          <Route path="/inicio" element={<Inicio />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}