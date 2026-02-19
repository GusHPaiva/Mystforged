package com.mystforged.backend.models.json;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatusData implements Serializable {
    private int currentHP;
    private int currentEs;
    private int maxPdc;
    private int guard;
    private int lt;
    private int movement;
    @Builder.Default
    private Map<String, PDC> pdc = new HashMap<>();
    @Builder.Default
    private Map<String, Alteration> alterations = new HashMap<>();

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class PDC implements Serializable {
        private boolean taken  = false;
        private boolean corrupted  = false;
    }
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Alteration implements Serializable {
        private String name;
        private String effect;
        private int progression;
        private String type;
    }
}
