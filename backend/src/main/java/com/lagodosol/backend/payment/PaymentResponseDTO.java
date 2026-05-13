package com.lagodosol.backend.payment;

public class PaymentResponseDTO {

    private boolean sucesso;
    private String mensagem;
    private String codigoTransacao;
    private String dataConfirmacao;

    public PaymentResponseDTO() {
    }

    public PaymentResponseDTO(boolean sucesso, String mensagem, String codigoTransacao, String dataConfirmacao) {
        this.sucesso = sucesso;
        this.mensagem = mensagem;
        this.codigoTransacao = codigoTransacao;
        this.dataConfirmacao = dataConfirmacao;
    }

    public boolean isSucesso() {
        return sucesso;
    }

    public void setSucesso(boolean sucesso) {
        this.sucesso = sucesso;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getCodigoTransacao() {
        return codigoTransacao;
    }

    public void setCodigoTransacao(String codigoTransacao) {
        this.codigoTransacao = codigoTransacao;
    }

    public String getDataConfirmacao() {
        return dataConfirmacao;
    }

    public void setDataConfirmacao(String dataConfirmacao) {
        this.dataConfirmacao = dataConfirmacao;
    }
}
