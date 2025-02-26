import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from "./services/api";

//componentes
import Nav from "./Componentes/Nav/Nav";
import Footer from "./Componentes/Footer/index";

//paginas
import Login from "./Paginas/Login";
import NewUser from "./Paginas/NewUser";
import EditarLivro from "./Paginas/Edit Livro";
import SobreSite from "./Paginas/Sobre o Site";
import PoliticaPrivacidade from "./Paginas/Politica de Privacidade";
import Inicio from "./Paginas/Inicio";
import Biblioteca from "./Paginas/MinhaBiblioteca";
import PreCadastro from "./Paginas/CadastroLivro/PreCadastro";
import BuscaIsbn from "./Paginas/CadastroLivro/BuscaISBN";
import CadastroLivro from "./Paginas/CadastroLivro/CadastroLivro";
import NavegarGenero from "./Paginas/Navegar Por Generos";
import Livro from "./Paginas/Livro/livro";

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
          <Route path="/Login" element={<Login />} />
          <Route path="/NewUser" element={<NewUser />} />
          <Route path="/EditarLivro/:id" element={<EditarLivro />} />
          <Route path="/about" element={<SobreSite />} />
          <Route path="/privacy-policy" element={<PoliticaPrivacidade />} />
          <Route path="/MinhaBiblioteca" element={<Biblioteca />} />
          <Route path="/BuscaISBN" element={<BuscaIsbn />} />
          <Route path="/PreCadastrar" element={<PreCadastro />} />
          <Route path="/FinalizarCadastro" element={<CadastroLivro />} />
          <Route path="/NavegarPorGenero" element={<NavegarGenero />} />
          <Route path="/Livro/:id" element={<Livro />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
