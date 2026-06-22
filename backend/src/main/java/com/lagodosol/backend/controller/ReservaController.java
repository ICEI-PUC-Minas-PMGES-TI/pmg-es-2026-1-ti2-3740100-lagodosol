package com.lagodosol.backend.controller;

import com.lagodosol.backend.model.Reserva;
import com.lagodosol.backend.repository.ReservaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    private final ReservaRepository repository;

    public ReservaController(ReservaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Reserva> listar() {
        return repository.findAll();
    }

    // Lista apenas as reservas de um usuário específico
    // Uso: GET /reservas/usuario/{usuarioId}
    @GetMapping("/usuario/{usuarioId}")
    public List<Reserva> listarPorUsuario(@PathVariable Long usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

    @PostMapping
    public Reserva criar(@RequestBody Reserva reserva) {
        return repository.save(reserva);
    }

    @PutMapping("/{id}")
    public Reserva atualizar(@PathVariable Long id, @RequestBody Reserva reservaAtualizada) {
        Reserva reserva = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Reserva não encontrada"));

        if (reservaAtualizada.getAvaliacao() != null) {
            reserva.setAvaliacao(reservaAtualizada.getAvaliacao());
        }
        if (reservaAtualizada.getStatus() != null) {
            reserva.setStatus(reservaAtualizada.getStatus());
        }

        return repository.save(reserva);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
