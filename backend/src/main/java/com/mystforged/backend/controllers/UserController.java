package com.mystforged.backend.controllers;

import com.mystforged.backend.dtos.UserRequestDTO;
import com.mystforged.backend.dtos.UserResponseDTO;
import com.mystforged.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> listAll() {
        List<UserResponseDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @PostMapping
    public ResponseEntity<UserResponseDTO> create(@RequestBody @Valid UserRequestDTO body){
        UserResponseDTO newUser = userService.create(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }
}
