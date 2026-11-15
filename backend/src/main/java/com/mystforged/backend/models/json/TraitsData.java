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
public class TraitsData implements Serializable {
    @Builder.Default
    private Map<String, Trait> traits = new HashMap<>();
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Trait implements Serializable {
        private String name;
        private String origin;
        @Builder.Default
        private boolean visible = true;
    }

}
