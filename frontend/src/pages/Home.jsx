import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import logo from "../assets/logo.jpg";

const FOTOS_CARROSSEL = [
  {
    url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop",
    legenda: "Acomodações de alto padrão",
  },
  {
    url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1600&auto=format&fit=crop",
    legenda: "Piscina com vista para o lago",
  },
  {
    url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1600&auto=format&fit=crop",
    legenda: "Quartos com conforto exclusivo",
  },
  {
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
    legenda: "Experiências inesquecíveis",
  },
];

const QUARTOS_DESTAQUE = [
  {
    id: 1,
    nome: "Standard",
    descricao: "Conforto e praticidade para sua estadia",
    preco: 150,
    imagem:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop",
    icone: "🛏️",
  },
  {
    id: 2,
    nome: "Luxo",
    descricao: "Sofisticação e requinte em cada detalhe",
    preco: 220,
    imagem:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop",
    icone: "✨",
  },
  {
    id: 3,
    nome: "Suíte",
    descricao: "O máximo em exclusividade e elegância",
    preco: 300,
    imagem:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    icone: "👑",
  },
];

const DIFERENCIAIS = [
  {
    icone: "🌅",
    titulo: "Vista para o Lago",
    descricao: "Desperte com uma vista deslumbrante todas as manhãs.",
  },
  {
    icone: "🍽️",
    titulo: "Gastronomia Premium",
    descricao: "Restaurante gourmet com pratos da culinária regional e internacional.",
  },
  {
    icone: "🏊",
    titulo: "Piscina Infinity",
    descricao: "Piscina com borda infinita e área de lazer completa.",
  },
  {
    icone: "💆",
    titulo: "Spa & Bem-estar",
    descricao: "Tratamentos exclusivos para relaxamento total do corpo e mente.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [fotoAtual, setFotoAtual] = useState(0);
  const [menuAberto, setMenuAberto] = useState(false);
  const intervalRef = useRef(null);

  // Simula estado de login — integre com seu contexto/localStorage real
  const usuarioLogado = localStorage.getItem("usuario")
    ? JSON.parse(localStorage.getItem("usuario"))
    : null;

  function iniciarCarrossel() {
    intervalRef.current = setInterval(() => {
      setFotoAtual((prev) => (prev + 1) % FOTOS_CARROSSEL.length);
    }, 5000);
  }

  useEffect(() => {
    iniciarCarrossel();
    return () => clearInterval(intervalRef.current);
  }, []);

  function irParaFoto(index) {
    clearInterval(intervalRef.current);
    setFotoAtual(index);
    iniciarCarrossel();
  }

  function proximaFoto() {
    clearInterval(intervalRef.current);
    setFotoAtual((prev) => (prev + 1) % FOTOS_CARROSSEL.length);
    iniciarCarrossel();
  }

  function fotoAnterior() {
    clearInterval(intervalRef.current);
    setFotoAtual((prev) => (prev - 1 + FOTOS_CARROSSEL.length) % FOTOS_CARROSSEL.length);
    iniciarCarrossel();
  }

  function handleReservar() {
    if (usuarioLogado) {
      navigate("/reserva");
    } else {
      navigate("/login");
    }
  }

  function handleLogout() {
    localStorage.removeItem("usuario");
    setMenuAberto(false);
    window.location.reload();
  }

  return (
    <div className="home-wrapper">

      {/* ── NAVBAR ── */}
      <header className="home-navbar">
        <div className="home-navbar-inner">
          <Link to="/" className="home-logo">
            <img src={logo} alt="Hotel Lago do Sol" />
          </Link>

          <nav className="home-nav">
            <a href="#acomodacoes">Acomodações</a>
            <a href="#diferenciais">Diferenciais</a>
            <a href="#contato">Contato</a>
          </nav>

          <div className="home-nav-acoes">
            {usuarioLogado ? (
              <div className="home-perfil-wrapper">
                <button
                  className="home-perfil-btn"
                  onClick={() => setMenuAberto(!menuAberto)}
                  title={usuarioLogado.nome}
                >
                  <span className="home-avatar">
                    {usuarioLogado.nome?.charAt(0).toUpperCase() || "U"}
                  </span>
                </button>
                {menuAberto && (
                  <div className="home-perfil-menu">
                    <p className="home-perfil-nome">{usuarioLogado.nome}</p>
                    <Link to="/perfil" onClick={() => setMenuAberto(false)}>
                      Meu Perfil
                    </Link>
                    <Link to="/reserva" onClick={() => setMenuAberto(false)}>
                      Minhas Reservas
                    </Link>
                    <button onClick={handleLogout}>Sair</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="home-btn-login">
                Entrar
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── CARROSSEL HERO ── */}
      <section className="home-carrossel">
        {FOTOS_CARROSSEL.map((foto, index) => (
          <div
            key={index}
            className={`home-slide ${index === fotoAtual ? "ativo" : ""}`}
            style={{ backgroundImage: `url(${foto.url})` }}
          />
        ))}

        <div className="home-carrossel-overlay" />

        <div className="home-hero-content">
          <p className="home-hero-tag">Bem-vindo ao</p>
          <h1 className="home-hero-titulo">Hotel Lago do Sol</h1>
          <p className="home-hero-subtitulo">
            {FOTOS_CARROSSEL[fotoAtual].legenda}
          </p>
          <button className="home-btn-reservar-hero" onClick={handleReservar}>
            Reservar Agora
          </button>
        </div>

        <button className="home-carrossel-btn esquerda" onClick={fotoAnterior}>
          ‹
        </button>
        <button className="home-carrossel-btn direita" onClick={proximaFoto}>
          ›
        </button>

        <div className="home-carrossel-dots">
          {FOTOS_CARROSSEL.map((_, index) => (
            <button
              key={index}
              className={`home-dot ${index === fotoAtual ? "ativo" : ""}`}
              onClick={() => irParaFoto(index)}
            />
          ))}
        </div>
      </section>

      {/* ── ACOMODAÇÕES ── */}
      <section className="home-section" id="acomodacoes">
        <div className="home-section-inner">
          <p className="home-section-tag">Nossas Acomodações</p>
          <h2 className="home-section-titulo">Escolha o seu conforto</h2>
          <p className="home-section-subtitulo">
            Quartos cuidadosamente projetados para proporcionar uma estadia perfeita
          </p>

          <div className="home-quartos-grid">
            {QUARTOS_DESTAQUE.map((quarto) => (
              <div key={quarto.id} className="home-quarto-card">
                <div
                  className="home-quarto-imagem"
                  style={{ backgroundImage: `url(${quarto.imagem})` }}
                >
                  <span className="home-quarto-icone">{quarto.icone}</span>
                </div>
                <div className="home-quarto-info">
                  <h3>{quarto.nome}</h3>
                  <p>{quarto.descricao}</p>
                  <div className="home-quarto-rodape">
                    <span className="home-quarto-preco">
                      A partir de <strong>R$ {quarto.preco}</strong>/noite
                    </span>
                    <button
                      className="home-btn-reservar-card"
                      onClick={handleReservar}
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER CTA ── */}
      <section className="home-banner-cta">
        <div className="home-banner-inner">
          <h2>Sua próxima experiência começa aqui</h2>
          <p>Reserve agora e garanta as melhores tarifas com café da manhã incluso</p>
          <button className="home-btn-cta" onClick={handleReservar}>
            Ver Disponibilidade
          </button>
        </div>
      </section>

      {/* ── DIFERENCIAIS ── */}
      <section className="home-section fundo-claro" id="diferenciais">
        <div className="home-section-inner">
          <p className="home-section-tag">Por que nos escolher</p>
          <h2 className="home-section-titulo">Uma experiência única</h2>

          <div className="home-diferenciais-grid">
            {DIFERENCIAIS.map((item, index) => (
              <div key={index} className="home-diferencial-card">
                <span className="home-diferencial-icone">{item.icone}</span>
                <h3>{item.titulo}</h3>
                <p>{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section className="home-section" id="contato">
        <div className="home-section-inner home-contato-grid">
          <div className="home-contato-texto">
            <p className="home-section-tag">Fale Conosco</p>
            <h2 className="home-section-titulo">Estamos à sua disposição</h2>
            <p className="home-section-subtitulo">
              Nossa equipe está pronta para tornar sua estadia inesquecível.
            </p>
            <ul className="home-contato-lista">
              <li>📍 Margem do Lago, Lagoa Santa - MG</li>
              <li>📞 (31) 3000-0000</li>
              <li>✉️ contato@hotellagodosol.com.br</li>
              <li>🕐 Recepção 24 horas</li>
            </ul>
          </div>
          <div className="home-contato-mapa">
            <div className="home-mapa-placeholder">
              <span>🗺️</span>
              <p>Lagoa Santa, Minas Gerais</p>
              <small>À beira do lago</small>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="home-footer">
        <div className="home-footer-inner">
          <div className="home-footer-logo">
            <img src={logo} alt="Hotel Lago do Sol" />
            <p>Hospitalidade que transforma momentos em memórias.</p>
          </div>
          <div className="home-footer-links">
            <h4>Navegação</h4>
            <a href="#acomodacoes">Acomodações</a>
            <a href="#diferenciais">Diferenciais</a>
            <a href="#contato">Contato</a>
          </div>
          <div className="home-footer-links">
            <h4>Conta</h4>
            {usuarioLogado ? (
              <>
                <Link to="/perfil">Meu Perfil</Link>
                <Link to="/reserva">Reservas</Link>
              </>
            ) : (
              <>
                <Link to="/login">Entrar</Link>
                <Link to="/cadastro">Cadastrar</Link>
              </>
            )}
          </div>
        </div>
        <div className="home-footer-rodape">
          <p>©2022 Hotel Lago do Sol | CNPJ: 37.790.093/0001-05</p>
        </div>
      </footer>
    </div>
  );
}
