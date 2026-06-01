import { useState } from "react";
import "./PerfilUsuario.css";

function PerfilUsuario() {
  const [editando, setEditando] = useState(false);

  const [usuario, setUsuario] = useState({
    nome: "Arthur Vieira Lopes",
    email: "arthur@email.com",
    cpf: "123.456.789-00",
    dataNascimento: "15/01/2004",
  });

  const [alterandoSenha, setAlterandoSenha] = useState(false);

  const [senhaForm, setSenhaForm] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarNovaSenha: "",
  });

  function handleChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleSenhaChange(e) {
    setSenhaForm({
      ...senhaForm,
      [e.target.name]: e.target.value,
    });
  }

  function salvarPerfil() {
    alert("Perfil atualizado com sucesso!");
    setEditando(false);
  }

  function salvarSenha() {
    if (senhaForm.novaSenha !== senhaForm.confirmarNovaSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    alert("Senha alterada com sucesso!");

    setSenhaForm({
      senhaAtual: "",
      novaSenha: "",
      confirmarNovaSenha: "",
    });

    setAlterandoSenha(false);
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <div className="perfil-header">
          <div className="avatar">{usuario.nome.charAt(0)}</div>

          <h2>{usuario.nome}</h2>

          <p>Área do Cliente</p>

          {!editando && (
            <button className="btn-editar" onClick={() => setEditando(true)}>
              Editar Perfil
            </button>
          )}
        </div>

        <div className="perfil-info">
          <div className="info-item">
            <span>Nome Completo</span>

            {editando ? (
              <input
                type="text"
                name="nome"
                value={usuario.nome}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.nome}</strong>
            )}
          </div>

          <div className="info-item">
            <span>E-mail</span>

            {editando ? (
              <input
                type="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
              />
            ) : (
              <strong>{usuario.email}</strong>
            )}
          </div>

          <div className="info-item">
            <span>CPF</span>
            <strong>{usuario.cpf}</strong>
          </div>

          <div className="info-item">
            <span>Data de Nascimento</span>
            <strong>{usuario.dataNascimento}</strong>
          </div>
        </div>

        {editando && (
          <div className="perfil-acoes">
            <button className="btn-salvar" onClick={salvarPerfil}>
              Salvar Alterações
            </button>

            <button className="btn-cancelar" onClick={() => setEditando(false)}>
              Cancelar
            </button>
          </div>
        )}

        {!alterandoSenha ? (
          <div className="perfil-acoes">
            <button
              className="btn-editar"
              onClick={() => setAlterandoSenha(true)}
            >
              Alterar Senha
            </button>
          </div>
        ) : (
          <div className="alterar-senha-box">
            <h3>Alterar Senha</h3>

            <div className="form-group">
              <label>Senha Atual</label>

              <input
                type="password"
                name="senhaAtual"
                value={senhaForm.senhaAtual}
                onChange={handleSenhaChange}
              />
            </div>

            <div className="form-group">
              <label>Nova Senha</label>

              <input
                type="password"
                name="novaSenha"
                value={senhaForm.novaSenha}
                onChange={handleSenhaChange}
              />
            </div>

            <div className="form-group">
              <label>Confirmar Nova Senha</label>

              <input
                type="password"
                name="confirmarNovaSenha"
                value={senhaForm.confirmarNovaSenha}
                onChange={handleSenhaChange}
              />
            </div>

            <div className="perfil-acoes">
              <button className="btn-salvar" onClick={salvarSenha}>
                Salvar Nova Senha
              </button>

              <button
                className="btn-cancelar"
                onClick={() => {
                  setAlterandoSenha(false);

                  setSenhaForm({
                    senhaAtual: "",
                    novaSenha: "",
                    confirmarNovaSenha: "",
                  });
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PerfilUsuario;
