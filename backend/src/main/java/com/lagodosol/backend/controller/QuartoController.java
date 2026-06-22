package com.lagodosol.backend.controller;

import com.lagodosol.backend.model.Quarto;
import com.lagodosol.backend.repository.QuartoRepository;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

    @GetMapping("/{id}")
    public Quarto buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quarto não encontrado"));
    }

    @PostMapping
    public Quarto cadastrar(@RequestBody Quarto quarto) {
        validarQuarto(quarto);

        if (repository.existsByNumero(quarto.getNumero())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe um quarto com este número");
        }

        return repository.save(quarto);
    }

    @PutMapping("/{id}")
    public Quarto atualizar(@PathVariable Long id, @RequestBody Quarto dados) {
        Quarto quarto = repository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quarto não encontrado"));

        validarQuarto(dados);

        if (repository.existsByNumeroAndIdNot(dados.getNumero(), id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe um quarto com este número");
        }

        quarto.setNumero(dados.getNumero());
        quarto.setTipo(dados.getTipo());
        quarto.setCapacidade(dados.getCapacidade());
        quarto.setPreco(dados.getPreco());
        quarto.setImagemBase64(dados.getImagemBase64());

        return repository.save(quarto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Quarto não encontrado");
        }

        repository.deleteById(id);
    }

    private void validarQuarto(Quarto quarto) {
        if (quarto.getNumero() == null || quarto.getNumero().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe o número do quarto");
        }

        if (quarto.getTipo() == null || quarto.getTipo().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe o tipo do quarto");
        }

        if (quarto.getCapacidade() == null || quarto.getCapacidade() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe uma capacidade válida");
        }

        if (quarto.getPreco() == null || quarto.getPreco() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe uma diária válida");
        }
    }
}
