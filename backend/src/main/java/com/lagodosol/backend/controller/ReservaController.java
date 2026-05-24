package com.lagodosol.backend.controller;

import com.lagodosol.backend.model.Reserva;
import com.lagodosol.backend.repository.ReservaRepository;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public Reserva criar(@RequestBody Reserva reserva) {
        return repository.save(reserva);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
