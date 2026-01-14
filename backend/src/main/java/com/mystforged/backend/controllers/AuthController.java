package com.mystforged.backend.controllers;

import com.mystforged.backend.dtos.AuthRequestDTO;
import com.mystforged.backend.dtos.AuthResponseDTO;
import com.mystforged.backend.dtos.RegisterRequestDTO;
import com.mystforged.backend.dtos.UserResponseDTO;
import com.mystforged.backend.models.User;
import com.mystforged.backend.repositories.UserRepository;

import com.mystforged.backend.services.TokenService;
import com.mystforged.backend.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO data) {

            User user = userRepository.findByEmail(data.email()).orElseThrow(() -> new RuntimeException("User not found"));
            if(passwordEncoder.matches(data.password(), user.getPassword())) {
                var token = tokenService.generateToken(user);
                return ResponseEntity.ok(new AuthResponseDTO(user.getName(),token));
            }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> create(@RequestBody @Valid RegisterRequestDTO body) {
        UserResponseDTO newUser = userService.create(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

}