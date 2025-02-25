package net.physiqueForge.ems.dto.client;


import lombok.Data;
import net.physiqueForge.ems.model.constant.WorkoutStatus;

@Data
public class MasterClientDTO {
    private String name;
    private String email;
    private String phoneNumber;
    private WorkoutStatus clientStatus;
    private String goal;
}
