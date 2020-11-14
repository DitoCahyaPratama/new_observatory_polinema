/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.polinema.observatory.service;

import com.polinema.observatory.exception.FileNotFoundException;
import com.polinema.observatory.exception.FileStorageException;
import com.polinema.observatory.exception.ResourceNotFoundException;
import com.polinema.observatory.model.AppDetail;
import com.polinema.observatory.model.AppHeader;
import com.polinema.observatory.model.User;
import com.polinema.observatory.payload.AppDetailResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;
import com.polinema.observatory.repository.AppDetailRepository;
import com.polinema.observatory.repository.AppHeaderRepository;
import com.polinema.observatory.repository.UserRepository;
import com.polinema.observatory.security.UserPrincipal;
import com.polinema.observatory.util.ModelMapper;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author Doyatama
 */
@Service
public class AppDetailService {
    
    @Autowired
    private AppDetailRepository appDetailRepository;
    
    @Autowired
    private AppHeaderRepository appHeaderRepository;
    
    @Autowired
    private UserRepository userRepository;
    
//    public AppDetail storeFile(MultipartFile file, AppDetail data){
//    // Normalize file name
//        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//
//        try {
//            // Check if the file's name contains invalid characters
//            if(fileName.contains("..")) {
//                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
//            }
//
//            AppDetail dataset = new AppDetail(fileName, file.getContentType(), data.getDescription(), file.getBytes(), data.getPermission(), data.getQueryable(), data.getShared_to());
//
//            return appDetailRepository.save(dataset);
//        } catch (IOException ex) {
//            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
//        }
//    }
     public AppDetail postAppDetail(UserPrincipal currentUser, Long appId, AppDetail appDetail){
         AppHeader appHeader = appHeaderRepository.findById(appId)
                               .orElseThrow(() -> new ResourceNotFoundException("App Header", "id", appId));
         appDetail.setAppHeader(appHeader);
         appDetail.setCreatedBy(currentUser.getId());
         return appDetailRepository.save(appDetail);
    }
    public List<AppDetail> getAppDetailByAppHeaderId(Long header_id){
        List<AppDetail> appDetailList = (List<AppDetail>) appDetailRepository.findByAppHeaderId(header_id);
        return appDetailList;
    }
    public AppDetailResponse getAppDetailById(Long id, UserPrincipal currentUser){
        AppDetail ad = appDetailRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("AppDetail", "id", id));
        User creator = userRepository.findById(ad.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", ad.getCreatedBy()));
        return ModelMapper.mapAppDetailToAppDetailResponse(ad, creator);
    }
    public AppDetail updateAppDetail(AppDetail appDetailReq, Long id, UserPrincipal currentUser){
        return appDetailRepository.findById(id).map(appDetail -> {
            appDetail.setFileName(appDetailReq.getFileName());
            appDetail.setDescription(appDetailReq.getDescription());
            appDetail.setPermission(appDetailReq.getPermission());
            appDetail.setAlias(appDetailReq.getAlias());
            appDetail.setQueryable(appDetailReq.getQueryable());
            appDetail.setBrowsable(appDetailReq.getBrowsable());
            appDetail.setShared_to(appDetailReq.getShared_to());
            appDetail.setUpdatedBy(currentUser.getId());
            return appDetailRepository.save(appDetail);
        }).orElseThrow(() -> new ResourceNotFoundException("App Detail" , "id" , id));
    }
    public void deleteAppDetailById(Long id){
        Optional<AppDetail> appDetail = appDetailRepository.findById(id);
        if(appDetail.isPresent()){
            appDetailRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("App Detail", "id", id);
        }
    }
//    public AppDetail getFile(String fileId) {
//        return appDetailRepository.findById(fileId)
//                .orElseThrow(() -> new FileNotFoundException("File not found with id " + fileId));
//    }
}
