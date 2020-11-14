/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.polinema.observatory.controller;

import com.polinema.observatory.model.AppDetail;
import com.polinema.observatory.model.AppHeader;
import com.polinema.observatory.payload.AppDetailResponse;
import com.polinema.observatory.payload.UploadFileResponse;
import com.polinema.observatory.security.CurrentUser;
import com.polinema.observatory.security.UserPrincipal;
import com.polinema.observatory.service.AppDetailService;
import java.util.List;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.security.access.prepost.PreAuthorize;
/**
 *
 * @author Doyatama
 */
@RestController
@RequestMapping("/api/appdetail")
public class AppDetailController {
     private static final Logger logger = LoggerFactory.getLogger(AppDetailController.class);

    @Autowired
    private AppDetailService appDetailService;
    
    @PostMapping("/uploadFile/{app_id}")
    @PreAuthorize("hasRole('USER')")
    public AppDetail uploadFile(@CurrentUser UserPrincipal currentUser,
                                @PathVariable (value = "app_id") Long appId,
                                @Valid @RequestBody AppDetail appDetail) {
        return appDetailService.postAppDetail(currentUser, appId, appDetail);

//        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
//                .path("/downloadFile/")
//                .path(dataset.getId())
//                .toUriString();

//        return new UploadFileResponse(dataset.getFileName(), fileDownloadUri, file.getContentType(), file.getSize());
    }

//    @GetMapping("/downloadFile/{fileId}")
//    @PreAuthorize("hasRole('USER')")
//    public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) {
//        // Load file from database
//        AppDetail dataset = appDetailService.getFile(fileId);
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(dataset.getFileType()))
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dataset.getFileName() + "\"")
//                .body(new ByteArrayResource(dataset.getFile()));
//    }
    @GetMapping("/header/{header_id}")
    @PreAuthorize("hasRole('USER')")
    public List<AppDetail> getAllAppDetail(@PathVariable (value = "header_id") Long header_id){
        return appDetailService.getAppDetailByAppHeaderId(header_id);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public AppDetailResponse getAppDetailById(@CurrentUser UserPrincipal currentUser,
                                              @PathVariable (value = "id") Long id){
        return appDetailService.getAppDetailById(id, currentUser);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public AppDetail updateAppDetail(@CurrentUser UserPrincipal currentUser,
                                    @PathVariable (value="id") Long id,
                                    @Valid @RequestBody AppDetail appDetailReq){
        return appDetailService.updateAppDetail(appDetailReq, id, currentUser);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public HttpStatus deleteAppDetail(@PathVariable(value="id") Long id){
        appDetailService.deleteAppDetailById(id);
        return HttpStatus.FORBIDDEN;
    }
}
