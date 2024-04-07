import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { BASE_URL } from "../Constants";
import { User } from "./PlayGame";


// export interface LoginUserResponse {
//     username: string,
//     mobile: string,
//     token: string
// }

// export interface LoginUserRequest {
//     username: string,
//     password: string
// }

export interface RechargeResponse{
    userDetails: User
}

export interface RechargeRequest{
    amount: number,
    transactionId: string
}


export function useRecharge() {

    const [rechargeResponse, setRechargeResponse] = useState({} as RechargeResponse);
    const [rechargeError, setRechargeError] = useState<boolean | null>(null);

    const url = BASE_URL+"recharge";
    const request_config: AxiosRequestConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("paisaempiretoken")
        }
    }
    
    const recharge = async (data: RechargeRequest) => {
        axios.post(url, data, request_config).then(response => {
            setRechargeResponse(response?.data);
            setRechargeError(false);
        }).catch(error=> {
            console.log(error);
            setRechargeError(true);
        })
    }

    return {
        recharge,
        rechargeResponse,
        rechargeError
    };

}