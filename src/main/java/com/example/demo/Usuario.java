package com.example.demo;



public class Usuario {
    private Long id;
    private String nombre;
    private String password;

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
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
}

