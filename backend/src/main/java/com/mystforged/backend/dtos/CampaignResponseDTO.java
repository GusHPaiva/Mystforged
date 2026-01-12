package com.mystforged.backend.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

public record CampaignResponseDTO(
        UUID id,
        String name,
        String description,
        String imageUrl,
        String inviteCode,
        boolean active,
        LocalDateTime createdAt,
        GmDTO gm
) {
}
