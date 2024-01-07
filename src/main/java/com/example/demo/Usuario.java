package com.example.demo;



public class Usuario {
    private Long id;
    private String nombre;
    private String password;
    private boolean sesionIniciada = false;

    public Usuario() {
    }

    public Usuario(String nombre, String password) {
        this.nombre = nombre;
        this.password = password;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public String getPassword() {
        return password;
    }
    
    public Long getId() {
        return id;
    }
    
    public boolean getSesionIniciada() {
        return sesionIniciada;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public void setSesionIniciada(boolean ini) {
        this.sesionIniciada = ini;
    }
}

