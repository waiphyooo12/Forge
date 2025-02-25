package net.physiqueForge.ems.dto.adminUser;

import lombok.Data;


@Data
public class AdminUserRequestDTO extends MasterAdminUserDTO{
    private String encryptedPassword;
}
