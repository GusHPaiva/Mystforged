package com.mystforged.backend.models.json;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProgressionData implements Serializable {
    @Builder.Default
    private Map<String, Attribute> attributes = new HashMap<>();
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Attribute implements Serializable {
        private String name;
        private int level;
        private int currentXp;
        private int currentPt;
        private Map<String, Skill> skills = new HashMap<>();
    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Skill implements Serializable {
        private String name;
        private int level;
        private int currentPt;
        private Map<String, Proficiency > proficiencies = new HashMap<>();
    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Proficiency implements Serializable {
        private String name;
        private int grade;
    }
}
