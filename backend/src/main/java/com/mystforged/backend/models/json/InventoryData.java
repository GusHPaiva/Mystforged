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
public class InventoryData implements Serializable {
    @Builder.Default
    private Map<String, Item> items = new HashMap<>();
    private int money;
    private String extra;
    @Builder.Default
    private Map<String, Weapon> weapons = new HashMap<>();

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Item implements Serializable{
        private String name;
        private String description;
        private String effects;
        private int grade;
        private int quantity;
    }
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Weapon implements Serializable{
        private String name;
        private String description;
        private String damage;
        private int grade;
        private int range;
        private int critical;
        private String criticalDamage;
        private String damageType;
        @Builder.Default
        private boolean equipped = false;
    }
}
