import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { BASE_URL } from "../Constants";



export interface RechargeTransaction{
    userId: string,
    transactionId: string,
    status: string,
    amount: string
}

export interface ApproveTransactionRequest{
    transactionId: string
}

export function useApproveTransaction() {

    const [approveTransactionResponse, setApproveTransactionResponse] = useState<RechargeTransaction>();
    const [approveTransactionError, setApproveTransactionError] = useState<boolean | null>(null);

    const url = BASE_URL+"recharge/approveTransaction";
    const request_config: AxiosRequestConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("paisaempiretoken")
        }
    }
    
    const approveTransaction = async (approveTransactionRequest: ApproveTransactionRequest) => {
        axios.post(url, approveTransactionRequest, request_config).then(response => {
            setApproveTransactionResponse(response?.data);
            setApproveTransactionError(false);
        }).catch(error=> {
            setApproveTransactionError(true);
        })
    }

    return {
        approveTransaction,
        approveTransactionResponse,
        approveTransactionError
    };

}