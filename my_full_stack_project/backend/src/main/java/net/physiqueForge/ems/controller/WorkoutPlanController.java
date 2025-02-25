package net.physiqueForge.ems.controller;

import lombok.AllArgsConstructor;
import net.physiqueForge.ems.dto.workoutPlan.WorkoutPlanRequestDTO;
import net.physiqueForge.ems.dto.workoutPlan.WorkoutPlanResponseDTO;
import net.physiqueForge.ems.service.WorkoutPlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workout-plans")
@AllArgsConstructor
public class WorkoutPlanController {

    private final WorkoutPlanService workoutPlanService;

    // ✅ CREATE Workout Plan
    @PostMapping
    public ResponseEntity<WorkoutPlanResponseDTO> createPlan(@RequestBody WorkoutPlanRequestDTO request) {
        System.out.println("request = " + request);
        return ResponseEntity.ok(workoutPlanService.createPlan(request));
    }

    // ✅ GET ALL Workout Plans
    @GetMapping
    public ResponseEntity<List<WorkoutPlanResponseDTO>> getAllPlans() {
        return ResponseEntity.ok(workoutPlanService.getAllPlans());
    }

    // ✅ GET Workout Plan by ID
    @GetMapping("/{id}")
    public ResponseEntity<WorkoutPlanResponseDTO> getPlanById(@PathVariable Long id) {
        return ResponseEntity.ok(workoutPlanService.getPlanById(id));
    }

    // ✅ UPDATE Workout Plan by ID
    @PutMapping("/{id}")
    public ResponseEntity<WorkoutPlanResponseDTO> updatePlan(@PathVariable Long id,
                                                             @RequestBody WorkoutPlanRequestDTO request) {
        return ResponseEntity.ok(workoutPlanService.updatePlan(id, request));
    }

    // ✅ DELETE Workout Plan by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePlan(@PathVariable Long id) {
        workoutPlanService.deletePlan(id);
        return ResponseEntity.ok("Workout Plan deleted successfully.");
    }
}