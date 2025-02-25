package net.physiqueForge.ems.mapper;

import net.physiqueForge.ems.dto.workoutPlan.WorkoutPlanRequestDTO;
import net.physiqueForge.ems.dto.workoutPlan.WorkoutPlanResponseDTO;
import net.physiqueForge.ems.model.WorkoutPlan;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface WorkoutPlanMapper {

    WorkoutPlanMapper INSTANCE = Mappers.getMapper(WorkoutPlanMapper.class);

    @Mapping(source = "createdBy.name", target = "createdByTrainerName")
    @Mapping(source = "updatedBy.name", target = "updatedByTrainerName")
    WorkoutPlanResponseDTO toDto(WorkoutPlan workoutPlan);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    WorkoutPlan toEntity(WorkoutPlanRequestDTO workoutPlanRequestDTO);

    List<WorkoutPlanResponseDTO> toDtoList(List<WorkoutPlan> workoutPlans);
}
