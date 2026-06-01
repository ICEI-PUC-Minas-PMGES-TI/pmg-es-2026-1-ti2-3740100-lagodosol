import { Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";

import GestaoClientes from "./GestaoClientes";
import PagamentoQuarto from "./PagamentoQuarto";

import CadastroUsuario from "./pages/Cadastro";
import Login from "./pages/Login";

import ReservaQuarto from "./pages/ReservaQuarto";

import CadastroQuarto from "./CadastroQuarto";

import PerfilUsuario from "./pages/PerfilUsuario";
import Home from "./pages/Home";

import "./App.css";
import GestaoQuartos from "./GestaoQuartos";

function App() {
  return (
    <div className="app-container">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/cadastro" element={<CadastroUsuario />} />

          <Route path="/login" element={<Login />} />

          <Route path="/clientes" element={<GestaoClientes />} />

          <Route path="/reserva" element={<ReservaQuarto />} />

          <Route path="/cadastro-quarto" element={<CadastroQuarto />} />

          <Route path="/perfil" element={<PerfilUsuario />} />

          <Route path="/pagamento" element={<PagamentoQuarto />} />

          <Route path="/quartos" element={<GestaoQuartos />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
