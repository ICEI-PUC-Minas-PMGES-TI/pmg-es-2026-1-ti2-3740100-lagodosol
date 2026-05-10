package com.lagodosol.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lagodosol.backend.model.Usuario;
import com.lagodosol.backend.repository.UsuarioRepository;

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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        return repository.findByEmail(usuario.getEmail())
            .map(u -> {
                if (u.getSenha().equals(usuario.getSenha())) {
                    return ResponseEntity.ok(u);
                } else {
                    return ResponseEntity.status(401).body("Senha incorreta");
                }
            })
            .orElse(ResponseEntity.status(404).body("Usuário não encontrado"));
    }
}