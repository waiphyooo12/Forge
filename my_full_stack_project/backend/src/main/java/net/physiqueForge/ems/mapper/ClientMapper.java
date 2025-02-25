package net.physiqueForge.ems.mapper;

import net.physiqueForge.ems.dto.client.ClientRequestDTO;
import net.physiqueForge.ems.dto.client.ClientResponseDTO;
import net.physiqueForge.ems.model.Client;
import net.physiqueForge.ems.model.constant.WorkoutStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ClientMapper {

    ClientMapper INSTANCE = Mappers.getMapper(ClientMapper.class);

    Client toEntity(ClientRequestDTO clientRequestDTO);

    ClientResponseDTO toDto(Client client);

    List<ClientResponseDTO> toDtoList(List<Client> clients);


}