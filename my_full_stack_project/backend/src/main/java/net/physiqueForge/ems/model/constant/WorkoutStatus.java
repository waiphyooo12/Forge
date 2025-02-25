package net.physiqueForge.ems.model.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum WorkoutStatus implements BaseEnum<Integer> {
    BEGINNER(1),
    INTERMEDIATE(2),
    ADVANCE(3);

    private final int value;

    @Override
    public Integer getValue() {
        return this.value;
    }
    }