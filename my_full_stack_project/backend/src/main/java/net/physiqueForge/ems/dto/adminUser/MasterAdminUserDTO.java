package net.physiqueForge.ems.dto.adminUser;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MasterAdminUserDTO {
    private String name;
    private String email;
    private Long createdById;
    private Long updatedById;

}
