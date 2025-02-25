package net.physiqueForge.ems.mapper;

import net.physiqueForge.ems.dto.rating.RatingRequestDTO;
import net.physiqueForge.ems.dto.rating.RatingResponseDTO;
import net.physiqueForge.ems.model.Rating;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RatingMapper {

    RatingMapper INSTANCE = Mappers.getMapper(RatingMapper.class);

    @Mapping(source = "client.name", target = "clientName")
    @Mapping(source = "trainer.name", target = "trainerName")
    RatingResponseDTO toDto(Rating rating);

    @Mapping(target = "client", ignore = true)
    @Mapping(target = "trainer", ignore = true)
    Rating toEntity(RatingRequestDTO ratingRequestDTO);

    List<RatingResponseDTO> toDtoList(List<Rating> ratings);
}