package com.lagodosol.backend.payment;

import java.math.BigDecimal;
import java.util.List;

public class PaymentRequestDTO {

    private ReservaDTO reserva;
    private String metodoPagamento;
    private int parcelas;
    private PaymentFormDTO dadosFormulario;

    public PaymentRequestDTO() {
    }

    public ReservaDTO getReserva() {
        return reserva;
    }

    public void setReserva(ReservaDTO reserva) {
        this.reserva = reserva;
    }

    public String getMetodoPagamento() {
        return metodoPagamento;
    }

    public void setMetodoPagamento(String metodoPagamento) {
        this.metodoPagamento = metodoPagamento;
    }

    public int getParcelas() {
        return parcelas;
    }

    public void setParcelas(int parcelas) {
        this.parcelas = parcelas;
    }

    public PaymentFormDTO getDadosFormulario() {
        return dadosFormulario;
    }

    public void setDadosFormulario(PaymentFormDTO dadosFormulario) {
        this.dadosFormulario = dadosFormulario;
    }

    public static class ReservaDTO {
        private String quarto;
        private String checkIn;
        private String checkOut;
        private int diarias;
        private BigDecimal precoPorNoite;
        private List<ExtraDTO> extras;

        public ReservaDTO() {
        }

        public String getQuarto() {
            return quarto;
        }

        public void setQuarto(String quarto) {
            this.quarto = quarto;
        }

        public String getCheckIn() {
            return checkIn;
        }

        public void setCheckIn(String checkIn) {
            this.checkIn = checkIn;
        }

        public String getCheckOut() {
            return checkOut;
        }

        public void setCheckOut(String checkOut) {
            this.checkOut = checkOut;
        }

        public int getDiarias() {
            return diarias;
        }

        public void setDiarias(int diarias) {
            this.diarias = diarias;
        }

        public BigDecimal getPrecoPorNoite() {
            return precoPorNoite;
        }

        public void setPrecoPorNoite(BigDecimal precoPorNoite) {
            this.precoPorNoite = precoPorNoite;
        }

        public List<ExtraDTO> getExtras() {
            return extras;
        }

        public void setExtras(List<ExtraDTO> extras) {
            this.extras = extras;
        }
    }
}
