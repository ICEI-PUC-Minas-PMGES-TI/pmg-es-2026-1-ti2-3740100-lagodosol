package com.lagodosol.backend.controller;

import com.lagodosol.backend.model.Pagamento;
import com.lagodosol.backend.payment.PaymentRequestDTO;
import com.lagodosol.backend.payment.PaymentResponseDTO;
import com.lagodosol.backend.payment.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PagamentoController {

    private final PaymentService paymentService;
    private final List<Pagamento> pagamentos = new ArrayList<>();
    private Long proximoId = 1L;

    public PagamentoController() {
        this.paymentService = new PaymentService();
    }

    @PostMapping("/api/pagamentos")
    public ResponseEntity<PaymentResponseDTO> processPayment(@RequestBody PaymentRequestDTO request) {
        PaymentResponseDTO response = paymentService.process(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/pagamentos")
    public Pagamento salvar(@RequestBody Pagamento pagamento) {
        pagamento.setId(proximoId++);
        pagamentos.add(pagamento);
        return pagamento;
    }

    @GetMapping("/pagamentos")
    public List<Pagamento> listar() {
        return pagamentos;
    }
}
