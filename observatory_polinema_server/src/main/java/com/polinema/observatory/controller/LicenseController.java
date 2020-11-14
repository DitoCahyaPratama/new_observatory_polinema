package com.polinema.observatory.controller;

import com.polinema.observatory.model.License;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.polinema.observatory.repository.LicenseRepository;

@RestController
@RequestMapping("/api")
public class LicenseController {
    @Autowired
    private LicenseRepository licenseRepository;

    @GetMapping("/licenses")
    public List<License> getAllLicense() {
        return licenseRepository.findAll();
    }
}