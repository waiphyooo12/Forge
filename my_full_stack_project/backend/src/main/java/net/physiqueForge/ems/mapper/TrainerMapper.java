package net.physiqueForge.ems.mapper;

import net.physiqueForge.ems.dto.trainer.MasterTrainerDTO;
import net.physiqueForge.ems.dto.trainer.TrainerRequestDTO;
import net.physiqueForge.ems.dto.trainer.TrainerResponseDTO;
import net.physiqueForge.ems.model.AdminUser;
import net.physiqueForge.ems.model.Trainer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TrainerMapper {

    TrainerMapper INSTANCE = Mappers.getMapper(TrainerMapper.class);

    @Mapping(source = "approvedBy.id", target = "approvedById")
    TrainerResponseDTO toDto(Trainer trainer);

    @Mapping(source = "approvedById", target = "approvedBy.id")
    Trainer toEntity(TrainerRequestDTO trainerRequestDTO);

    default MasterTrainerDTO toMasterDto(TrainerResponseDTO dto) {
        return new MasterTrainerDTO(dto.getName(), dto.getEmail(), dto.getSpecialization(), dto.getExperience(), dto.getApprovedById());
    }

    default List<MasterTrainerDTO> toMasterDtoList(List<TrainerResponseDTO> dtos) {
        return dtos.stream().map(this::toMasterDto).toList();
    }
}