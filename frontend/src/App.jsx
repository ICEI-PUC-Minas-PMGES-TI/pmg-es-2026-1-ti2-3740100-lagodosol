import { Routes, Route } from "react-router-dom";

import CadastroUsuario from "./pages/Cadastro";

function App() {
  return (
    <Routes>
      <Route path="/cadastro" element={<CadastroUsuario />} />
    </Routes>
  );
}

export default App;
