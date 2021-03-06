package com.als.tasks.repositories;

import java.util.Optional;

import javax.transaction.Transactional;

import com.als.tasks.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    @Transactional
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

}
