package net.physiqueForge.ems.dto.workoutPlan;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class WorkoutPlanRequestDTO extends MasterWorkoutPlanDTO {
    private Long createdById;
    private Long updatedById;
}
