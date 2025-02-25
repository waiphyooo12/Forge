package net.physiqueForge.ems.service.impl;

import lombok.RequiredArgsConstructor;
import net.physiqueForge.ems.dto.adminUser.AdminUserRequestDTO;
import net.physiqueForge.ems.dto.adminUser.AdminUserResponseDTO;
import net.physiqueForge.ems.mapper.AdminUserMapper;
import net.physiqueForge.ems.model.AdminUser;
import net.physiqueForge.ems.repository.AdminUserRepository;
import net.physiqueForge.ems.service.AdminUserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.StreamSupport;


@Service
@RequiredArgsConstructor
public class AdminUserServiceImpl implements AdminUserService {

    private final AdminUserRepository adminUserRepository;
    private final AdminUserMapper adminUserMapper;


    @Override
    public List<AdminUserResponseDTO> getAllAdminUsers() {
        return StreamSupport.stream(adminUserRepository.findAll().spliterator(), false)
                .map(adminUserMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public AdminUserResponseDTO getAdminUserById(Long id) {
        AdminUser adminUser = adminUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("AdminUser not found with ID: " + id));
        return adminUserMapper.toDto(adminUser);
    }

    @Transactional
    @Override
    public AdminUserResponseDTO createAdminUser(AdminUserRequestDTO adminUserDTO) {
        LocalDateTime now = LocalDateTime.now();

        AdminUser adminUser = adminUserMapper.toEntity(adminUserDTO);
        adminUser.setCreatedAt(now);
        adminUser.setUpdatedAt(now);

        AdminUser savedAdminUser = adminUserRepository.save(adminUser);
        return adminUserMapper.toDto(savedAdminUser);
    }

    @Transactional
    @Override
    public AdminUserResponseDTO updateAdminUser(Long id, AdminUserRequestDTO adminUserDTO) {
        AdminUser existingAdminUser = adminUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("AdminUser not found with ID: " + id));

        // Update fields
        existingAdminUser.setName(adminUserDTO.getName());
        existingAdminUser.setEmail(adminUserDTO.getEmail());
        existingAdminUser.setEncryptedPassword(adminUserDTO.getEncryptedPassword());
        existingAdminUser.setUpdatedAt(LocalDateTime.now());

        AdminUser updatedAdminUser = adminUserRepository.save(existingAdminUser);
        return adminUserMapper.toDto(updatedAdminUser);
    }

    @Transactional
    @Override
    public void deleteAdminUser(Long id) {
        AdminUser adminUser = adminUserRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("AdminUser not found with ID: " + id));
        adminUserRepository.delete(adminUser);
    }
}