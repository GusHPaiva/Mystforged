package com.mystforged.backend.dtos;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public record CampaignMemberRequestDTO( @Size(min = 6, max = 6)@NotNull String inviteCode) {
}
