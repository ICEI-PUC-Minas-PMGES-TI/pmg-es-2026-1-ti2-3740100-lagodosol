import { Routes, Route } from "react-router-dom";

import Footer from "./Footer";

import GestaoClientes from "./GestaoClientes";
import PagamentoQuarto from "./PagamentoQuarto";

import CadastroUsuario from "./Cadastro";
import Login from "./Login";

import ReservaQuarto from "./ReservaQuarto";

import CadastroQuarto from "./CadastroQuarto";

import PerfilUsuario from "./PerfilUsuario";
import Home from "./Home";
import DashboardAdmin from "./DashboardAdmin";

import "../style/App.css";
import GestaoQuartos from "./GestaoQuartos";

import MinhasReservas from "./MinhasReservas";

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

          <Route path="/dashboard" element={<DashboardAdmin />} />

          <Route path="/pagamento" element={<PagamentoQuarto />} />

          <Route path="/quartos" element={<GestaoQuartos />} />

          <Route path="/minhas-reservas" element={<MinhasReservas />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
