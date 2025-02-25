package net.physiqueForge.ems.service.impl;

import net.physiqueForge.ems.dto.client_note.ClientNoteRequestDTO;
import net.physiqueForge.ems.dto.client_note.ClientNoteResponseDTO;
import net.physiqueForge.ems.mapper.ClientNoteMapper;
import net.physiqueForge.ems.model.Client;
import net.physiqueForge.ems.model.ClientNote;
import net.physiqueForge.ems.model.WorkoutPlan;
import net.physiqueForge.ems.repository.ClientRepository;
import net.physiqueForge.ems.repository.ClientNoteRepository;
import net.physiqueForge.ems.repository.WorkoutPlanRepository;
import net.physiqueForge.ems.service.ClientNoteService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClientNoteServiceImpl implements ClientNoteService {

    private final ClientNoteRepository clientNoteRepository;
    private final ClientRepository clientRepository;
    private final WorkoutPlanRepository workoutPlanRepository;
    private final ClientNoteMapper clientNoteMapper;

    public ClientNoteServiceImpl(ClientNoteRepository clientNoteRepository, ClientRepository clientRepository,
                                 WorkoutPlanRepository workoutPlanRepository, ClientNoteMapper clientNoteMapper) {
        this.clientNoteRepository = clientNoteRepository;
        this.clientRepository = clientRepository;
        this.workoutPlanRepository = workoutPlanRepository;
        this.clientNoteMapper = clientNoteMapper;
    }

    @Override
    public List<ClientNoteResponseDTO> getAllNotesByClient(Long clientId) {
        List<ClientNote> notes = clientNoteRepository.findByCreatedById(clientId);
        return clientNoteMapper.toDtoList(notes);
    }

    @Override
    public ClientNoteResponseDTO getNoteById(Long noteId) {
        ClientNote note = clientNoteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found with ID: " + noteId));
        return clientNoteMapper.toDto(note);
    }

    @Override
    public ClientNoteResponseDTO createNote(ClientNoteRequestDTO clientNoteRequestDTO) {
        Client createdBy = clientRepository.findById(clientNoteRequestDTO.getCreatedById())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        ClientNote clientNote = clientNoteMapper.toEntity(clientNoteRequestDTO);
        clientNote.setCreatedBy(createdBy);
        clientNote.setCreatedAt(LocalDateTime.now());
        clientNote.setUpdatedAt(LocalDateTime.now());

        if (clientNoteRequestDTO.getWorkoutPlanId() != null) {
            WorkoutPlan workoutPlan = workoutPlanRepository.findById(clientNoteRequestDTO.getWorkoutPlanId())
                    .orElseThrow(() -> new RuntimeException("Workout Plan not found"));
            clientNote.setWorkoutPlan(workoutPlan);
        }

        clientNote = clientNoteRepository.save(clientNote);
        return clientNoteMapper.toDto(clientNote);
    }

    @Override
    public ClientNoteResponseDTO updateNote(Long noteId, ClientNoteRequestDTO clientNoteRequestDTO) {
        ClientNote existingNote = clientNoteRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));

        existingNote.setNoteText(clientNoteRequestDTO.getNoteText());
        existingNote.setUpdatedAt(LocalDateTime.now());

        existingNote = clientNoteRepository.save(existingNote);
        return clientNoteMapper.toDto(existingNote);
    }

    @Override
    public void deleteNote(Long noteId) {
        clientNoteRepository.deleteById(noteId);
    }
}