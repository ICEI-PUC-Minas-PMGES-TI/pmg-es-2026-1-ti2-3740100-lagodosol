package com.lagodosol.backend.controller;

import com.lagodosol.backend.payment.PaymentRequestDTO;
import com.lagodosol.backend.payment.PaymentResponseDTO;
import com.lagodosol.backend.payment.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pagamentos")
@CrossOrigin(origins = "*")
public class PagamentoController {

    private final PaymentService paymentService;

    public PagamentoController() {
        this.paymentService = new PaymentService();
    }

    @PostMapping
    public ResponseEntity<PaymentResponseDTO> processPayment(@RequestBody PaymentRequestDTO request) {
        PaymentResponseDTO response = paymentService.process(request);
        return ResponseEntity.ok(response);
    }
}
