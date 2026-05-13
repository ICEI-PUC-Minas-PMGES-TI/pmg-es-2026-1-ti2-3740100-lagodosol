package com.lagodosol.backend.payment;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

public class PaymentService {

    private static final Locale BRAZIL = new Locale("pt", "BR");
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;

    public PaymentResponseDTO process(PaymentRequestDTO request) {
        validateRequest(request);

        BigDecimal subtotalDiarias = calculateSubtotalDiarias(request.getReserva());
        BigDecimal subtotalExtras = calculateSubtotalExtras(request.getReserva());
        BigDecimal total = subtotalDiarias.add(subtotalExtras);

        String mensagem = String.format(
                "Pagamento aprovado! Total: %s. Reserva: %s de %s até %s.",
                formatCurrency(total),
                request.getReserva().getQuarto(),
                formatDate(request.getReserva().getCheckIn()),
                formatDate(request.getReserva().getCheckOut())
        );

        return new PaymentResponseDTO(
                true,
                mensagem,
                generateTransactionCode(),
                nowIsoString()
        );
    }

    private void validateRequest(PaymentRequestDTO request) {
        if (request == null || request.getReserva() == null || request.getMetodoPagamento() == null) {
            throw new PaymentValidationException("Dados incompletos para processar o pagamento.");
        }

        PaymentMethod method = PaymentMethod.fromString(request.getMetodoPagamento());
        validateReserva(request.getReserva());

        if (method.isCard()) {
            validateCard(request, method);
        } else if (method == PaymentMethod.PIX) {
            validatePix(request);
        } else {
            throw new PaymentValidationException("Método de pagamento inválido.");
        }
    }

    private void validateReserva(ReservaDTO reserva) {
        if (reserva.getQuarto() == null || reserva.getQuarto().isBlank()) {
            throw new PaymentValidationException("Informe o quarto da reserva.");
        }
        if (reserva.getDiarias() <= 0) {
            throw new PaymentValidationException("A reserva deve ter ao menos uma diária.");
        }
        if (reserva.getPrecoPorNoite() == null || reserva.getPrecoPorNoite().signum() < 0) {
            throw new PaymentValidationException("Preço por noite inválido.");
        }
        parseDate(reserva.getCheckIn());
        parseDate(reserva.getCheckOut());
    }

    private void validateCard(PaymentRequestDTO request, PaymentMethod method) {
        PaymentFormDTO form = request.getDadosFormulario();
        if (form == null) {
            throw new PaymentValidationException("Dados do cartão não informados.");
        }
        if (form.getNomeCartao() == null || form.getNomeCartao().isBlank()) {
            throw new PaymentValidationException("Informe o nome no cartão.");
        }
        String numeroCartao = normalizeDigits(form.getNumeroCartao());
        if (numeroCartao.length() != 16) {
            throw new PaymentValidationException("Número do cartão inválido.");
        }
        if (!isValidExpiry(form.getValidade())) {
            throw new PaymentValidationException("Validade inválida.");
        }
        String cvv = normalizeDigits(form.getCvv());
        if (cvv.length() < 3 || cvv.length() > 4) {
            throw new PaymentValidationException("CVV inválido.");
        }
        if (method == PaymentMethod.CREDIT_CARD && request.getParcelas() <= 0) {
            throw new PaymentValidationException("Informe o número de parcelas.");
        }
    }

    private void validatePix(PaymentRequestDTO request) {
        PaymentFormDTO form = request.getDadosFormulario();
        if (form == null || normalizeDigits(form.getCpfPix()).length() != 11) {
            throw new PaymentValidationException("CPF para PIX inválido.");
        }
    }

    private BigDecimal calculateSubtotalDiarias(ReservaDTO reserva) {
        return reserva.getPrecoPorNoite().multiply(BigDecimal.valueOf(reserva.getDiarias()));
    }

    private BigDecimal calculateSubtotalExtras(ReservaDTO reserva) {
        List<ExtraDTO> extras = reserva.getExtras();
        if (extras == null) {
            return BigDecimal.ZERO;
        }
        return extras.stream()
                .filter(Objects::nonNull)
                .map(ExtraDTO::getValor)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private String normalizeDigits(String value) {
        return value == null ? "" : value.replaceAll("\\D", "");
    }

    private boolean isValidExpiry(String validade) {
        if (validade == null) {
            return false;
        }
        return validade.matches("\\d{2}/\\d{2}");
    }

    private LocalDate parseDate(String valor) {
        try {
            return LocalDate.parse(valor, DATE_FORMATTER);
        } catch (DateTimeException ex) {
            throw new PaymentValidationException("Data da reserva inválida.");
        }
    }

    private String formatCurrency(BigDecimal amount) {
        NumberFormat formatter = NumberFormat.getCurrencyInstance(BRAZIL);
        return formatter.format(amount);
    }

    private String formatDate(String isoDate) {
        LocalDate date = parseDate(isoDate);
        return date.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }

    private String generateTransactionCode() {
        return Long.toHexString(System.currentTimeMillis()).toUpperCase();
    }

    private String nowIsoString() {
        return java.time.OffsetDateTime.now().toString();
    }
}
