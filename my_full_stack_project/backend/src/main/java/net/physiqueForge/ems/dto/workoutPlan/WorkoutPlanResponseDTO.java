package net.physiqueForge.ems.dto.workoutPlan;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class WorkoutPlanResponseDTO extends MasterWorkoutPlanDTO {
    private Long id;
}