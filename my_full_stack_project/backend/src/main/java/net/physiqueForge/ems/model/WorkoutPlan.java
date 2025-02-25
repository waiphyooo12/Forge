package net.physiqueForge.ems.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.physiqueForge.ems.model.constant.WorkoutStatus;
import net.physiqueForge.ems.model.converter.WorkoutStatusConverter;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "workout_plans")
public class WorkoutPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "created_by_id", nullable = false)  // Trainer who created the plan
    private Trainer createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by_id", nullable = true)  // Trainer who last updated the plan
    private Trainer updatedBy;

    @Column(nullable = false)
    private String planName;

    @Column(nullable = false)
    private double durationMinutes;

    @Column(nullable = false)
    @Convert(converter = WorkoutStatusConverter.class)
    private WorkoutStatus workoutStatus;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String exercises;

    @Column(nullable = false)
    private Long assignedClientId;  // ✅ Foreign key reference to Client

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}