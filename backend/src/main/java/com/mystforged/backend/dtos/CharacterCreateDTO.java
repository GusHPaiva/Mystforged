package com.mystforged.backend.dtos;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;


public record CharacterCreateDTO(@NotBlank
                                 @Size(min = 3, max = 50)
                                 @Pattern(
                                         regexp = "^[a-zA-ZÀ-ÿ\\s.'-]+$",
                                         message = "The character's name contains invalid characters. Use only letters, spaces, apostrophes or hyphens."
                                 )
                                 String name,
                                 @Nullable
                                 String image_url) {
}
