package net.physiqueForge.ems.controller;

import lombok.AllArgsConstructor;
import net.physiqueForge.ems.dto.rating.RatingRequestDTO;
import net.physiqueForge.ems.dto.rating.RatingResponseDTO;
import net.physiqueForge.ems.service.RatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@AllArgsConstructor
public class RatingController {

    private final RatingService ratingService;

    @PostMapping
    public ResponseEntity<RatingResponseDTO> createRating(@RequestBody RatingRequestDTO request) {
        return ResponseEntity.ok(ratingService.createRating(request));
    }

    @GetMapping("/trainer/{trainerId}")
    public ResponseEntity<List<RatingResponseDTO>> getTrainerRatings(@PathVariable Long trainerId) {
        return ResponseEntity.ok(ratingService.getRatingsByTrainer(trainerId));
    }
}
