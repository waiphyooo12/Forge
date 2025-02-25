package net.physiqueForge.ems.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
@NoArgsConstructor
@Entity
@Table(name = "trainers")
public class Trainer extends MasterData {

    @Column(nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false)
    private long experience;

    @ManyToOne
    @JoinColumn(name = "approved_by_id", foreignKey = @ForeignKey(name = "fk_trainer_admin"))
    private AdminUser approvedBy;
}