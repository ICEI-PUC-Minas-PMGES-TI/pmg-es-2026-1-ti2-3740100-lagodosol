import { BrowserRouter,  Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";

import GestaoClientes from "./GestaoClientes";
import PagamentoQuarto from "./PagamentoQuarto";
import CadastroQuarto from "./CadastroQuarto";

import ReservaQuarto from "./pages/ReservaQuarto";

import CadastroUsuario from "./pages/Cadastro";
import Login from "./pages/Login";
import GestaoQuartos from "./GestaoQuartos";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />

          <Route path="/cadastro" element={<CadastroUsuario />} />

          <Route path="/login" element={<Login />} />

          <Route path="/clientes" element={<GestaoClientes />} />

          <Route path="/pagamento" element={<PagamentoQuarto />} />

          <Route path="/reserva" element={<ReservaQuarto />} />

          <Route path="/quarto" element={<CadastroQuarto />} />

          <Route path="/gestao-quartos" element={<GestaoQuartos />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;