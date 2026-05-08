package com.lagodosol.backend.controller;

import com.lagodosol.backend.model.Usuario;
import com.lagodosol.backend.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping
    public Usuario cadastrar(@RequestBody Usuario usuario) {
        return repository.save(usuario);
    }

    @GetMapping
    public java.util.List<Usuario> listar() {
        return repository.findAll();
    }
}
