import { Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";

import GestaoClientes from "./GestaoClientes";
<<<<<<< HEAD
import PagamentoQuarto from "./PagamentoQuarto";
=======
import logo from "./assets/logo.jpg";
import CadastroQuarto from "./CadastroQuarto";
>>>>>>> 2e52e01 (colocando o cadastro de quarto dentro do app principal)

import CadastroUsuario from "./pages/Cadastro";
import Login from "./pages/Login";

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
<<<<<<< HEAD

          <Route path="/pagamento" element={<PagamentoQuarto />} />
=======
          <Route path="/quarto" element={<CadastroQuarto />} />
>>>>>>> 2e52e01 (colocando o cadastro de quarto dentro do app principal)
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
