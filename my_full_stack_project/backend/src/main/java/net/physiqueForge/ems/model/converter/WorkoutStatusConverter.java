package net.physiqueForge.ems.model.converter;

import jakarta.persistence.Converter;
import net.physiqueForge.ems.model.constant.WorkoutStatus;

@Converter(autoApply = true)
public class WorkoutStatusConverter extends BaseEnumConverter<WorkoutStatus, Integer> {
    public WorkoutStatusConverter() {
        super(WorkoutStatus.class);
    }
}