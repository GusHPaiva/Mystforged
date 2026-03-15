package com.mystforged.backend.controllers;


import com.mystforged.backend.dtos.CharacterCreateDTO;
import com.mystforged.backend.dtos.CharacterResponseDTO;
import com.mystforged.backend.models.User;
import com.mystforged.backend.services.CharacterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/characters")
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterService characterService;

    @PostMapping
    public ResponseEntity<CharacterResponseDTO> create(@RequestBody @Valid CharacterCreateDTO character, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        CharacterResponseDTO newCharacter =  characterService.create(character,user);
       return ResponseEntity.status(HttpStatus.CREATED).body(newCharacter);
    }
}
