package net.physiqueForge.ems.service;

import net.physiqueForge.ems.dto.client_note.ClientNoteRequestDTO;
import net.physiqueForge.ems.dto.client_note.ClientNoteResponseDTO;

import java.util.List;

public interface ClientNoteService {
    List<ClientNoteResponseDTO> getAllNotesByClient(Long clientId);
    ClientNoteResponseDTO getNoteById(Long noteId);
    ClientNoteResponseDTO createNote(ClientNoteRequestDTO clientNoteRequestDTO);
    ClientNoteResponseDTO updateNote(Long noteId, ClientNoteRequestDTO clientNoteRequestDTO);
    void deleteNote(Long noteId);
}