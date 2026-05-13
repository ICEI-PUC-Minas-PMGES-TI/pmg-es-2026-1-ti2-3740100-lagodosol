package com.lagodosol.backend.payment;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class PaymentErrorHandler {

    @ExceptionHandler(PaymentValidationException.class)
    public ResponseEntity<PaymentResponseDTO> handleValidationException(PaymentValidationException exception) {
        PaymentResponseDTO response = new PaymentResponseDTO();
        response.setSucesso(false);
        response.setMensagem(exception.getMessage());
        response.setCodigoTransacao(null);
        response.setDataConfirmacao(null);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
