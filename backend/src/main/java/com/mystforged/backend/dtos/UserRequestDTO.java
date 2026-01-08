package com.mystforged.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserRequestDTO(@Size(max = 50)String name,

                             @NotBlank
                             @Size(min = 3, max = 50)
                             @Pattern(
                                     regexp = "^[a-zA-Z0-9._]+$",
                                     message = "Username cannot contain spaces or special characters"
                             )
                             String username,

                             @NotBlank
                             @Email
                             String email,

                             @NotBlank
                             @Size(min = 8, max = 128)
                             @Pattern(
                                     regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!_.-])(?=\\S+$).*$",
                                     message = "The password must be longer than 8 characters, contain a number, a lower case and uppercase letter and an special character"
                             )
                             String password ) {

}
