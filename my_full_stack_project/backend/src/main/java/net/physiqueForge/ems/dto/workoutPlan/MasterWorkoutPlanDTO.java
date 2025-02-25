package net.physiqueForge.ems.dto.workoutPlan;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MasterWorkoutPlanDTO {
    private String planName;
    private double durationMinutes;
    private String workoutStatus;
    private String exercises;
    private Long assignedClientId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdByTrainerName;
    private String updatedByTrainerName;
}