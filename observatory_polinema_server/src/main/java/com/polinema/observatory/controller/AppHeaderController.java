package com.polinema.observatory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import com.polinema.observatory.security.CurrentUser;
import com.polinema.observatory.security.UserPrincipal;
import com.polinema.observatory.service.AppHeaderService;
import com.polinema.observatory.repository.LicenseRepository;
import com.polinema.observatory.repository.ResearchGroupRepository;
import com.polinema.observatory.repository.UserRepository;  
import com.polinema.observatory.repository.AppHeaderRepository;
import javax.validation.Valid;
import com.polinema.observatory.model.*;
import com.polinema.observatory.payload.AppHeaderResponse;
import java.util.*;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/appheader")
public class AppHeaderController {

    @Autowired
    private AppHeaderRepository appHeaderRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ResearchGroupRepository researchGroupRepository;
    
    @Autowired
    private LicenseRepository licenseRepository;
    
    @Autowired
    private AppHeaderService appHeaderService;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<AppHeader> getAllAppHeader(@CurrentUser UserPrincipal currentUser) {
        return appHeaderService.getAppHeaderByUserId(currentUser);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public AppHeaderResponse getAppHeaderById(@CurrentUser UserPrincipal currentUser,
                                        @PathVariable (value = "id") Long id) {
        return appHeaderService.getAppHeaderById(id, currentUser);
    }

    @PostMapping("/{rg_id}/{lic_id}")
    @PreAuthorize("hasRole('USER')")
    public AppHeader createAppHeader(@CurrentUser UserPrincipal currentUser,
                                     @PathVariable (value = "rg_id") Long rgId,
                                     @PathVariable (value = "lic_id") Long licId, 
                                     @Valid @RequestBody AppHeader appHeader) {
        
        return appHeaderService.postAppHeader(appHeader, currentUser, rgId, licId);
    }
    
    @PutMapping("/{id}/{rg_id}/{lic_id}")
    @PreAuthorize("hasRole('USER')")
     public AppHeader updateAppHeader(@CurrentUser UserPrincipal currentUser,
                                     @PathVariable (value = "id") Long id,
                                     @PathVariable (value = "rg_id") Long rgId,
                                     @PathVariable (value = "lic_id") Long licId, 
                                     @Valid @RequestBody AppHeader appHeaderReq) {
        return appHeaderService.updateAppHeader(appHeaderReq, currentUser, id, rgId, licId);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public HttpStatus deleteAppHeader( @PathVariable (value = "id") Long id){
        appHeaderService.deleteAppHeaderById(id);
        return HttpStatus.FORBIDDEN;
    }
}