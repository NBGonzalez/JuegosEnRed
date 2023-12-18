package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = {"com.example.demo"}) // Reemplaza con el paquete que contiene tus entidades
public class VirtualVelocityApplication {

	public static void main(String[] args) {
		SpringApplication.run(VirtualVelocityApplication.class, args);
	}
}
