package net.physiqueForge.ems.repository;

import net.physiqueForge.ems.model.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan, Long> {

    @Query(value = "SELECT * FROM workout_plans", nativeQuery = true)
    List<WorkoutPlan> getAllWorkoutPlans();

    @Transactional
    @Query(value = "SELECT * FROM workout_plans WHERE id = :id", nativeQuery = true)
    WorkoutPlan getWorkoutPlanById(@Param("id") Long id);

    @Transactional
    @Query(value = """
        INSERT INTO workout_plans 
        (plan_name, duration_minutes, workout_status, exercises, assigned_client_id, created_by_id, updated_by_id, created_at, updated_at) 
        VALUES (:planName, :durationMinutes, :workoutStatus, :exercises, :assignedClientId, :createdById, :updatedById, :createdAt, :updatedAt)
        RETURNING id
        """, nativeQuery = true)
    Integer insertWorkoutPlan(
            @Param("planName") String planName,
            @Param("durationMinutes") double durationMinutes,
            @Param("workoutStatus") Integer workoutStatus,  // Ensure it's stored as an Integer
            @Param("exercises") String exercises,
            @Param("assignedClientId") Long assignedClientId,
            @Param("createdById") Long createdById,
            @Param("updatedById") Long updatedById,
            @Param("createdAt") LocalDateTime createdAt,
            @Param("updatedAt") LocalDateTime updatedAt
    );

    @Transactional
    @Modifying
    @Query(value = """
        UPDATE workout_plans SET 
        plan_name = :planName, duration_minutes = :durationMinutes, 
        workout_status = :workoutStatus, exercises = :exercises, assigned_client_id = :assignedClientId, 
        updated_by_id = :updatedById, updated_at = :updatedAt 
        WHERE id = :id
        """, nativeQuery = true)
    int updateWorkoutPlanById(
            @Param("id") Long id,
            @Param("planName") String planName,
            @Param("durationMinutes") double durationMinutes,
            @Param("workoutStatus") Integer workoutStatus,  // Stored as an Integer
            @Param("exercises") String exercises,
            @Param("assignedClientId") Long assignedClientId,
            @Param("updatedById") Long updatedById,
            @Param("updatedAt") LocalDateTime updatedAt
    );

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM workout_plans WHERE id = :id", nativeQuery = true)
    int deleteWorkoutPlanById(@Param("id") Long id);

    @Transactional
    @Query(value = "SELECT * FROM workout_plans WHERE created_by_id = :trainerId", nativeQuery = true)
    List<WorkoutPlan> findWorkoutPlansByTrainer(@Param("trainerId") Long trainerId);
}