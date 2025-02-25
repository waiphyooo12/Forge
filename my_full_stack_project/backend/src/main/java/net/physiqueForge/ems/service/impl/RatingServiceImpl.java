package net.physiqueForge.ems.service.impl;

import lombok.RequiredArgsConstructor;
import net.physiqueForge.ems.dto.rating.RatingRequestDTO;
import net.physiqueForge.ems.dto.rating.RatingResponseDTO;
import net.physiqueForge.ems.mapper.RatingMapper;
import net.physiqueForge.ems.model.Client;
import net.physiqueForge.ems.model.Rating;
import net.physiqueForge.ems.model.Trainer;
import net.physiqueForge.ems.repository.ClientRepository;
import net.physiqueForge.ems.repository.RatingRepository;
import net.physiqueForge.ems.repository.TrainerRepository;
import net.physiqueForge.ems.service.RatingService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;
    private final ClientRepository clientRepository;
    private final TrainerRepository trainerRepository;
    private final RatingMapper ratingMapper;

    @Override
    public List<RatingResponseDTO> getAllRatings() {
        return ratingRepository.findAll().stream()
                .map(ratingMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<RatingResponseDTO> getRatingsByTrainer(Long trainerId) {
        return ratingRepository.findByTrainerId(trainerId).stream()
                .map(ratingMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<RatingResponseDTO> getRatingsByClient(Long clientId) {
        return ratingRepository.findByClientId(clientId).stream()
                .map(ratingMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public RatingResponseDTO getRatingById(Long id) {
        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rating not found with ID: " + id));
        return ratingMapper.toDto(rating);
    }

    @Override
    public RatingResponseDTO createRating(RatingRequestDTO requestDTO) {
        Client client = clientRepository.findById(requestDTO.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));
        Trainer trainer = trainerRepository.findById(requestDTO.getTrainerId())
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

        Rating rating = ratingMapper.toEntity(requestDTO);
        rating.setClient(client);
        rating.setTrainer(trainer);

        rating = ratingRepository.save(rating);
        return ratingMapper.toDto(rating);
    }

    @Override
    public RatingResponseDTO updateRating(Long id, RatingRequestDTO requestDTO) {
        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rating not found with ID: " + id));

        rating.setRatingScore(requestDTO.getRatingScore());
        rating = ratingRepository.save(rating);
        return ratingMapper.toDto(rating);
    }

    @Override
    public void deleteRating(Long id) {
        ratingRepository.deleteById(id);
    }
}