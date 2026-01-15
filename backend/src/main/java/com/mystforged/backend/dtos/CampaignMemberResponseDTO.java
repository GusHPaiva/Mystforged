package com.mystforged.backend.dtos;


import java.time.LocalDateTime;
import java.util.UUID;


public record CampaignMemberResponseDTO(UUID id, UUID campaignId, UUID userId, UUID currentCharacterId,boolean active,
                                        LocalDateTime joinedAt) {
}
