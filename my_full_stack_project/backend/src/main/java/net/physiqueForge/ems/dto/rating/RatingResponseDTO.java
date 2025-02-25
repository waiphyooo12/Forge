package net.physiqueForge.ems.dto.rating;

import lombok.Data;

@Data
public class RatingResponseDTO {
    private Long id;
    private int ratingScore;
    private String clientName;  // Name of the client who rated
    private String trainerName;  // Name of the trainer who was rated
}
