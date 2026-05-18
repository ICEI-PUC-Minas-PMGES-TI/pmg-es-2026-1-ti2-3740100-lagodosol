package com.lagodosol.backend.controller;

import com.lagodosol.backend.model.Pagamento;
import com.lagodosol.backend.repository.PagamentoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pagamentos")
@CrossOrigin(origins = "http://localhost:5173")
public class PagamentoController {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    @PostMapping
    public Pagamento cadastrarPagamento(@RequestBody Pagamento pagamento) {
        return pagamentoRepository.save(pagamento);
    }

    @GetMapping
    public List<Pagamento> listarPagamentos() {
        return pagamentoRepository.findAll();
    }
}