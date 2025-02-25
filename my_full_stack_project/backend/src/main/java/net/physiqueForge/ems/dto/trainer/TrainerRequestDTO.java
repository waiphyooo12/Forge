package net.physiqueForge.ems.dto.trainer;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class TrainerRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Specialization is required")
    private String specialization;

    @NotNull(message = "Experience cannot be null")
    private Long experience;

    private Long approvedById; //  Store only the AdminUser ID, not the object
    private Long createdById;
    private Long updatedById;
}