package com.lagodosol.backend.controller;

import com.lagodosol.backend.model.Quarto;
import com.lagodosol.backend.repository.QuartoRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quartos")
@CrossOrigin(origins = "*")
public class QuartoController {

    private final QuartoRepository repository;

    public QuartoController(QuartoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Quarto> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Quarto cadastrar(@RequestBody Quarto quarto) {
        return repository.save(quarto);
    }
}