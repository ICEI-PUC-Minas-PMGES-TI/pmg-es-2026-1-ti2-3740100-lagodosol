import { useEffect, useRef, useState } from "react";

const DIAS_SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];
const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function paraISO(date) {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function deISO(iso) {
  if (!iso) return null;
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

function formatarExibicao(iso) {
  if (!iso) return "";
  const data = deISO(iso);
  return data.toLocaleDateString("pt-BR");
}

/**
 * Calendário customizado para escolher uma data, desabilitando:
 * - datas anteriores a `minDateISO`
 * - datas presentes em `disabledISOSet` (Set de strings 'YYYY-MM-DD')
 */
function DatePickerReserva({
  label,
  valueISO,
  onChange,
  minDateISO,
  disabledISOSet,
  placeholder,
  disabled,
}) {
  const [aberto, setAberto] = useState(false);
  const [mesAtual, setMesAtual] = useState(() => {
    const base = valueISO ? deISO(valueISO) : minDateISO ? deISO(minDateISO) : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickFora(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  useEffect(() => {
    if (valueISO) {
      const data = deISO(valueISO);
      setMesAtual(new Date(data.getFullYear(), data.getMonth(), 1));
    }
  }, [valueISO]);

  const minDate = minDateISO ? deISO(minDateISO) : null;

  function isDesabilitado(data) {
    if (minDate && data < minDate) return true;
    if (disabledISOSet && disabledISOSet.has(paraISO(data))) return true;
    return false;
  }

  function gerarDiasDoMes() {
    const ano = mesAtual.getFullYear();
    const mes = mesAtual.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);

    const dias = [];

    // Espaços vazios antes do dia 1
    for (let i = 0; i < primeiroDia.getDay(); i++) {
      dias.push(null);
    }

    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      dias.push(new Date(ano, mes, dia));
    }

    return dias;
  }

  function mudarMes(delta) {
    setMesAtual((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  }

  function selecionarDia(data) {
    if (isDesabilitado(data)) return;
    onChange(paraISO(data));
    setAberto(false);
  }

  const dias = gerarDiasDoMes();
  const hojeISO = paraISO(new Date());

  return (
    <div className="datepicker-wrapper" ref={wrapperRef}>
      {label && <label className="datepicker-label">{label}</label>}

      <button
        type="button"
        className={`datepicker-input ${disabled ? "datepicker-input-disabled" : ""}`}
        onClick={() => !disabled && setAberto((prev) => !prev)}
        disabled={disabled}
      >
        <span className={valueISO ? "" : "datepicker-placeholder"}>
          {valueISO ? formatarExibicao(valueISO) : placeholder || "Selecione a data"}
        </span>
        <span className="datepicker-icone">📅</span>
      </button>

      {aberto && !disabled && (
        <div className="datepicker-popover">
          <div className="datepicker-header">
            <button type="button" onClick={() => mudarMes(-1)} className="datepicker-nav">
              ‹
            </button>
            <span className="datepicker-mes-ano">
              {MESES[mesAtual.getMonth()]} {mesAtual.getFullYear()}
            </span>
            <button type="button" onClick={() => mudarMes(1)} className="datepicker-nav">
              ›
            </button>
          </div>

          <div className="datepicker-dias-semana">
            {DIAS_SEMANA.map((dia, index) => (
              <span key={index}>{dia}</span>
            ))}
          </div>

          <div className="datepicker-grade">
            {dias.map((data, index) => {
              if (!data) {
                return <span key={index} className="datepicker-dia-vazio" />;
              }

              const iso = paraISO(data);
              const desabilitado = isDesabilitado(data);
              const selecionado = iso === valueISO;
              const ehHoje = iso === hojeISO;

              return (
                <button
                  type="button"
                  key={index}
                  className={[
                    "datepicker-dia",
                    desabilitado ? "datepicker-dia-desabilitado" : "",
                    selecionado ? "datepicker-dia-selecionado" : "",
                    ehHoje && !selecionado ? "datepicker-dia-hoje" : "",
                  ].join(" ")}
                  onClick={() => selecionarDia(data)}
                  disabled={desabilitado}
                  title={desabilitado ? "Data indisponível" : undefined}
                >
                  {data.getDate()}
                </button>
              );
            })}
          </div>

          <div className="datepicker-legenda">
            <span>
              <i className="datepicker-legenda-bolinha datepicker-legenda-ocupado" /> Indisponível
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePickerReserva;
