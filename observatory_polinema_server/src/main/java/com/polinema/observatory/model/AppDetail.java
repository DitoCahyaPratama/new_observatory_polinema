/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.polinema.observatory.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.polinema.observatory.model.audit.UserDateAudit;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
/**
 *
 * @author Doyatama
 */
@Entity
@Table(name = "app_details")
public class AppDetail extends UserDateAudit{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "header_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private AppHeader appHeader;
    
    @NotBlank
    @Size(max = 250)
    private String fileName;
    
    private String fileType;
    
    private String fileSize;

    @Lob
    private String description;
    
    @Size(max = 250)
    private String alias;
    
    @NotBlank
    @Size(max = 50)
    private String permission;
    
    private Boolean queryable;
    
    private Boolean browsable;
    
    @Size(max = 200)
    private String shared_to;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AppHeader getAppHeader() {
        return appHeader;
    }

    public void setAppHeader(AppHeader appHeader) {
        this.appHeader = appHeader;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public Boolean getQueryable() {
        return queryable;
    }

    public void setQueryable(Boolean queryable) {
        this.queryable = queryable;
    }

    public String getShared_to() {
        return shared_to;
    }

    public void setShared_to(String shared_to) {
        this.shared_to = shared_to;
    }

    public Boolean getBrowsable() {
        return browsable;
    }

    public void setBrowsable(Boolean browsable) {
        this.browsable = browsable;
    }

    public String getFileSize() {
        return fileSize;
    }

    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }
    
    
}
