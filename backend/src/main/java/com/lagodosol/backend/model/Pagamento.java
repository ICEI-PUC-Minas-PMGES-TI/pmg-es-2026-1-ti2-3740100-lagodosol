package com.lagodosol.backend.model;

public class Pagamento {

    private Long id;
    private String metodoPagamento;
    private Integer parcelas;
    private Double total;
    private String nomeCartao;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMetodoPagamento() { return metodoPagamento; }
    public void setMetodoPagamento(String metodoPagamento) { this.metodoPagamento = metodoPagamento; }
    public Integer getParcelas() { return parcelas; }
    public void setParcelas(Integer parcelas) { this.parcelas = parcelas; }
    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }
    public String getNomeCartao() { return nomeCartao; }
    public void setNomeCartao(String nomeCartao) { this.nomeCartao = nomeCartao; }
}