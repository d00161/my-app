import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { BASE_URL } from "../Constants";



export interface RechargeTransaction{
    userId: string,
    transactionId: string,
    status: string,
    amount: string
}



export function useGetPendingTransactions() {

    const [pendingTransactionsResponse, setPendingTransactionResponse] = useState<RechargeTransaction[]>([]);
    const [pendintTransactionsError, setPendingTransactionsError] = useState<boolean | null>(null);

    const url = BASE_URL+"recharge/pendingTransactions";
    const request_config: AxiosRequestConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("paisaempiretoken")
        }
    }
    
    const getPendingTransactions = async () => {
        axios.post(url, {}, request_config).then(response => {
            setPendingTransactionResponse(response?.data);
            setPendingTransactionsError(false);
            console.log(response?.data)
        }).catch(error=> {
            setPendingTransactionsError(true);
        })
    }

    return {
        getPendingTransactions,
        pendingTransactionsResponse,
        pendintTransactionsError
    };

}