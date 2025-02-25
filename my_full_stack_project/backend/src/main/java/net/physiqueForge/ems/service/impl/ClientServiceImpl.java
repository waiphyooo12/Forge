package net.physiqueForge.ems.service.impl;

import lombok.RequiredArgsConstructor;
import net.physiqueForge.ems.dto.client.ClientRequestDTO;
import net.physiqueForge.ems.dto.client.ClientResponseDTO;
import net.physiqueForge.ems.mapper.ClientMapper;
import net.physiqueForge.ems.model.Client;
import net.physiqueForge.ems.model.constant.WorkoutStatus;
import net.physiqueForge.ems.model.converter.WorkoutStatusConverter;
import net.physiqueForge.ems.repository.ClientRepository;
import net.physiqueForge.ems.service.ClientService;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    @Override
    public List<ClientResponseDTO> getAllClients() {
        return clientRepository.getAllClients().stream()
                .map(clientMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ClientResponseDTO getClientById(Long id) {
        Client client = clientRepository.getClientById(id);
        if (client == null) {
            throw new RuntimeException("Client not found with ID: " + id);
        }
        return clientMapper.toDto(client);
    }

    @Override
    public ClientResponseDTO createClient(ClientRequestDTO clientRequestDTO) {
        LocalDateTime now = LocalDateTime.now();
        Client client = clientMapper.toEntity(clientRequestDTO);

        // Ensure all required fields are being passed correctly
        clientRepository.insertClient(
                client.getName(),
                client.getEmail(),
                client.getPhoneNumber(),
                client.getEncryptedPassword(),
                client.getDob(),
                client.getHeight(),
                client.getWeight(),
                client.getClientStatus().getValue(), // Assuming this is an Enum, get the value
                client.getGoal(),
                now,
                now,
                null,
                null
        );

        Client savedClient = clientRepository.findByEmail(clientRequestDTO.getEmail());

        return getClientById(savedClient.getId());
    }

    @Transactional
    @Override
    public ClientResponseDTO updateClient(Long id, ClientRequestDTO clientRequestDTO) {
        LocalDateTime now = LocalDateTime.now();

        int updatedRows = clientRepository.updateClientById(
                id,
                clientRequestDTO.getName(),
                clientRequestDTO.getEmail(),
                clientRequestDTO.getPhoneNumber(),
                clientRequestDTO.getEncryptedPassword(),
                clientRequestDTO.getDob(),
                clientRequestDTO.getHeight(),
                clientRequestDTO.getWeight(),
                clientRequestDTO.getClientStatus().getValue(),
                clientRequestDTO.getGoal(),
                now
        );

        if (updatedRows == 0) {
            throw new RuntimeException("Client update failed for ID: " + id);
        }
        return getClientById(id);
    }

    @Transactional
    @Override
    public void deleteClient(Long id) {
        int deletedRows = clientRepository.deleteClientById(id);
        if (deletedRows == 0) {
            throw new RuntimeException("Client deletion failed for ID: " + id);
        }
    }
}