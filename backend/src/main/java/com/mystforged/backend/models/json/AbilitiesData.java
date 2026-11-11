package com.mystforged.backend.models.json;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AbilitiesData {
    @Builder.Default
    private Map<String, AbilitiesData.Abilities> abilities = new HashMap<>();
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Abilities implements Serializable {
        private String name;
        private String description;
        private int cost;
    }

}
