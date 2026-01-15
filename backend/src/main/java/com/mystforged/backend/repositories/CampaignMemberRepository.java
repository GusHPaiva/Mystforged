package com.mystforged.backend.repositories;

import com.mystforged.backend.models.Campaign;
import com.mystforged.backend.models.CampaignMember;
import com.mystforged.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.UUID;

public interface CampaignMemberRepository extends JpaRepository<CampaignMember, UUID> {
    boolean existsByUserAndCampaign(User user, Campaign campaign);
    List<CampaignMember> findAllByActiveTrue();
}
