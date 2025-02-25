package net.physiqueForge.ems.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.physiqueForge.ems.model.constant.WorkoutStatus;
import net.physiqueForge.ems.model.converter.WorkoutStatusConverter;

import java.time.LocalDate;

@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
@NoArgsConstructor
@Entity
@Table(name = "clients")
public class Client extends MasterData {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phoneNumber;

    private String encryptedPassword;

    @Column(nullable = false)
    private LocalDate dob;

    @Column(nullable = false)
    private double height;

    @Column(nullable = false)
    private double weight;

    @Column(nullable = true)
    @Convert(converter = WorkoutStatusConverter.class)
    private WorkoutStatus clientStatus;

    @Column(nullable = false)
    private String goal;
}