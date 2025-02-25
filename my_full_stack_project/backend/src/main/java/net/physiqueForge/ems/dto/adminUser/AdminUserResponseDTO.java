package net.physiqueForge.ems.dto.adminUser;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AdminUserResponseDTO  extends MasterAdminUserDTO{
    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
