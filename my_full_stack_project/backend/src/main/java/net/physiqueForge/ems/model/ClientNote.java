package net.physiqueForge.ems.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "client_notes")
public class ClientNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "created_by_id", nullable = true)
    private Client createdBy;

    @ManyToOne
    @JoinColumn(name = "updated_by_id", nullable = true)
    private Client updatedBy;

    @ManyToOne
    @JoinColumn(name = "workout_plan_id", nullable = true)
    private WorkoutPlan workoutPlan;

    @Column(nullable = false)
    private String noteText;

    // Set timestamps automatically before persisting
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Update `updatedAt` timestamp automatically before updating
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}