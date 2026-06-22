package com.lagodosol.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lagodosol.backend.dto.AlterarSenhaDTO;
import com.lagodosol.backend.model.Usuario;
import com.lagodosol.backend.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {

        // Verifica se já existe um usuário com esse e-mail
        if (repository.findByEmail(usuario.getEmail()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT) // 409
                    .body("Este e-mail já está cadastrado.");
        }

        System.out.println("======== USUARIO RECEBIDO ========");
        System.out.println("Nome: " + usuario.getNome());
        System.out.println("CPF: " + usuario.getCpf());
        System.out.println("Email: " + usuario.getEmail());
        System.out.println("Senha: " + usuario.getSenha());
        System.out.println("Nascimento: " + usuario.getDataNascimento());

        Usuario salvo = repository.save(usuario);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public List<Usuario> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Usuario buscarUsuario(@PathVariable Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    @PutMapping("/{id}")
    public Usuario atualizarUsuario(
            @PathVariable Long id,
            @RequestBody Usuario dadosAtualizados) {

        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuario.setNome(dadosAtualizados.getNome());
        usuario.setEmail(dadosAtualizados.getEmail());

        return repository.save(usuario);
    }

    @PutMapping("/{id}/senha")
    public Usuario alterarSenha(
            @PathVariable Long id,
            @RequestBody AlterarSenhaDTO dto) {

        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!usuario.getSenha().equals(dto.getSenhaAtual())) {
            throw new RuntimeException("Senha atual incorreta");
        }

        usuario.setSenha(dto.getNovaSenha());

        return repository.save(usuario);
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable Long id) {
        repository.deleteById(id);
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
