import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from "./services/api";

//componentes
import Nav from "./Componentes/Nav/Nav";
import Footer from './Componentes/Footer/index'

//paginas
import CadastrarLivro from "./Paginas/Cadastrar Livros/Index";
import Login from "./Paginas/Login";
import NewUser from "./Paginas/NewUser";
import EditarLivro from "./Paginas/Edit Livro";
import BuscaIsbn from "./Paginas/BuscaLivroIsbn";
import SobreSite from "./Paginas/Sobre o Site";
import PoliticaPrivacidade from "./Paginas/Politica de Privacidade";
import Inicio from "./Paginas/Inicio";
import Biblioteca from "./Paginas/MinhaBiblioteca";

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
          <Route path="/" element={<Inicio />} />
          <Route path="/CadastrarLivro/:id" element={<CadastrarLivro />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/NewUser" element={<NewUser/>}/>
          <Route path="/BuscaIsbn" element={<BuscaIsbn/>}/>
          <Route path="/EditarLivro/:id" element={<EditarLivro />} />
          <Route path="/about" element={<SobreSite />} />
          <Route path="/privacy-policy" element={<PoliticaPrivacidade />} />
          <Route path="/MinhaBiblioteca" element={<Biblioteca/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}