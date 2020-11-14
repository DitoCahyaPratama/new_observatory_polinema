/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.polinema.observatory.util;

import com.polinema.observatory.model.AppDetail;
import com.polinema.observatory.model.AppHeader;
import com.polinema.observatory.model.License;
import com.polinema.observatory.model.ResearchGroup;
import com.polinema.observatory.model.User;
import com.polinema.observatory.payload.AppDetailResponse;
import com.polinema.observatory.payload.AppHeaderResponse;
import com.polinema.observatory.payload.UserSummary;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 *
 * @author Doyatama
 */
public class ModelMapper {

    public static AppHeaderResponse mapAppHeaderToAppHeaderResponse(AppHeader ah, License lic, ResearchGroup rg, User creator) {
        AppHeaderResponse ahResponse = new AppHeaderResponse();
        ahResponse.setId(ah.getId());
        ahResponse.setName(ah.getName());
        ahResponse.setDescription(ah.getDescription());
        ahResponse.setCited_as(ah.getCitedAs());
        ahResponse.setTags(ah.getTags());
        ahResponse.setOrganization(ah.getOrganization());
        ahResponse.setLink(ah.getLink());
        ahResponse.setGenerated_date(ah.getGeneratedDate());
        ahResponse.setPublish_date(ah.getPublishDate());
        ahResponse.setCreationDateTime(ah.getCreatedAt());
        ahResponse.setUpdateDateTime(ah.getUpdatedAt());

        License _lic = new License(lic.getId(), lic.getLicName(), lic.getLicImage());
        ahResponse.setLicense(_lic);

        ResearchGroup _rg = new ResearchGroup(rg.getId(), rg.getRgName());
        ahResponse.setRg(_rg);

        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName());
        ahResponse.setCreatedBy(creatorSummary);

        return ahResponse;
    }
    
    public static AppDetailResponse mapAppDetailToAppDetailResponse(AppDetail ad, User creator){
        AppDetailResponse adResponse = new AppDetailResponse();
        adResponse.setId(ad.getId());
        adResponse.setFileName(ad.getFileName());
        adResponse.setDescription(ad.getDescription());
        adResponse.setPermission(ad.getPermission());
        adResponse.setQueryable(ad.getQueryable());
        adResponse.setBrowsable(ad.getBrowsable());
        adResponse.setShared_to(ad.getShared_to());
        
        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName());
        adResponse.setCreatedBy(creatorSummary);
        
        return adResponse;
    }
}
