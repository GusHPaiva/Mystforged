package com.mystforged.backend.services;


import com.mystforged.backend.dtos.CampaignResponseDTO;
import com.mystforged.backend.dtos.CharacterCreateDTO;
import com.mystforged.backend.dtos.CharacterResponseDTO;
import com.mystforged.backend.dtos.UserDTO;
import com.mystforged.backend.models.Campaign;
import com.mystforged.backend.models.User;
import com.mystforged.backend.models.Character;
import com.mystforged.backend.repositories.CampaignRepository;
import com.mystforged.backend.repositories.CharacterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final CampaignRepository campaignRepository;

    public CharacterResponseDTO create(CharacterCreateDTO data, User user){
        Character newcharacter = new Character();
        newcharacter.setName(data.name());
        newcharacter.setUser(user);
        newcharacter.setImageUrl(data.image_url());
        newcharacter.setSheetData(new HashMap<>());
        Character character = characterRepository.save(newcharacter);
        UserDTO userdto = new UserDTO(user.getId(), user.getName(), user.getAvatarUrl());
        return new CharacterResponseDTO(
                character.getId(),
                character.getName(),
                userdto,
                null,
                character.getImageUrl(),
                character.getSheetData()
                );
    }
    public List<CharacterResponseDTO> get(User user){
        List<Character> characters = characterRepository.findAllByUser_Id(user.getId());
        UserDTO userDTO = new UserDTO(user.getId(), user.getName(), user.getAvatarUrl());
        return characters.stream().map(
                c -> new CharacterResponseDTO(c.getId(),
                        c.getName(),
                        userDTO,
                        new CampaignResponseDTO(c.getCampaign().getId(),c.getCampaign().getName(), c.getCampaign().getDescription(),c.getCampaign().getImageUrl(),c.getCampaign().getInviteCode(),c.getCampaign().isActive(),c.getCampaign().getCreatedAt(),userDTO),
                        c.getImageUrl(),
                        c.getSheetData())).toList();

    }
}
