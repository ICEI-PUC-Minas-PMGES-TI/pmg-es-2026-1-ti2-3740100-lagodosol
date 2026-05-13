package com.lagodosol.backend.payment;

import java.math.BigDecimal;

public class ExtraDTO {

    private String item;
    private BigDecimal valor;

    public ExtraDTO() {
    }

    public String getItem() {
        return item;
    }

    public void setItem(String item) {
        this.item = item;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
}
