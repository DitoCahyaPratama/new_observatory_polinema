/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.polinema.observatory.payload;

/**
 *
 * @author Doyatama
 */
public class AppDetailResponse {
    private Long id;
    private String fileName;
    private String description;
    private String permission;
    private String alias;
    private Boolean queryable;
    private Boolean browsable;
    private String shared_to;
    private UserSummary createdBy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
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

    public Boolean getBrowsable() {
        return browsable;
    }

    public void setBrowsable(Boolean browsable) {
        this.browsable = browsable;
    }

    public String getShared_to() {
        return shared_to;
    }

    public void setShared_to(String shared_to) {
        this.shared_to = shared_to;
    }
    
    public UserSummary getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserSummary createdBy) {
        this.createdBy = createdBy;
    }
    
}
