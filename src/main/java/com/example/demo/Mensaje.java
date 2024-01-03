package com.example.demo;

public class Mensaje {
    private String remitente;
    private String contenido;

    // Constructor sin parámetros
    public Mensaje() {
    }

    // Constructor con parámetros
    public Mensaje(String remitente, String contenido) {
        this.remitente = remitente;
        this.contenido = contenido;
    }

    // Getter para remitente
    public String getRemitente() {
        return remitente;
    }

    // Setter para remitente
    public void setRemitente(String remitente) {
        this.remitente = remitente;
    }

    // Getter para contenido
    public String getContenido() {
        return contenido;
    }

    // Setter para contenido
    public void setContenido(String contenido) {
        this.contenido = contenido;
    }
}
