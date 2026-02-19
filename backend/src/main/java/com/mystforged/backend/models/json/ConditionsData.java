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
public class ConditionsData implements Serializable{
    @Builder.Default
    private Map<String, Condition> conditions = new HashMap<>();
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Condition implements Serializable {
        private String name;
        private int grade;
        private int duration;
        @Builder.Default
        private boolean visible = true;
    }

}
