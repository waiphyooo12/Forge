package net.physiqueForge.ems.repository;

import net.physiqueForge.ems.model.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {

    @Query(value = "SELECT * FROM trainers", nativeQuery = true)
    List<Trainer> getAllTrainers();

    @Transactional
    @Query(value = "SELECT * FROM trainers WHERE id = :id", nativeQuery = true)
    Trainer getTrainerById(@Param("id") Long id);

    @Transactional
    @Query(value = """
        INSERT INTO trainers (name, email, specialization, experience, approved_by_id, created_at, updated_at, created_by_id, updated_by_id) 
        VALUES (:name, :email, :specialization, :experience, :approvedBy, :createdAt, :updatedAt, :createdBy, :updatedBy)
        RETURNING id
        """, nativeQuery = true)
    Integer insertTrainer(
            @Param("name") String name,
            @Param("email") String email,
            @Param("specialization") String specialization,
            @Param("experience") long experience,
            @Param("approvedBy") Long approvedBy,
            @Param("createdAt") LocalDateTime createdAt,
            @Param("updatedAt") LocalDateTime updatedAt,
            @Param("createdBy") Long createdBy,
            @Param("updatedBy") Long updatedBy
    );

    @Transactional
    @Modifying
    @Query(value = """
        UPDATE trainers SET 
        name = :name, email = :email, specialization = :specialization, 
        experience = :experience, approved_by_id = :approvedBy, updated_at = :updatedAt 
        WHERE id = :id
        """, nativeQuery = true)
    int updateTrainerById(
            @Param("id") Long id,
            @Param("name") String name,
            @Param("email") String email,
            @Param("specialization") String specialization,
            @Param("experience") long experience,
            @Param("approvedBy") Long approvedBy,
            @Param("updatedAt") LocalDateTime updatedAt
    );

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM trainers WHERE id = :id", nativeQuery = true)
    int deleteTrainerById(@Param("id") Long id);

    @Transactional
    @Query(value = "SELECT * FROM trainers WHERE email = :email", nativeQuery = true)
    Trainer findByEmail(@Param("email") String email);
}