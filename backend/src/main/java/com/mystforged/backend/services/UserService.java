package com.mystforged.backend.services;

import com.mystforged.backend.dtos.RegisterRequestDTO;
import com.mystforged.backend.dtos.UserResponseDTO;
import com.mystforged.backend.exceptions.InternalConflictException;
import com.mystforged.backend.models.User;
import com.mystforged.backend.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserResponseDTO(
                        user.getName(),
                        user.getUsername(),
                        user.getId(),
                        user.getEmail(),
                        user.getCreatedAt()))
                .toList();
    }

    public UserResponseDTO create(RegisterRequestDTO data) {

        if (userRepository.existsByEmail(data.email())) {
            throw new InternalConflictException("This email is already in use");
        }
        if (userRepository.existsByNickname(data.nickname())) {
            throw new InternalConflictException("This nickname is already in use");
        }

        User newUser = new User();
        newUser.setEmail(data.email());
        newUser.setNickname(data.nickname());
        newUser.setPassword(passwordEncoder.encode(data.password()));
        newUser.setName(data.name());
        User user = userRepository.save(newUser);

        return new UserResponseDTO(
                user.getName(),
                user.getNickname(),
                user.getId(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }
}