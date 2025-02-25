package net.physiqueForge.ems.service;

import net.physiqueForge.ems.dto.adminUser.AdminUserRequestDTO;
import net.physiqueForge.ems.dto.adminUser.AdminUserResponseDTO;
import java.util.List;

public interface AdminUserService {
    List<AdminUserResponseDTO> getAllAdminUsers();
    AdminUserResponseDTO getAdminUserById(Long id);
    AdminUserResponseDTO createAdminUser(AdminUserRequestDTO adminUserDTO);
    AdminUserResponseDTO updateAdminUser(Long id, AdminUserRequestDTO adminUserDTO);
    void deleteAdminUser(Long id);
}