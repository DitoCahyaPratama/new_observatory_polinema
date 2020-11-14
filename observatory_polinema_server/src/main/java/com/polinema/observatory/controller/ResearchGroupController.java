package com.polinema.observatory.controller;

import com.polinema.observatory.model.ResearchGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.polinema.observatory.repository.ResearchGroupRepository;

@RestController
@RequestMapping("/api")
public class ResearchGroupController {
    @Autowired
    private ResearchGroupRepository researchGroupRepository;

    @GetMapping("/researchgroups")
    public List<ResearchGroup> getAllResearchGroups() {
        return researchGroupRepository.findAll();
    }
}