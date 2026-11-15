package com.mystforged.backend.services;


import com.mystforged.backend.dtos.CharacterCreateDTO;
import com.mystforged.backend.dtos.CharacterResponseDTO;
import com.mystforged.backend.dtos.UserDTO;
import com.mystforged.backend.factories.CharacterTemplateFactory;
import com.mystforged.backend.models.User;
import com.mystforged.backend.models.Character;
import com.mystforged.backend.repositories.CharacterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@RequiredArgsConstructor
@Service
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final CharacterTemplateFactory characterTemplateFactory;
    public CharacterResponseDTO create(CharacterCreateDTO data, User userData) {
        Character newcharacter = characterTemplateFactory.buildInitialCharacter(data, userData);
        characterRepository.save(newcharacter);
        CharacterResponseDTO character = new CharacterResponseDTO(
                newcharacter.getId(),
                newcharacter.getName(),
                new UserDTO(userData.getId(),userData.getName(),userData.getAvatarUrl()),
                null,
                newcharacter.getImage_url(),
                newcharacter.getBio(),
                newcharacter.getSequence(),
                newcharacter.getProgression(),
                newcharacter.getTraits(),
                newcharacter.getConditions(),
                newcharacter.getInventory(),
                newcharacter.getStatus()
        );
        return character;
    }

    public List<CharacterResponseDTO> get(User userData) {
        List<Character> characters = characterRepository.findAllByUser_Id(userData.getId());
        if (characters == null) {
            return null;
        }
        List<CharacterResponseDTO> charactersList = characters.stream().map(character -> new CharacterResponseDTO(
                character.getId(),
                character.getName(),
                new UserDTO(userData.getId(),userData.getName(),userData.getAvatarUrl()),
                null,
                character.getImage_url(),
                character.getBio(),
                character.getSequence(),
                character.getProgression(),
                character.getTraits(),
                character.getConditions(),
                character.getInventory(),
                character.getStatus()
                )

        ).toList();
        return charactersList;
    }
}
