package com.mystforged.backend.controllers;

import com.mystforged.backend.dtos.CampaignRequestDTO;
import com.mystforged.backend.dtos.CampaignResponseDTO;
import com.mystforged.backend.models.User;
import com.mystforged.backend.services.CampaignService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/campaigns")
@RequiredArgsConstructor
public class CampaignController {

    private final CampaignService campaignService;

    @GetMapping
    public ResponseEntity<List<CampaignResponseDTO>> listAll() {
        List<CampaignResponseDTO> campaigns = campaignService.getAllCampaigns();
        return ResponseEntity.ok(campaigns);
    }
    @PostMapping
    public ResponseEntity<CampaignResponseDTO> create(@RequestBody @Valid CampaignRequestDTO body, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        CampaignResponseDTO newCampaign = campaignService.create(body,user.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(newCampaign);

    }
}
