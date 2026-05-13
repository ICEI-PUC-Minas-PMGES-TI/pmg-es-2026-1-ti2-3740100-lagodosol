package com.lagodosol.backend.payment;

public enum PaymentMethod {
    CREDIT_CARD,
    DEBIT_CARD,
    PIX;

    public static PaymentMethod fromString(String source) {
        if (source == null) {
            throw new PaymentValidationException("Método de pagamento inválido.");
        }
        switch (source.trim().toLowerCase()) {
            case "cartao":
                return CREDIT_CARD;
            case "debito":
                return DEBIT_CARD;
            case "pix":
                return PIX;
            default:
                throw new PaymentValidationException("Método de pagamento inválido.");
        }
    }

    public boolean isCard() {
        return this == CREDIT_CARD || this == DEBIT_CARD;
    }
}
