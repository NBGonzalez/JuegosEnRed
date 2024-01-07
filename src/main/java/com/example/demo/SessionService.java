package com.example.demo;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class SessionService {
    private Map<String, Boolean> sesiones = new HashMap<>();

    public boolean verificarSesion(String nombreUsuario) {
        return sesiones.getOrDefault(nombreUsuario, false);
    }

    public void iniciarSesion(String nombreUsuario) {
        sesiones.put(nombreUsuario, true);
    }
}

