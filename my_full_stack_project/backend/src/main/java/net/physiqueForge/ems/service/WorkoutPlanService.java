package net.physiqueForge.ems.service;

import net.physiqueForge.ems.dto.workoutPlan.WorkoutPlanRequestDTO;
import net.physiqueForge.ems.dto.workoutPlan.WorkoutPlanResponseDTO;

import java.util.List;

public interface WorkoutPlanService {
    List<WorkoutPlanResponseDTO> getAllPlans();
    WorkoutPlanResponseDTO getPlanById(Long id);
    WorkoutPlanResponseDTO createPlan(WorkoutPlanRequestDTO requestDTO);
    WorkoutPlanResponseDTO updatePlan(Long id, WorkoutPlanRequestDTO requestDTO);
    void deletePlan(Long id);
}