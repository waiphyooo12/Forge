package net.physiqueForge.ems.repository;

import net.physiqueForge.ems.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    @Query(value = "SELECT * FROM clients", nativeQuery = true)
    List<Client> getAllClients();

    @Transactional
    @Query(value = "SELECT * FROM clients WHERE id = :id", nativeQuery = true)
    Client getClientById(Long id);

    @Transactional
    @Query(value = "INSERT INTO clients (name, email, phone_number, encrypted_password, dob, height, weight, client_status, goal, created_at, updated_at, created_by_id, updated_by_id) " +
            "VALUES (:name, :email, :phone, :password, :dob, :height, :weight, :status, :goal, :createdAt, :updatedAt, :createdBy, :updatedBy) RETURNING id", nativeQuery = true)
    void insertClient(@Param("name") String name, @Param("email") String email,
                      @Param("phone") String phone, @Param("password") String password,
                      @Param("dob") LocalDate dob, @Param("height") Double height,
                      @Param("weight") Double weight, @Param("status") Integer status,
                      @Param("goal") String goal, @Param("createdAt") LocalDateTime createdAt,
                      @Param("updatedAt") LocalDateTime updatedAt,
                      @Param("createdBy") Long createdBy, @Param("updatedBy") Long updatedBy);

    @Transactional
    @Modifying
    @Query(value = """
        UPDATE clients SET 
        name = :name, email = :email, phone_number = :phoneNumber, encrypted_password = :encryptedPassword, 
        dob = :dob, height = :height, weight = :weight, client_status = :clientStatus, goal = :goal, updated_at = :updatedAt 
        WHERE id = :id
        """, nativeQuery = true)
    int updateClientById(
            Long id,
            String name,
            String email,
            String phoneNumber,
            String encryptedPassword,
            LocalDate dob,
            double height,
            double weight,
            Integer clientStatus,
            String goal,
            LocalDateTime updatedAt
    );

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM clients WHERE id = :id", nativeQuery = true)
    int deleteClientById(Long id);

    @Transactional
    @Query(value = "SELECT * FROM clients WHERE email = :email", nativeQuery = true)
    Client findByEmail(String email);
}