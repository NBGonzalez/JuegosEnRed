package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mensajes")
public class MensajeController {

    private List<Mensaje> mensajes = new ArrayList<>();

    //Agregar un mensaje al chat
    @PostMapping(consumes = "application/json")
    public ResponseEntity<Mensaje> agregarMensaje(@RequestBody Mensaje mensaje) {
    	System.out.println("mensaje enviado2");
        mensajes.add(mensaje);
        return new ResponseEntity<>(mensaje, HttpStatus.CREATED);
    }

    //Obtener todos los mensajes del chat
    @GetMapping()
    public ResponseEntity<List<Mensaje>> obtenerMensajes() {
    	System.out.println("mensaje cargado2");
        return new ResponseEntity<>(mensajes, HttpStatus.OK);
    }
}
