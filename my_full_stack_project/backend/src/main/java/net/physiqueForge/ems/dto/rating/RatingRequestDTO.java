package net.physiqueForge.ems.dto.rating;

import lombok.Data;

@Data
public class RatingRequestDTO {
    private Long clientId;  // Client giving the rating
    private Long trainerId;  // Trainer receiving the rating
    private int ratingScore;  // Score (1-5)
}