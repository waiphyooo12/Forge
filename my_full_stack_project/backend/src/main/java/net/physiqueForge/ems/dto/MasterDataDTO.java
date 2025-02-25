package net.physiqueForge.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.physiqueForge.ems.model.AdminUser;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MasterDataDTO {

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private AdminUser createdBy;
    private AdminUser updatedBy;

}
