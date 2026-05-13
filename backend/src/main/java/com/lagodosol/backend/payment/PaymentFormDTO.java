package com.lagodosol.backend.payment;

public class PaymentFormDTO {

    private String nomeCartao;
    private String numeroCartao;
    private String validade;
    private String cvv;
    private String cpfPix;

    public PaymentFormDTO() {
    }

    public String getNomeCartao() {
        return nomeCartao;
    }

    public void setNomeCartao(String nomeCartao) {
        this.nomeCartao = nomeCartao;
    }

    public String getNumeroCartao() {
        return numeroCartao;
    }

    public void setNumeroCartao(String numeroCartao) {
        this.numeroCartao = numeroCartao;
    }

    public String getValidade() {
        return validade;
    }

    public void setValidade(String validade) {
        this.validade = validade;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public String getCpfPix() {
        return cpfPix;
    }

    public void setCpfPix(String cpfPix) {
        this.cpfPix = cpfPix;
    }
}
