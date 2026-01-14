package com.mystforged.backend.repositories;

import com.mystforged.backend.models.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository <User, UUID>{
    boolean existsByEmail(String email);

    boolean existsByNickname(String Nickname);

    Optional<User> findByEmail(@Email @NotBlank String email);

}
