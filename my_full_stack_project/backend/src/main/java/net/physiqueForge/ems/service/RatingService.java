package net.physiqueForge.ems.service;

import net.physiqueForge.ems.dto.rating.RatingRequestDTO;
import net.physiqueForge.ems.dto.rating.RatingResponseDTO;

import java.util.List;

public interface RatingService {
    List<RatingResponseDTO> getAllRatings();
    List<RatingResponseDTO> getRatingsByTrainer(Long trainerId);
    List<RatingResponseDTO> getRatingsByClient(Long clientId);
    RatingResponseDTO getRatingById(Long id);
    RatingResponseDTO createRating(RatingRequestDTO ratingRequestDTO);
    RatingResponseDTO updateRating(Long id, RatingRequestDTO ratingRequestDTO);
    void deleteRating(Long id);
}
