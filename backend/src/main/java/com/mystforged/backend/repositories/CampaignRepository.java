package com.mystforged.backend.repositories;

import com.mystforged.backend.models.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CampaignRepository extends JpaRepository<Campaign, UUID> {
    List<Campaign> findAllByActiveTrue();
    Optional<Campaign> findCampaignByInviteCode(String inviteCode);
}
