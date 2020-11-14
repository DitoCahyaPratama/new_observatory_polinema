/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.polinema.observatory.service;

import com.polinema.observatory.exception.BadRequestException;
import com.polinema.observatory.exception.ResourceNotFoundException;
import com.polinema.observatory.model.AppHeader;
import com.polinema.observatory.model.License;
import com.polinema.observatory.model.ResearchGroup;
import com.polinema.observatory.model.User;
import com.polinema.observatory.payload.AppHeaderResponse;
import com.polinema.observatory.repository.AppHeaderRepository;
import com.polinema.observatory.repository.LicenseRepository;
import com.polinema.observatory.repository.ResearchGroupRepository;
import com.polinema.observatory.repository.UserRepository;
import com.polinema.observatory.security.UserPrincipal;
import com.polinema.observatory.util.AppConstants;
import com.polinema.observatory.util.ModelMapper;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Doyatama
 */
@Service
public class AppHeaderService {
    @Autowired
    private AppHeaderRepository appHeaderRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ResearchGroupRepository researchGroupRepository;
    
    @Autowired
    private LicenseRepository licenseRepository;
    
    public List<AppHeader> getAppHeaderByUserId(UserPrincipal currentUser){
        List<AppHeader> appHeaderList = (List<AppHeader>) appHeaderRepository.findByUserId(currentUser.getId());
        return appHeaderList;
    }
    
    public AppHeaderResponse getAppHeaderById(Long id, UserPrincipal currentUser){
        AppHeader ah = appHeaderRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("AppHeader", "id", id));
        System.out.println("LICENSE ID: " + ah.getLicense().getId());
        License lic = licenseRepository.findById(ah.getLicense().getId()).orElseThrow(
                () -> new ResourceNotFoundException("License", "id", ah.getLicense().getId()));
        ResearchGroup rg = researchGroupRepository.findById(ah.getResearchGroup().getId()).orElseThrow(
                () -> new ResourceNotFoundException("ResearchGroup", "id", ah.getResearchGroup().getId()));
        User creator = userRepository.findById(ah.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", ah.getCreatedBy()));
        
//        Optional<AppHeader> appHeader = appHeaderRepository.findById(id);
//        if(appHeader.isPresent()){
//            return appHeader.get();
//        }else{
//            throw new ResourceNotFoundException("App Header", "id", id);
//        }
        return ModelMapper.mapAppHeaderToAppHeaderResponse(ah, lic, rg, creator);
    }
    
    public AppHeader postAppHeader(AppHeader appHeader, UserPrincipal currentUser, Long rg_id, Long lic_id){
        User user = userRepository.getOne(currentUser.getId());
        
        ResearchGroup researchGroup = researchGroupRepository.findById(rg_id)
                                .orElseThrow(() -> new ResourceNotFoundException("Research Group", "id", rg_id));
        License license = licenseRepository.findById(lic_id)
                                .orElseThrow(() -> new ResourceNotFoundException("License", "id", lic_id));
        appHeader.setUser(user);
        appHeader.setResearchGroup(researchGroup);
        appHeader.setLicense(license);
        appHeader.setCreatedBy(currentUser.getId());
        return appHeaderRepository.save(appHeader);
    }
    
    public AppHeader updateAppHeader(AppHeader appHeaderReq, UserPrincipal currentUser, Long id, Long rg_id, Long lic_id){
        ResearchGroup researchGroup = researchGroupRepository.findById(rg_id)
                                .orElseThrow(() -> new ResourceNotFoundException("Research Group", "id", rg_id));
        License license = licenseRepository.findById(lic_id)
                                .orElseThrow(() -> new ResourceNotFoundException("License", "id", lic_id));
        return appHeaderRepository.findById(id).map(appHeader -> {
            appHeader.setName(appHeaderReq.getName());
            appHeader.setDescription(appHeaderReq.getDescription());
            appHeader.setResearchGroup(researchGroup);
            appHeader.setOrganization(appHeaderReq.getOrganization());
            appHeader.setLink(appHeaderReq.getLink());
            appHeader.setTags(appHeaderReq.getTags());
            appHeader.setCitedAs(appHeaderReq.getCitedAs());
            appHeader.setPublishDate(appHeaderReq.getPublishDate());
            appHeader.setGeneratedDate(appHeaderReq.getGeneratedDate());
            appHeader.setLicense(license);
            appHeader.setUpdatedBy(currentUser.getId());
            return appHeaderRepository.save(appHeader);
        }).orElseThrow(() -> new ResourceNotFoundException("App Header " , "id" , id));
    }
    
    public void deleteAppHeaderById(Long id){
        Optional<AppHeader> appHeader = appHeaderRepository.findById(id);
        if(appHeader.isPresent()){
            appHeaderRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("App Header", "id", id);
        }
    }
}
   