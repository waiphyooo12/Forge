package net.physiqueForge.ems.dto.client_note;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MasterClientNoteDTO {
    private Long createdById;  // ID of the client creating the note
    private Long updatedById;  // ID of the client updating the note
    private Long workoutPlanId;  // (Optional) Link to a workout plan
    private String noteText;  // The actual note content
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdByName; // Name of the creator
    private String updatedByName; // Name of the last updater
}