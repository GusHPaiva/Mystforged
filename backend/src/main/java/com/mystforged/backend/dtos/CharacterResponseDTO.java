package com.mystforged.backend.dtos;

import java.util.Map;
import java.util.UUID;

public record CharacterResponseDTO(UUID id,
                                   String name,
                                   UserDTO user,
                                   CampaignResponseDTO campaign,
                                   String imageUrl,
                                   Map<String, Object> sheetData
                                   ) {
}
