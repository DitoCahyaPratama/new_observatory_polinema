/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.polinema.observatory.payload;

import com.polinema.observatory.model.License;
import com.polinema.observatory.model.ResearchGroup;
import java.time.Instant;
import java.util.Date;

/**
 *
 * @author Doyatama
 */
public class AppHeaderResponse {

    private Long id;
    private String name;
    private String description;
    private String cited_as;
    private String tags;
    private String organization;
    private String link;
    private Date generated_date;
    private Date publish_date;
    private Instant creationDateTime;
    private Instant updateDateTime;
    private License license;
    private ResearchGroup rg;
    private UserSummary createdBy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the cited_as
     */
    public String getCited_as() {
        return cited_as;
    }

    /**
     * @param cited_as the cited_as to set
     */
    public void setCited_as(String cited_as) {
        this.cited_as = cited_as;
    }

    /**
     * @return the tags
     */
    public String getTags() {
        return tags;
    }

    /**
     * @param tags the tags to set
     */
    public void setTags(String tags) {
        this.tags = tags;
    }

    /**
     * @return the organization
     */
    public String getOrganization() {
        return organization;
    }

    /**
     * @param organization the organization to set
     */
    public void setOrganization(String organization) {
        this.organization = organization;
    }

    /**
     * @return the link
     */
    public String getLink() {
        return link;
    }

    /**
     * @param link the link to set
     */
    public void setLink(String link) {
        this.link = link;
    }
    
    /**
     * @return the generated_date
     */
    public Date getGenerated_date() {
        return generated_date;
    }

    /**
     * @param generated_date the generated_date to set
     */
    public void setGenerated_date(Date generated_date) {
        this.generated_date = generated_date;
    }

    /**
     * @return the publish_date
     */
    public Date getPublish_date() {
        return publish_date;
    }

    /**
     * @param publish_date the publish_date to set
     */
    public void setPublish_date(Date publish_date) {
        this.publish_date = publish_date;
    }
    
    /**
     * @return the creationDateTime
     */
    public Instant getCreationDateTime() {
        return creationDateTime;
    }

    /**
     * @param creationDateTime the creationDateTime to set
     */
    public void setCreationDateTime(Instant creationDateTime) {
        this.creationDateTime = creationDateTime;
    }
    
    /**
     * @return the updateDateTime
     */
    public Instant getUpdateDateTime() {
        return updateDateTime;
    }

    /**
     * @param updateDateTime the updateDateTime to set
     */
    public void setUpdateDateTime(Instant updateDateTime) {
        this.updateDateTime = updateDateTime;
    }

    /**
     * @return the license
     */
    public License getLicense() {
        return license;
    }

    /**
     * @param license the license to set
     */
    public void setLicense(License license) {
        this.license = license;
    }

    /**
     * @return the rg
     */
    public ResearchGroup getRg() {
        return rg;
    }

    /**
     * @param rg the rg to set
     */
    public void setRg(ResearchGroup rg) {
        this.rg = rg;
    }
    
    public UserSummary getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserSummary createdBy) {
        this.createdBy = createdBy;
    }

}