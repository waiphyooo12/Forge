package net.physiqueForge.ems.service.impl;

import lombok.RequiredArgsConstructor;
import net.physiqueForge.ems.dto.trainer.TrainerRequestDTO;
import net.physiqueForge.ems.dto.trainer.TrainerResponseDTO;
import net.physiqueForge.ems.mapper.TrainerMapper;
import net.physiqueForge.ems.model.AdminUser;
import net.physiqueForge.ems.model.Trainer;
import net.physiqueForge.ems.repository.AdminUserRepository;
import net.physiqueForge.ems.repository.TrainerRepository;
import net.physiqueForge.ems.service.TrainerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrainerServiceImpl implements TrainerService {

    private final TrainerRepository trainerRepository;
    private final AdminUserRepository adminUserRepository;
    private final TrainerMapper trainerMapper;

    @Override
    public List<TrainerResponseDTO> getAllTrainers() {
        return trainerRepository.getAllTrainers().stream()
                .map(trainerMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public TrainerResponseDTO getTrainerById(Long id) {
        Trainer trainer = trainerRepository.getTrainerById(id);
        if (trainer == null) {
            throw new RuntimeException("Trainer not found with ID: " + id);
        }
        return trainerMapper.toDto(trainer);
    }

    @Transactional
    @Override
    public TrainerResponseDTO createTrainer(TrainerRequestDTO trainerRequestDTO) {
        LocalDateTime now = LocalDateTime.now();

        Integer trainerId = trainerRepository.insertTrainer(
                trainerRequestDTO.getName(),
                trainerRequestDTO.getEmail(),
                trainerRequestDTO.getSpecialization(),
                trainerRequestDTO.getExperience(),
                trainerRequestDTO.getApprovedById(),
                now,
                now,
                trainerRequestDTO.getCreatedById(),
                trainerRequestDTO.getUpdatedById()
        );

        return getTrainerById(Long.valueOf(trainerId));
    }

    @Transactional
    @Override
    public TrainerResponseDTO updateTrainer(Long id, TrainerRequestDTO trainerRequestDTO) {
        LocalDateTime now = LocalDateTime.now();

        int updatedRows = trainerRepository.updateTrainerById(
                id,
                trainerRequestDTO.getName(),
                trainerRequestDTO.getEmail(),
                trainerRequestDTO.getSpecialization(),
                trainerRequestDTO.getExperience(),
                trainerRequestDTO.getApprovedById(),
                now
        );

        if (updatedRows == 0) {
            throw new RuntimeException("Trainer update failed for ID: " + id);
        }
        return getTrainerById(id);
    }

    @Transactional
    @Override
    public void deleteTrainer(Long id) {
        int deletedRows = trainerRepository.deleteTrainerById(id);
        if (deletedRows == 0) {
            throw new RuntimeException("Trainer deletion failed for ID: " + id);
        }
    }
}