package com.spring.chat.userApp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAppRepo extends JpaRepository<UserApp, Long> {
    Optional<UserApp> findByUsername(@Param(value = "username") String username);
}
