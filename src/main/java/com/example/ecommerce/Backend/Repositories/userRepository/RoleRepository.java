package com.example.ecommerce.Backend.Repositories.userRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.Backend.Modals.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
