package com.mystforged.backend.dtos;

import java.util.UUID;

public record GmDTO(
        UUID id,
        String name,
        String avatarUrl) {
}
