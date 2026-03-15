package com.mystforged.backend.repositories;
import com.mystforged.backend.models.Character;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CharacterRepository extends JpaRepository<Character, UUID> {

}
