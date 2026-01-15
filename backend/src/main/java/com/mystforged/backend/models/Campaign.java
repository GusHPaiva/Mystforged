package com.mystforged.backend.models;

import com.mystforged.backend.models.json.MapState;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Collate;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "campaigns")
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "gm_id", nullable = false)
    private User gmUser;


    @NotBlank
    private String name;
    @NotBlank
    private String description;
    private String imageUrl;

    @NotBlank
    @Column(unique = true)
    private String inviteCode;

    private String currentSceneImage;
    private String inGameDate;
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "map_state_data", columnDefinition = "jsonb")
    private MapState mapStates;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private boolean active = true;
}
