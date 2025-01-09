import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import api from "../../services/api";
import "./Nav.css";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem('email') || null);

  const location = useLocation();
  const isOnRestrictedPage = location.pathname === '/BuscaIsbn' || location.pathname.includes('/CadastrarLivro');

  const history = useNavigate();

  const handleLogout = () => {
    // Remove o token de autenticação do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('expiration');
    localStorage.removeItem('Id');

    // Redireciona o usuário para a página de login ou inicial
    history('/login');

    // Atualiza a tela após o redirecionamento
    window.location.reload();
  };

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
        <a href="/">Acervo de Livros</a>
      </div>

      <div className="nav-options-left-2">
      {email && !isOnRestrictedPage && (
        <>
          <a href="/BuscaISBN">Cadastrar Livro</a>
        </>
      )}
    </div>

      <div className="nav-options-right">

        {email ? (
          <span>
            <a href="/MinhaBiblioteca">Minha Biblioteca</a>
          </span>
        ) : ('')}

        {email ? (
          <span>
            {email}
            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={handleLogout} />
          </span>
        ) : (
          <a href="/login">Entrar</a>
        )}

      </div>

    </div>
  );
}