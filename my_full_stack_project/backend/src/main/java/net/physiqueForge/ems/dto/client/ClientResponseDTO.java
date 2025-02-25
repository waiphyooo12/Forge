package net.physiqueForge.ems.dto.client;

import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@Data
public class ClientResponseDTO extends MasterClientDTO {
    private Long id;
    private LocalDate dob;
    private double height;
    private double weight;
}