package net.physiqueForge.ems.controller;

import lombok.AllArgsConstructor;
import net.physiqueForge.ems.dto.client_note.ClientNoteRequestDTO;
import net.physiqueForge.ems.dto.client_note.ClientNoteResponseDTO;
import net.physiqueForge.ems.service.ClientNoteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client-notes")
@AllArgsConstructor
public class ClientNoteController {

    private final ClientNoteService clientNoteService;

    @PostMapping
    public ResponseEntity<ClientNoteResponseDTO> createNote(@RequestBody ClientNoteRequestDTO request) {
        return ResponseEntity.ok(clientNoteService.createNote(request));
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<List<ClientNoteResponseDTO>> getAllNotes(@PathVariable Long clientId) {
        return ResponseEntity.ok(clientNoteService.getAllNotesByClient(clientId));
    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<String> deleteNote(@PathVariable Long noteId) {
        clientNoteService.deleteNote(noteId);
        return ResponseEntity.ok("Note deleted successfully");
    }
}