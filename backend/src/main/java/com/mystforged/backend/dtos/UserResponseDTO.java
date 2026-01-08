package com.mystforged.backend.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserResponseDTO(String name, String username, UUID id, String email, LocalDateTime createdAt) {
}
