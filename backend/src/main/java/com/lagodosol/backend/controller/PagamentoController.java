package com.lagodosol.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lagodosol.backend.model.Pagamento;

@RestController
@RequestMapping("/pagamentos")
@CrossOrigin("*")
public class PagamentoController {

    private List<Pagamento> pagamentos = new ArrayList<>();
    private Long proximoId = 1L;

    @PostMapping
    public Pagamento salvar(@RequestBody Pagamento pagamento) {
        pagamento.setId(proximoId++);
        pagamentos.add(pagamento);
        return pagamento;
    }

    @GetMapping
    public List<Pagamento> listar() {
        return pagamentos;
    }
}