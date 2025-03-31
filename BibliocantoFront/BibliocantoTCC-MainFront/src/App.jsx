import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from "./services/api";

//componentes
import Nav from "./Componentes/Nav/Nav";

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
import Livro from "./Paginas/Livro/livro";
import Lidos from "./Paginas/TagLidos/Lidos";
import Relidos from "./Paginas/TagRelidos/Relidos";

export default function App() {

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
          <Route path="/Livro/:id" element={<Livro />} />
          <Route path="/Lidos" element={<Lidos />} />
          <Route path="/Relidos" element={<Relidos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
