package com.polinema.observatory.repository;

import com.polinema.observatory.model.ResearchGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResearchGroupRepository extends JpaRepository<ResearchGroup, Long> {

}