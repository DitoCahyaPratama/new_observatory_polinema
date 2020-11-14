package com.polinema.observatory.model;

import javax.persistence.*;
import com.polinema.observatory.model.audit.UserDateAudit;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "app_headers")
public class AppHeader extends UserDateAudit{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @NotBlank
    @Size(max = 250)
    private String name;

    @Lob
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "rg_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private ResearchGroup researchGroup;
    
    @NotBlank
    @Size(max = 250)
    private String organization;
    
    @NotBlank
    @Size(max = 250)
    private String link;

    @Lob
    private String tags;

    @Lob
    private String cited_as;

    @JsonFormat(pattern="dd-mm-yyyy")
    @Temporal(TemporalType.DATE)
    private Date publish_date;

    @JsonFormat(pattern="dd-mm-yyyy")
    @Temporal(TemporalType.DATE)
    private Date generated_date;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lic_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private License license;

    public Long getId() {
        return id;
    }

    public void setId(Long app_id) {
        this.id = app_id;
    }

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public ResearchGroup getResearchGroup(){
        return researchGroup;
    }

    public void setResearchGroup(ResearchGroup researchGroup){
        this.researchGroup = researchGroup;
    }

    public String getTags(){
        return tags;
    }

    public void setTags(String tags){
        this.tags = tags;
    }

    public String getCitedAs(){
        return cited_as;
    }

    public void setCitedAs(String cited_as){
        this.cited_as = cited_as;
    }

    public Date getPublishDate(){
        return publish_date;
    }

    public void setPublishDate(Date publish_date){
        this.publish_date = publish_date;
    }

    public Date getGeneratedDate(){
        return generated_date;
    }

    public void setGeneratedDate(Date generated_date){
        this.generated_date = generated_date;
    }

    public License getLicense(){
        return license;
    }

    public void setLicense(License license){
        this.license = license;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
    
}