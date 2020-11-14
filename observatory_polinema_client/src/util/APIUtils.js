import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getAllResearchGroup(){
    return request({
        url: API_BASE_URL + "/researchgroups",
        method: 'GET'
    })
}

export function getAllLicense(){
    return request({
        url: API_BASE_URL + "/licenses",
        method: 'GET'
    })
}

// API CRUD FOR APP HEADER

export function getAllAppHeader(){
    return request({
        url: API_BASE_URL + "/appheader",
        method: 'GET'
    })
}

export function getAppHeaderById(appHeaderRequest){
    return request({
        url: API_BASE_URL + `/appheader/${appHeaderRequest}`,
        method: 'GET',
    })
}

export function createAppHeader(appHeaderRequest, rg, lic){
    return request({
        url: API_BASE_URL + `/appheader/${rg}/${lic}`,
        method: 'POST',
        body: JSON.stringify(appHeaderRequest)
    })
}

export function updateAppHeader(appHeaderRequest, id, rg, lic){
    return request({
        url: API_BASE_URL + `/appheader/${id}/${rg}/${lic}`,
        method: 'PUT',
        body: JSON.stringify(appHeaderRequest)
    })
}

export function deleteAppHeaderById(appHeaderRequest){
    return request({
        url: API_BASE_URL + `/appheader/${appHeaderRequest}`,
        method: 'DELETE'
    })
}


// API CRUD FOR APP DETAIL

export function getAllAppDetail(header_id){
    return request({
        url: API_BASE_URL + `/appdetail/header/${header_id}`,
        method: 'GET'
    })
}

export function getAppDetailById(id){
    return request({
        url: API_BASE_URL + `/appdetail/${id}`,
        method: 'GET',
    })
}

export function createAppDetail(appDetailRequest, header_id){
    return request({
        url: API_BASE_URL + `/appdetail/uploadFile/${header_id}`,
        method: 'POST',
        body: JSON.stringify(appDetailRequest)
    })
}

export function updateAppDetail(appDetailRequest, id){
    return request({
        url: API_BASE_URL + `/appdetail/${id}`,
        method: 'PUT',
        body: JSON.stringify(appDetailRequest)
    })
}

export function deleteAppDetailById(id){
    return request({
        url: API_BASE_URL + `/appdetail/${id}`,
        method: 'DELETE'
    })
}