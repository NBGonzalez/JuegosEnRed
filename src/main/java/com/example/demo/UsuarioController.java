package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private List<Usuario> usuarios = new ArrayList<>();
    private Set<Long> idsUtilizados = new HashSet<>();
    private Random random = new Random();
    private final SessionService sessionService;
    private int usuariosActivos = 0;
    
    @Autowired
    public UsuarioController(SessionService sessionService) {
        this.sessionService = sessionService;
    }
    
    //crear un nuevo usuario
    @PostMapping()
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
    	if (usuarioValido(usuario)) {
    	Long nuevoId = generarNuevoId();
    	usuario.setId(nuevoId);
        usuarios.add(usuario);
        guardarEnArchivo(usuario);
        return new ResponseEntity<>(usuario, HttpStatus.CREATED);
    	} else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping()
    public ResponseEntity<List<String>> obtenerNombresDeTodosLosUsuarios() {
        List<String> nombres = usuarios.stream()
                .map(Usuario::getNombre)
                .collect(Collectors.toList());

        return new ResponseEntity<>(nombres, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Usuario> actualizarNombreYPassword(@RequestParam String nombre, @RequestParam String nuevoNombre, @RequestParam String nuevaContrasena) {
        // Validar que los datos no sean nulos
        if (nombre != null && nuevoNombre != null && nuevaContrasena != null) {
            // Buscar el usuario por nombre
            Optional<Usuario> usuarioExistente = usuarios.stream()
                    .filter(u -> u.getNombre().equalsIgnoreCase(nombre))
                    .findFirst();

            if (usuarioExistente.isPresent()) {
                // Actualizar el nombre y la contraseña del usuario existente
                Usuario usuario = usuarioExistente.get();
                usuario.setNombre(nuevoNombre);
                usuario.setPassword(nuevaContrasena);

                // Actualizar en la lista y guardar en el archivo
                usuarios.remove(usuarioExistente.get());
                usuarios.add(usuario);
                actualizarArchivo();

                return new ResponseEntity<>(usuario, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    
    @DeleteMapping()
    public ResponseEntity<Usuario> eliminarUsuarioPorCredenciales(@RequestParam String nombre, @RequestParam String contrasena) {
        Optional<Usuario> usuarioExistente = usuarios.stream()
                .filter(u -> u.getNombre().equals(nombre) && u.getPassword().equals(contrasena))
                .findFirst();

        if (usuarioExistente.isPresent()) {
            Usuario usuarioEliminado = usuarioExistente.get();

            // Eliminar usuario de la lista
            usuarios.remove(usuarioEliminado);

            // Eliminar usuario del archivo usuarios.txt
            eliminarUsuarioDeArchivo(usuarioEliminado);

            return new ResponseEntity<>(usuarioEliminado, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/buscarUsuario")
    public ResponseEntity<Long> buscarUsuarioPorCredenciales(@RequestParam String nombre, @RequestParam String password) {
        Optional<Usuario> usuarioExistente = usuarios.stream()
                .filter(u -> u.getNombre().equals(nombre) && u.getPassword().equals(password))
                .findFirst();

        if (usuarioExistente.isPresent()) {
            return new ResponseEntity<>(usuarioExistente.get().getId(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    
    //obtener todos los usuarios
    @GetMapping("/todos")
    public ResponseEntity<List<Usuario>> obtenerTodosLosUsuarios() {
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }
    
  //obtener todos los nombres de usuarios
    @GetMapping("/nombres")
    public ResponseEntity<List<String>> obtenerNombresDeUsuarios() {
        List<String> nombres = usuarios.stream()
                .map(Usuario::getNombre) //Mapear cada usuario a su nombre
                .collect(Collectors.toList());

        return new ResponseEntity<>(nombres, HttpStatus.OK);
    }
    
    //obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarios.stream().filter(u -> u.getId().equals(id)).findFirst();
        return usuario.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //actualizar un usuario
    @PutMapping("/actualizarNombre/{id}")
    public ResponseEntity<Usuario> actualizarNombreUsuario(@PathVariable Long id, @RequestBody String nuevoNombre) {
    	 Optional<Usuario> usuarioExistente = usuarios.stream().filter(u -> u.getId().equals(id)).findFirst();
         if (usuarioExistente.isPresent()) {
             //Actualizar el nombre del usuario existente
             Usuario usuario = usuarioExistente.get();
             usuario.setNombre(nuevoNombre);
             return new ResponseEntity<>(usuario, HttpStatus.OK);
         } else {
             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
         }
    }
 
    //eliminar un usuario por ID
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) {
        Optional<Usuario> usuarioExistente = usuarios.stream().filter(u -> u.getId().equals(id)).findFirst();
        if (usuarioExistente.isPresent()) {
            usuarios.remove(usuarioExistente.get());
            return new ResponseEntity<>("Usuario eliminado con éxito", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
    }
    
 	//actualizar el password de un usuario por ID
    @PutMapping("/actualizarPassword/{id}")
    public ResponseEntity<Usuario> actualizarPasswordUsuario(@PathVariable Long id, @RequestBody String nuevoPassword) {
        Optional<Usuario> usuarioExistente = usuarios.stream().filter(u -> u.getId().equals(id)).findFirst();
        if (usuarioExistente.isPresent()) {
            //Actualizar el password del usuario existente
            Usuario usuario = usuarioExistente.get();
            usuario.setPassword(nuevoPassword);
            return new ResponseEntity<>(usuario, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<String> iniciarSesion(@RequestBody Usuario usuario) {
        if (credencialesValidas(usuario.getNombre(), usuario.getPassword()) && !sessionService.verificarSesion(usuario.getNombre())) {
            System.out.println("inicia");
            sessionService.iniciarSesion(usuario.getNombre());
            return new ResponseEntity<>("Inicio de sesión exitoso", HttpStatus.OK);
        } else {
            System.out.println("ya ha iniciado");
            return new ResponseEntity<>("Credenciales incorrectas", HttpStatus.UNAUTHORIZED);
        }
    }
    
    /*@PostMapping("/login")
    public ResponseEntity<String> iniciarSesion(@RequestBody Usuario usuario) {
        if (credencialesValidas(usuario.getNombre(), usuario.getPassword()) && !sessionService.verificarSesion(usuario.getNombre())) {
            System.out.println("inicia");
            sessionService.iniciarSesion(usuario.getNombre());
            
            // Incrementar el contador de usuarios activos
            usuariosActivos++;
            
            return new ResponseEntity<>("Inicio de sesión exitoso", HttpStatus.OK);
        } else {
            System.out.println("ya ha iniciado");
            return new ResponseEntity<>("Credenciales incorrectas", HttpStatus.UNAUTHORIZED);
        }
    }*/
    
    @PostMapping("/logout")
    public ResponseEntity<String> cerrarSesion(@RequestBody Usuario usuario) {
        if (sessionService.verificarSesion(usuario.getNombre())) {
            System.out.println("cierra");
            sessionService.cerrarSesion(usuario.getNombre());
            
            // Decrementar el contador de usuarios activos
            usuariosActivos--;
            
            return new ResponseEntity<>("Cierre de sesión exitoso", HttpStatus.OK);
        } else {
            System.out.println("sesión no encontrada");
            return new ResponseEntity<>("Sesión no encontrada", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/usuariosActivos")
    public ResponseEntity<Integer> obtenerUsuariosActivos() {
        return new ResponseEntity<>(usuariosActivos, HttpStatus.OK);
    }
    
    private boolean credencialesValidas(String usuario, String contrasena) {
        try {
            List<String> lines = Files.readAllLines(Paths.get("usuarios.txt"));
            for (String line : lines) {
                String[] parts = line.split(" ");
                if (parts.length == 2) {
                    String storedUsuario = parts[0].trim();
                    String storedContrasena = parts[1].trim();
                    
                    System.out.println("Stored: " + storedUsuario + " " + storedContrasena);
                    System.out.println("Provided: " + usuario + " " + contrasena);
                    
                    //Verificar si las credenciales coinciden
                    if (storedUsuario.equals(usuario) && storedContrasena.equals(contrasena)) {
                        return true;
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }
   
    
    //Genera un nuevo id y comprueba que no esté siendo utlizado ya
    private Long generarNuevoId() {
        while (true) {
            Long nuevoId = (long) (1000 + random.nextInt(9000)); //Número aleatorio de 4 cifras
            if (!idsUtilizados.contains(nuevoId)) {
                idsUtilizados.add(nuevoId);
                return nuevoId;
            }
        }
    }
    
 //Método auxiliar para validar el usuario (valores no nulos y nombre ya usado)
    private boolean usuarioValido(Usuario usuario) {
        //Verifica que el usuario y contraseña no sean nulos
        if (usuario != null && usuario.getNombre() != null && usuario.getPassword() != null) {
            //Verifica si ya existe un usuario con el mismo nombre
            boolean nombreExistente = usuarios.stream()
                    .anyMatch(u -> u.getNombre().equalsIgnoreCase(usuario.getNombre()));

            //True solo si el nombre no existe ya
            return !nombreExistente;
        } else {
            return false; 
        }
    }

private void guardarEnArchivo(Usuario usuario) {
    try (FileWriter writer = new FileWriter("usuarios.txt", true)) {
        writer.write(usuario.getNombre() + " " + usuario.getPassword() + "\n");
    } catch (IOException e) {
        e.printStackTrace();
    }
}

private void actualizarArchivo() {
    // Actualizar el archivo con la lista de usuarios
    try (FileWriter writer = new FileWriter("usuarios.txt")) {
        for (Usuario usuario : usuarios) {
            writer.write(usuario.getNombre() + " " + usuario.getPassword() + "\n");
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}

//Método para eliminar usuario del archivo usuarios.txt
private void eliminarUsuarioDeArchivo(Usuario usuario) {
    try {
        List<String> lines = Files.readAllLines(Paths.get("usuarios.txt"));
        List<String> newLines = lines.stream()
                .filter(line -> !line.startsWith(usuario.getNombre() + " "))
                .collect(Collectors.toList());

        Files.write(Paths.get("usuarios.txt"), newLines);
    } catch (IOException e) {
        e.printStackTrace();
    }
}

}

