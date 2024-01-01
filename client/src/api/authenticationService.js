import axios from 'axios';


const getToken=()=>{
    return localStorage.getItem('USER_KEY');
}

export const userRegister=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8080'}/user/register`,
        'data':authRequest
    })
}

export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||'http://localhost:8080'}/user/login`,
        'data':authRequest
    })
}
//Setting bearer token for dashboard screen
export const fetchUserData=()=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||'http://localhost:8080'}/user/dashboard`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}
//fetch all data for admin
export const fetchAllUsersData=()=>{
        return axios({
            method:'GET',
            url:`${process.env.hostUrl||'http://localhost:8080'}/user/admin/dashboard`,
            headers:{
                'Authorization':'Bearer '+getToken()
            }
        })
}

export const deleteUser=(authRequest)=>{
    return axios({
        method:'POST',
        url:`${process.env.hostUrl||'http://localhost:8080'}/user/admin/deleteUser`,
        headers:{
            'Authorization':'Bearer '+getToken()
        },
        'data':authRequest
    })
}

export const updateUser=(authRequest)=>{
    return axios({
        method:'POST',
        url:`${process.env.hostUrl||'http://localhost:8080'}/user/admin/editUser`,
        headers:{
            'Authorization':'Bearer '+getToken()
        },
        'data':authRequest
    })
}
