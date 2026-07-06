import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage";
import "../style/PerfilUsuario.css";
import Loading from "./Loading";
import "../style/Loading.css";

function PerfilUsuario() {
  const navigate = useNavigate();

  const [editando, setEditando] = useState(false);
  const [alterandoSenha, setAlterandoSenha] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const [usuario, setUsuario] = useState(null);

  const [senhaForm, setSenhaForm] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarNovaSenha: "",
  });

  const usuarioLogado = JSON.parse(localStorage.getItem("usuario") || "null");
  const usuarioId = usuarioLogado?.id;

  useEffect(() => {
    if (!usuarioId) {
      return;
    }

    fetch(
      `https://pmg-es-2026-1-ti2-3740100-lagodosol.onrender.com/usuarios/${usuarioId}`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar usuário");
        }
        return response.json();
      })
      .then((data) => setUsuario(data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });

    setAlerta(null);
  }

  function handleSenhaChange(e) {
    setSenhaForm({
      ...senhaForm,
      [e.target.name]: e.target.value,
    });

    setAlerta(null);
  }

  async function salvarPerfil() {
    try {
      const response = await fetch(
        `https://pmg-es-2026-1-ti2-3740100-lagodosol.onrender.com/usuarios/${usuarioId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      const usuarioAtualizado = await response.json();

      setUsuario(usuarioAtualizado);

      setAlerta({
        type: "success",
        title: "Perfil atualizado",
        message: "Suas informações foram salvas com sucesso.",
      });

      setEditando(false);
    } catch {
      setAlerta({
        type: "error",
        title: "Erro",
        message: "Não foi possível atualizar o perfil.",
      });
    }
  }

  async function salvarSenha() {
    if (senhaForm.novaSenha !== senhaForm.confirmarNovaSenha) {
      setAlerta({
        type: "error",
        title: "Senhas diferentes",
        message: "Digite a mesma senha nos dois campos.",
      });
      return;
    }

    try {
      const response = await fetch(
        `https://pmg-es-2026-1-ti2-3740100-lagodosol.onrender.com/usuarios/${usuarioId}/senha`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senhaAtual: senhaForm.senhaAtual,
            novaSenha: senhaForm.novaSenha,
          }),
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      setAlerta({
        type: "success",
        title: "Senha alterada",
        message: "Sua nova senha foi salva com sucesso.",
      });

      setSenhaForm({
        senhaAtual: "",
        novaSenha: "",
        confirmarNovaSenha: "",
      });

      setAlterandoSenha(false);
    } catch {
      setAlerta({
        type: "error",
        title: "Erro",
        message: "Não foi possível alterar a senha.",
      });
    }
  }

  if (!usuarioId) {
    return <div>Faça login para acessar seu perfil.</div>;
  }

  if (!usuario) {
    return <Loading />;
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <button
          type="button"
          className="btn-voltar-perfil"
          onClick={() => navigate("/")}
        >
          ← Voltar para Home
        </button>

        <div className="perfil-header">
          <div className="avatar">{usuario.nome?.charAt(0)}</div>

          <h2>{usuario.nome}</h2>

          <p>Área do Cliente</p>

          {!editando && (
            <button className="btn-editar" onClick={() => setEditando(true)}>
              Editar Perfil
            </button>
          )}
        </div>

        <AlertMessage
          type={alerta?.type}
          title={alerta?.title}
          message={alerta?.message}
          onClose={() => setAlerta(null)}
        />

        <div className="perfil-info">
          <div className="info-item">
            <span>Nome Completo</span>

            {editando ? (
              <input
                type="text"
                name="nome"
                value={usuario.nome || ""}
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
                value={usuario.email || ""}
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
