package net.physiqueForge.ems.mapper;

import net.physiqueForge.ems.dto.client_note.ClientNoteRequestDTO;
import net.physiqueForge.ems.dto.client_note.ClientNoteResponseDTO;
import net.physiqueForge.ems.model.ClientNote;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClientNoteMapper {

    ClientNoteMapper INSTANCE = Mappers.getMapper(ClientNoteMapper.class);

    @Mapping(source = "createdBy.name", target = "createdByName")
    @Mapping(source = "updatedBy.name", target = "updatedByName")
    ClientNoteResponseDTO toDto(ClientNote clientNote);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "updatedBy", ignore = true)
    @Mapping(target = "workoutPlan", ignore = true)
    ClientNote toEntity(ClientNoteRequestDTO clientNoteRequestDTO);

    List<ClientNoteResponseDTO> toDtoList(List<ClientNote> clientNotes);
}