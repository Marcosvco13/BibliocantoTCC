import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "./Nav.css";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem('email') || null);

  const history = useNavigate();

  const handleLogout = () => {
    // Remove o token de autenticação do localStorage (ou de onde estiver armazenado)
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('expiration');

    // Redireciona o usuário para a página de login ou inicial
    history('/login');

    // Atualiza a tela após o redirecionamento (opcional)
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
        <a href="/">Início</a>
        {email ? (
          <span>
            <Link to="/CadastrarLivro">Cadastrar Livro</Link>
          </span>
        ) : ('')}
      </div>
      
      <div className="nav-options-right">
        
        {email ? (
          <span>
            <a href="/">Minha Biblioteca</a>
          </span>
        ) : ('')}

        {/* Verifica se o usuário está logado */}
        {email ? (
          <span>
            {email}
            {/* Ícone de logout */}
            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={handleLogout} />
          </span>
        ) : (
          <a href="/login">Entrar</a>
        )}

      </div>

    </div>
  );
}