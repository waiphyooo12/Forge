package net.physiqueForge.ems.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Table(name = "admin_users")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUser extends MasterData {

    @Column
    private String email;
    @Column
    private String name;
    @Column
    private String encryptedPassword;

}
