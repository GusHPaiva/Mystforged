package com.mystforged.backend.dtos;

import java.util.UUID;

public record UserDTO(
        UUID id,
        String name,
        String avatarUrl) {
}
