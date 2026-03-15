package com.mystforged.backend.dtos;

import com.mystforged.backend.models.json.*;

import java.util.UUID;

public record CharacterResponseDTO(UUID id,
                                   String name,
                                   UserDTO user,
                                   CampaignResponseDTO campaign,
                                   String imageUrl,
                                   BioData bio,
                                   SequenceData sequence,
                                   ProgressionData progression,
                                   TraitsData traits,
                                   ConditionsData conditions,
                                   InventoryData inventory,
                                   StatusData status
                                   ) {
}
