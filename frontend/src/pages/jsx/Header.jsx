import { Link } from "react-router-dom";
import "../style/Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Lago do Sol
        </Link>

        <nav className="nav" aria-label="Navegação principal">
          <Link to="/">HOTEL</Link>
          <Link to="/#acomodacoes">ACOMODAÇÕES</Link>
          <Link to="/#diferenciais">PACOTES</Link>
          <Link to="/#contato">GASTRONOMIA</Link>
          <Link to="/#contato">EVENTOS</Link>
          <Link to="/#contato">CORPORATIVO</Link>
        </nav>
      </div>
    </header>
  );
}
