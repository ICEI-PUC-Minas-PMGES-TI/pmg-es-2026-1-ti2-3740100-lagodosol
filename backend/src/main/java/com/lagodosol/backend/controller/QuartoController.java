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

    @PutMapping("/{id}")
    public Quarto atualizar(@PathVariable Long id, @RequestBody Quarto dados) {
        Quarto quarto = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Quarto não encontrado"));

        quarto.setNumero(dados.getNumero());
        quarto.setTipo(dados.getTipo());
        quarto.setCapacidade(dados.getCapacidade());
        quarto.setPreco(dados.getPreco());

        return repository.save(quarto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
