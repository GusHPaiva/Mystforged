package com.mystforged.backend.models.json;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.Set;
import java.util.HashSet;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MapState implements Serializable {

    @Builder.Default
    private boolean gridEnabled = true;

    @Builder.Default
    private boolean fogEnabled = true;

    @Builder.Default
    private Set<String> revealedCells = new HashSet<>();

    @Builder.Default
    private String gridColor = "#000000";

    @Builder.Default
    private List<Token> tokens = new ArrayList<>();

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Token implements Serializable {
        private String id;
        private UUID characterId;
        private String imageUrl;

        private double x;
        private double y;
        private double scale;

        private boolean isHidden;
    }
}