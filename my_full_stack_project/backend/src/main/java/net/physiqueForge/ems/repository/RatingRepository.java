package net.physiqueForge.ems.repository;

import net.physiqueForge.ems.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    @Query(value = "SELECT * FROM ratings", nativeQuery = true)
    List<Rating> getAllRatings();

    @Transactional
    @Query(value = "SELECT * FROM ratings WHERE id = :id", nativeQuery = true)
    Optional<Rating> findById(@Param("id") Long id);

    @Transactional
    @Query(value = "SELECT * FROM ratings WHERE trainer_id = :trainerId", nativeQuery = true)
    List<Rating> findByTrainerId(@Param("trainerId") Long trainerId);

    @Transactional
    @Query(value = "SELECT * FROM ratings WHERE client_id = :clientId", nativeQuery = true)
    List<Rating> findByClientId(@Param("clientId") Long clientId);

    @Transactional
    @Modifying
    @Query(value = """
        INSERT INTO ratings 
        (client_id, trainer_id, rating_score) 
        VALUES (:clientId, :trainerId, :ratingScore)
        RETURNING id
        """, nativeQuery = true)
    Integer insertRating(
            @Param("clientId") Long clientId,
            @Param("trainerId") Long trainerId,
            @Param("ratingScore") int ratingScore
    );

    @Transactional
    @Modifying
    @Query(value = """
        UPDATE ratings SET rating_score = :ratingScore 
        WHERE id = :id
        """, nativeQuery = true)
    int updateRatingById(
            @Param("id") Long id,
            @Param("ratingScore") int ratingScore
    );

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM ratings WHERE id = :id", nativeQuery = true)
    int deleteRatingById(@Param("id") Long id);
}