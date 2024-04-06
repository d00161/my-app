import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { BASE_URL } from "../Constants";


export interface RegisterUserResponse {
    username: string
    mobile: string,
    token: string
}

export interface RegisterUserRequest {
    username: string, 
    mobile: string,
    password: string
}


export function useRegisterUser() {

    const [registerUserResponse, setRegisterUserResponse] = useState({} as RegisterUserResponse);
    const [errorOccurred, setErrorOccurred] = useState<boolean | null>(null);

    const url = BASE_URL+"register";
    const request_config: AxiosRequestConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    
    const registerUser = async (data: RegisterUserRequest) => {
        axios.post(url, data, request_config).then(response => {
            setRegisterUserResponse(response?.data);
            setErrorOccurred(false);
            console.log(response);
        }).catch(error=> {
            console.log(error);
            setErrorOccurred(true);
        })
    }

    return {
        registerUser,
        registerUserResponse,
        errorOccurred
    };

}