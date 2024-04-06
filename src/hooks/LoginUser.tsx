import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { BASE_URL } from "../Constants";


export interface LoginUserResponse {
    username: string,
    mobile: string,
    token: string
}

export interface LoginUserRequest {
    username: string,
    password: string
}


export function useLoginUser() {

    const [loginUserResponse, setLoginUserResponse] = useState({} as LoginUserResponse);
    const [errorOccurred, setErrorOccurred] = useState<boolean | null>(null);

    const url = BASE_URL+"login";
    const request_config: AxiosRequestConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    
    const getLoginUser = async (data: LoginUserRequest) => {
        axios.post(url, data, request_config).then(response => {
            setLoginUserResponse(response?.data);
            localStorage.setItem("paisaempiretoken", response.data.token)
            setErrorOccurred(false);
            console.log(response);
        }).catch(error=> {
            console.log(error);
            setErrorOccurred(true);
        })
    }

    return {
        getLoginUser,
        loginUserResponse,
        errorOccurred
    };

}