import { useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <footer className="footer">
        <p>©2022 Hotel Lago do Sol | CNPJ: 37.790.093/0001-05</p>
        <button className="footer-link" onClick={() => setAberto(true)}>
          Termos de Cancelamento
        </button>
      </footer>

      {aberto && (
        <div className="modal-overlay" onClick={() => setAberto(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-titulo">Política de Cancelamento</h3>

            <ul className="modal-lista">
              <li>Cancelamento com <strong>7 dias ou mais</strong> de antecedência: reembolso integral.</li>
              <li>Cancelamento entre <strong>3 e 6 dias</strong>: reembolso de 50% do valor pago.</li>
              <li>Cancelamento com <strong>menos de 3 dias</strong>: sem reembolso.</li>
              <li>No-show (não comparecimento): sem reembolso.</li>
              <li>Alterações de data estão sujeitas à disponibilidade e podem gerar diferença de tarifas.</li>
            </ul>

            <p className="modal-obs">
              Para cancelamentos, entre em contato pelo e-mail <strong>contato@lagodosol.com.br</strong> ou pelo telefone <strong>(31) 99999-0000</strong>.
            </p>

            <button className="modal-fechar" onClick={() => setAberto(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
