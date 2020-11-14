package com.polinema.observatory.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "licenses")
public class License {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lic_id;

    @NotBlank
    @Size(max = 255)
    private String lic_name;

    @NotBlank
    @Size(max = 1000)
	private String lic_image;

    public License(){
        
    }
    
    public License(Long _lic_id, String _lic_name, String _lic_image){
        lic_id = _lic_id;
        lic_name = _lic_name;
        lic_image = _lic_image;
    }

    public Long getId() {
        return lic_id;
    }

    public void setId(Long lic_id) {
        this.lic_id = lic_id;
    }

    public String getLicName() {
        return lic_name;
    }

    public void setLicName(String lic_name) {
        this.lic_name = lic_name;
    }

    public String getLicImage(){
        return lic_image;
    }

    public void setLicImage(String lic_image){
        this.lic_image = lic_image;
    }
}