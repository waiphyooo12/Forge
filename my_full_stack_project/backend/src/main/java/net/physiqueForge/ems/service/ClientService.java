package net.physiqueForge.ems.service;


import net.physiqueForge.ems.dto.client.ClientRequestDTO;
import net.physiqueForge.ems.dto.client.ClientResponseDTO;

import java.util.List;

public interface ClientService {

    List<ClientResponseDTO> getAllClients();

    ClientResponseDTO getClientById(Long id);

    ClientResponseDTO createClient(ClientRequestDTO clientRequestDTO);

    ClientResponseDTO updateClient(Long id, ClientRequestDTO clientRequestDTO);

    void deleteClient(Long id);
}