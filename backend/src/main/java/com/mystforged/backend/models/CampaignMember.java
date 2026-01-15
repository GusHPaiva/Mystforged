package com.mystforged.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "campaign_members", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"campaign_id", "user_id"})
})
public class CampaignMember {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "campaign_id", nullable = false)
    private Campaign campaign;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private UUID currentCharacterId;
    @Builder.Default
    private boolean active = true;

    @CreationTimestamp
    private LocalDateTime joinedAt;
}
