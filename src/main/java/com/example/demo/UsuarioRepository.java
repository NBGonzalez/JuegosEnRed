package com.example.demo;

import java.util.Optional;

import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository{
    Optional<Usuario> findByNombreUsuario(String nombreUsuario);
}
