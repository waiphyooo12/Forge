package net.physiqueForge.ems.controller;

import lombok.RequiredArgsConstructor;
import net.physiqueForge.ems.dto.adminUser.AdminUserRequestDTO;
import net.physiqueForge.ems.dto.adminUser.AdminUserResponseDTO;
import net.physiqueForge.ems.service.AdminUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin-users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    public ResponseEntity<List<AdminUserResponseDTO>> getAllAdminUsers() {
        return ResponseEntity.ok(adminUserService.getAllAdminUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminUserResponseDTO> getAdminUserById(@PathVariable Long id) {
        return ResponseEntity.ok(adminUserService.getAdminUserById(id));
    }

    @PostMapping
    public ResponseEntity<AdminUserResponseDTO> createAdminUser(@RequestBody AdminUserRequestDTO requestDTO) {
        return ResponseEntity.ok(adminUserService.createAdminUser(requestDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminUserResponseDTO> updateAdminUser(@PathVariable Long id, @RequestBody AdminUserRequestDTO requestDTO) {
        return ResponseEntity.ok(adminUserService.updateAdminUser(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdminUser(@PathVariable Long id) {
        adminUserService.deleteAdminUser(id);
        return ResponseEntity.noContent().build();
    }
}