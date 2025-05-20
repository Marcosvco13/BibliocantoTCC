import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  const [email, setEmail] = useState(localStorage.getItem("email") || null);
  const location = useLocation();
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("expiration");
    localStorage.removeItem("Id");
    history("/login");
    window.location.reload();
  };

  return (
    <div className="nav-container">
      <div className="nav-titulo">
        <img
          className="nav-logo"
          src="src/assets/BibliocantoTCC-mainlogo.png"
          alt="Bibliocanto"
        />
        <h3>Bibliocanto</h3>
      </div>

      <div className="nav-links">
        <h5>Encontre seu Livro</h5>
        <Link
          to="/"
          className={
            [
              "/",
              "/PreCadastrar",
              "/LivrosPorGenero",
              "/LivrosPorEditora",
            ].includes(location.pathname)
              ? "active-link"
              : ""
          }
        >
          <i className="bi bi-house"></i> Acervo de Livros
        </Link>
        {email && (
          <Link
            to="/BuscaISBN"
            className={
              ["/BuscaISBN", "/PreCadastrar", "/FinalizarCadastro"].includes(
                location.pathname
              )
                ? "active-link"
                : ""
            }
          >
            <i className="bi bi-journal-plus"></i> Cadastrar Livro
          </Link>
        )}
      </div>

      <div className="nav-links">
        <h5>Seus Livros</h5>
        {email && (
          <Link
            to="/MinhaBiblioteca"
            className={
              location.pathname === "/MinhaBiblioteca" ? "active-link" : ""
            }
          >
            <i className="bi bi-book"></i> Minha Biblioteca
          </Link>
        )}
        {email && (
          <Link
            to="/Lidos"
            className={location.pathname === "/Lidos" ? "active-link" : ""}
          >
            <i className="bi bi-bookmark-star"></i> Lidos
          </Link>
        )}
        {email && (
          <Link
            to="/Relidos"
            className={location.pathname === "/Relidos" ? "active-link" : ""}
          >
            <i className="bi bi-bookmark-heart"></i> Relidos
          </Link>
        )}
      </div>

      <div className="nav-links">
        <h5>Bibliocanto</h5>
        {email && (
          <Link
            to="/privacy-policy"
            className={
              location.pathname === "/privacy-policy" ? "active-link" : ""
            }
          >
            <i className="bi bi-info-circle"></i> Política de Privacidade
          </Link>
        )}
        {email && (
          <Link
            to="/about"
            className={location.pathname === "/about" ? "active-link" : ""}
          >
            <i className="bi bi-globe2"></i> Sobre o Site
          </Link>
        )}
      </div>

      <div className="nav-links">
        <h5>Usuário</h5>
        {email && (
          <Link
            to="/PerfilUsuario"
            className={
              location.pathname === "/PerfilUsuario" ? "active-link" : ""
            }
          >
            <i className="bi bi-person"></i> Perfil do Usuário
          </Link>
        )}
        {email && (
          <Link
            to="/PerfilUsuario"
            className={
              location.pathname === "/" ? "active-link" : ""
            }
          >
            <i className="bi bi-star"></i> Preferências
          </Link>
        )}
      </div>

      <div className="nav-footer">
        {email ? (
          <span className="user-info">
            {email}
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="logout-icon"
              onClick={handleLogout}
            />
          </span>
        ) : (
          <Link to="/login">Entrar</Link>
        )}
      </div>
    </div>
  );
}
