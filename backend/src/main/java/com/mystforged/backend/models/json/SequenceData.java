package com.mystforged.backend.models.json;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SequenceData implements Serializable {
    private int sequence;
    private int rp;

    @JsonProperty("rpMax")
    public int getRpMax() {
        return switch (sequence) {
            case 9 -> 5;
            case 8 -> 10;
            case 7 -> 25;
            case 6 -> 50;
            case 5 -> 100;
            case 4 -> 200;
            default -> 0;
        };
    }

    @JsonProperty("assimilated")
    public boolean isAssimilated() {
        return this.rp >= (getRpMax() / 2);
    }

    @JsonProperty("digested")
    public boolean isDigested() {
        return this.rp >= getRpMax();
    }

    @JsonProperty("progressPercentage")
    public double getProgressPercentage() {
        if (getRpMax() == 0) return 0.0;
        return Math.min(100.0, ((double) rp / getRpMax()) * 100.0);
    }
}
