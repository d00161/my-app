import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { BASE_URL } from "../Constants";


export interface UserDetailsResponse {
    username: string
    // name: string,
    // mobile: string,
    // jwt: string
}


export function useGetUserDetails() {

    const [userDetailsResponse, setUserDetailsResponse] = useState({} as UserDetailsResponse);
    const [errorOccurred, setErrorOccurred] = useState<boolean | null>(null);

    const url = BASE_URL+"testpost";
    const request_config: AxiosRequestConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
    
    const getUserDetails = async () => {
        axios.post(url, {}, request_config).then(response => {
            setUserDetailsResponse(response?.data);
            setErrorOccurred(false);
            console.log(response);
        }).catch(error=> {
            console.log(error);
            setErrorOccurred(true);
        })
    }

    return {
        getUserDetails,
        userDetailsResponse,
        errorOccurred
    };

}