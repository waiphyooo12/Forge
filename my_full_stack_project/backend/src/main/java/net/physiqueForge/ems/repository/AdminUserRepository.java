package net.physiqueForge.ems.repository;

import net.physiqueForge.ems.model.AdminUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AdminUserRepository extends CrudRepository<AdminUser, Long> {

    @Query(value = "SELECT * FROM admin_users", nativeQuery = true)
    List<AdminUser> getAllAdminUsers();

    @Query(value = "SELECT id FROM admin_users WHERE email = :email ORDER BY created_at DESC LIMIT 1", nativeQuery = true)
    Long findLatestAdminUserId(String email);

    @Transactional
    @Query(value = "SELECT * FROM admin_users WHERE id = :id", nativeQuery = true)
    AdminUser getAdminUserById(Long id);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO admin_users (name, email, encrypted_password, created_at, updated_at, created_by_id, updated_by_id) " +
            "VALUES (:name, :email, :encrypted_password, :created_at, :updated_at, :created_by_id, :updated_by_id)",
            nativeQuery = true)
    void addAdminUser(
            String name,
            String email,
            String encrypted_password,
            LocalDateTime created_at,
            LocalDateTime updated_at,
            Long created_by_id,
            Long updated_by_id
    );

    @Transactional
    @Modifying
    @Query(value = "UPDATE admin_users SET name = :name, email = :email, encrypted_password = :encrypted_password, " +
            "updated_at = :updated_at, updated_by_id = :updated_by_id WHERE id = :id", nativeQuery = true)
    int updateAdminUserById(
            Long id,
            String name,
            String email,
            String encrypted_password,
            LocalDateTime updated_at,
            Long updated_by_id
    );

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM admin_users WHERE id = :id", nativeQuery = true)
    int deleteAdminUserById(Long id);
}