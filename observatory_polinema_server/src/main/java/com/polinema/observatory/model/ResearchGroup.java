package com.polinema.observatory.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "research_groups")
public class ResearchGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rg_id;

    @NotBlank
    @Size(max = 255)
    private String rg_name;

    public ResearchGroup(){}
    
    public ResearchGroup(Long _rg_id, String _rg_name){
        rg_id = _rg_id;
        rg_name = _rg_name;
    }
    
    public Long getId() {
        return rg_id;
    }

    public void setId(Long rg_id) {
        this.rg_id = rg_id;
    }

    public String getRgName() {
        return rg_name;
    }

    public void setRgName(String rg_name) {
        this.rg_name = rg_name;
    }
}