/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.polinema.observatory.repository;

import com.polinema.observatory.model.AppDetail;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Doyatama
 */
@Repository
public interface AppDetailRepository extends JpaRepository<AppDetail, Long> {
    List<AppDetail> findByAppHeaderId(Long header_id);
    
    List<AppDetail> findAllById(Long id);
    
    @Override
    Optional<AppDetail> findById(Long id);
}
