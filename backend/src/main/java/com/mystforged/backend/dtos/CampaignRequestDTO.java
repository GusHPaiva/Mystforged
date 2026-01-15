package com.mystforged.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CampaignRequestDTO(
        @NotBlank
        @Size(min = 2, max = 30)
        String name,
        @NotBlank
        @Size(max = 500)
        String description,
        String imageUrl){
}
