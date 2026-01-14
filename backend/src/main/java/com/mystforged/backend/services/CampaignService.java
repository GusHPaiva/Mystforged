package com.mystforged.backend.services;

import com.mystforged.backend.dtos.CampaignRequestDTO;
import com.mystforged.backend.dtos.CampaignResponseDTO;
import com.mystforged.backend.dtos.GmDTO;
import com.mystforged.backend.models.Campaign;
import com.mystforged.backend.models.User;
import com.mystforged.backend.repositories.CampaignRepository;
import com.mystforged.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final UserRepository userRepository;

    public List<CampaignResponseDTO> getAllCampaigns() {

        return campaignRepository.findAllByActiveTrue().stream()
                .map(campaign -> new CampaignResponseDTO(
                        campaign.getId(),
                        campaign.getName(),
                        campaign.getDescription(),
                        campaign.getImageUrl(),
                        campaign.getInviteCode(),
                        campaign.isActive(),
                        campaign.getCreatedAt(),
                        new GmDTO(campaign.getGmUser().getId(),campaign.getGmUser().getName(), campaign.getGmUser().getAvatarUrl())
                        ))
                .toList();

    }
    private String inviteCodeGenerator(){
        StringBuilder inviteCode = new StringBuilder(6);
        SecureRandom  random = new SecureRandom();
        for (int i =0;i<6;i++){
            int n = random.nextInt(3);
            switch(n){
                case 0:
                    inviteCode.append(random.nextInt(10));
                    break;
                case 1:
                    inviteCode.append((char)('a'+random.nextInt(26)));
                    break;
                case 2:
                    inviteCode.append((char)('A'+random.nextInt(26)));
                    break;
            }
        }
        return inviteCode.toString();
    }
    public CampaignResponseDTO create(CampaignRequestDTO data, UUID gmId) {
        String inviteCode = inviteCodeGenerator();
        Campaign newcampaign = new Campaign();

        User gm = userRepository.findById(gmId).orElseThrow(() -> new RuntimeException("GM User not found"));

        newcampaign.setName(data.name());
        newcampaign.setDescription(data.description());
        newcampaign.setImageUrl(data.imageUrl());
        newcampaign.setActive(true);
        newcampaign.setInviteCode(inviteCode);
        newcampaign.setGmUser(gm);
        Campaign campaign = campaignRepository.save(newcampaign);

        return new CampaignResponseDTO(
                campaign.getId(),
                campaign.getName(),
                campaign.getDescription(),
                campaign.getImageUrl(),
                campaign.getInviteCode(),
                campaign.isActive(),
                campaign.getCreatedAt(),
                new GmDTO(gm.getId(), gm.getName(), gm.getAvatarUrl())

        );

    }
}