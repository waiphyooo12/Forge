package net.physiqueForge.ems.service.impl;

import lombok.RequiredArgsConstructor;
import net.physiqueForge.ems.dto.workoutPlan.WorkoutPlanRequestDTO;
import net.physiqueForge.ems.dto.workoutPlan.WorkoutPlanResponseDTO;
import net.physiqueForge.ems.mapper.WorkoutPlanMapper;
import net.physiqueForge.ems.model.Trainer;
import net.physiqueForge.ems.model.WorkoutPlan;
import net.physiqueForge.ems.model.constant.WorkoutStatus;
import net.physiqueForge.ems.repository.TrainerRepository;
import net.physiqueForge.ems.repository.WorkoutPlanRepository;
import net.physiqueForge.ems.service.WorkoutPlanService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutPlanServiceImpl implements WorkoutPlanService {

    private final WorkoutPlanRepository workoutPlanRepository;
    private final TrainerRepository trainerRepository;
    private final WorkoutPlanMapper workoutPlanMapper;

    @Override
    public List<WorkoutPlanResponseDTO> getAllPlans() {
        List<WorkoutPlan> plans = workoutPlanRepository.findAll();
        return plans.stream()
                .map(workoutPlanMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public WorkoutPlanResponseDTO getPlanById(Long id) {
        WorkoutPlan plan = workoutPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout Plan not found with ID: " + id));
        return workoutPlanMapper.toDto(plan);
    }

    @Override
    public WorkoutPlanResponseDTO createPlan(WorkoutPlanRequestDTO requestDTO) {
        System.out.println("requestDTO.getCreatedById() = " + requestDTO.getCreatedById());
        Trainer trainer = trainerRepository.getTrainerById(requestDTO.getCreatedById());
        System.out.println("trainer = " + trainer);
                // .orElseThrow(() -> new RuntimeException("Trainer not found"));

        WorkoutPlan plan = workoutPlanMapper.toEntity(requestDTO);
        plan.setCreatedBy(trainer);
        plan.setUpdatedBy(trainer);
        plan = workoutPlanRepository.save(plan);

        return workoutPlanMapper.toDto(plan);
    }

    @Override
    public WorkoutPlanResponseDTO updatePlan(Long id, WorkoutPlanRequestDTO requestDTO) {
        WorkoutPlan existingPlan = workoutPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout Plan not found with ID: " + id));

        existingPlan.setPlanName(requestDTO.getPlanName());
        existingPlan.setDurationMinutes(requestDTO.getDurationMinutes());

        // Convert String to Enum
        existingPlan.setWorkoutStatus(WorkoutStatus.valueOf(requestDTO.getWorkoutStatus()));

        existingPlan.setExercises(requestDTO.getExercises());

        existingPlan = workoutPlanRepository.save(existingPlan);
        return workoutPlanMapper.toDto(existingPlan);
    }

    @Override
    public void deletePlan(Long id) {
        WorkoutPlan plan = workoutPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout Plan not found with ID: " + id));
        workoutPlanRepository.delete(plan);
    }
}