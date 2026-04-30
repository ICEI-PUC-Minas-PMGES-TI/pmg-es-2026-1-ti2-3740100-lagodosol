import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import CadastroUsuario from "../CadastroUsuario";

function App() {
  return (
    <>
      <Header />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<h1>Conteúdo da página</h1>} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
