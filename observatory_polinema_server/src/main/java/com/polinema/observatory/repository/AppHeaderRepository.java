package com.polinema.observatory.repository;

import com.polinema.observatory.model.AppHeader;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppHeaderRepository extends JpaRepository<AppHeader, Long> {
    List<AppHeader> findByUserId(Long user_id);
    
    @Override
    Optional<AppHeader> findById(Long id);
}