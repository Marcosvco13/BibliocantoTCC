import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import "./Nav.css";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem('email') || null);

  useEffect(() => {
    // Listener para mudar a navbar quando rolar a página
    window.addEventListener("scroll", () => {
      setShow(window.scrollY > 100);
    });

    return () => {
      window.removeEventListener("scroll", () => setShow(window.scrollY > 100));
    };
  }, []);

  return (
    <div className={`nav-container ${show && "nav-container-black"}`}>
      <img
        className="nav-logo"
        src="src/assets/BibliocantoTCC-mainlogo.png"
        alt="Bibliocanto"
      />
      <div className="nav-options-left">
        <a href="/">Início</a>
        <Link to="/CadastrarLivro">Cadastrar Livro</Link>
      </div>
      <div className="nav-options-right">
        <a href="/">Minha Biblioteca</a>
        {/* Verifica se o usuário está logado */}
        {email ? (
          <span>{email}</span>
        ) : (
          <a href="/login">Entrar</a>
        )}
      </div>
      <FontAwesomeIcon icon={faUserCircle} size="3x" className="nav-avatar" />
    </div>
  );
}
