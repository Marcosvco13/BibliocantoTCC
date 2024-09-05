import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShow(window.scrollY > 100);
    });

    return () => {
      //window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav-container ${show && "nav-container-black"}`}>
      <img
        className="nav-logo"
        src="src\assets\BibliocantoTCC-mainlogo.png"
        alt="Bibliocanto"
      />
      <div className="nav-options-left">
        <a href="/">Início</a>
        <Link to="/CadastrarLivro">Cadastrar Livro</Link>
      </div>
      <div className="nav-options-right">
        <a href="/">Minha Bilioteca</a>
      </div>
      <img className="nav-avatar" src="src\assets\leitor.png" alt="Leitor" />
    </div>
  );
}

export default Nav;
