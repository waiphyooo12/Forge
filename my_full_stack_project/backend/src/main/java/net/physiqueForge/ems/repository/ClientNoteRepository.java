package net.physiqueForge.ems.repository;

import net.physiqueForge.ems.model.ClientNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClientNoteRepository extends JpaRepository<ClientNote, Long> {

    @Query(value = "SELECT * FROM client_notes WHERE created_by_id = :clientId", nativeQuery = true)
    List<ClientNote> findByCreatedById(@Param("clientId") Long clientId);

    @Transactional
    @Query(value = "SELECT * FROM client_notes WHERE id = :noteId", nativeQuery = true)
    Optional<ClientNote> findById(@Param("noteId") Long noteId);

    @Transactional
    @Modifying
    @Query(value = """
        INSERT INTO client_notes 
        (note_text, created_by_id, workout_plan_id, created_at, updated_at) 
        VALUES (:noteText, :createdById, :workoutPlanId, :createdAt, :updatedAt)
        RETURNING id
        """, nativeQuery = true)
    Integer insertClientNote(
            @Param("noteText") String noteText,
            @Param("createdById") Long createdById,
            @Param("workoutPlanId") Long workoutPlanId,
            @Param("createdAt") LocalDateTime createdAt,
            @Param("updatedAt") LocalDateTime updatedAt
    );

    @Transactional
    @Modifying
    @Query(value = """
        UPDATE client_notes SET 
        note_text = :noteText, updated_at = :updatedAt 
        WHERE id = :noteId
        """, nativeQuery = true)
    int updateClientNoteById(
            @Param("noteId") Long noteId,
            @Param("noteText") String noteText,
            @Param("updatedAt") LocalDateTime updatedAt
    );

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM client_notes WHERE id = :noteId", nativeQuery = true)
    int deleteClientNoteById(@Param("noteId") Long noteId);
}