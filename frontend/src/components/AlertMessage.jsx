import "./AlertMessage.css";

function AlertMessage({ type = "info", title, message, onClose }) {
  if (!message) return null;

  return (
    <div className={`alert-message alert-message--${type}`} role="alert">
      <div>
        {title && <strong>{title}</strong>}
        <p>{message}</p>
      </div>

      {onClose && (
        <button type="button" onClick={onClose} aria-label="Fechar aviso">
          x
        </button>
      )}
    </div>
  );
}

export default AlertMessage;
