import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { BASE_URL } from "../Constants";


export interface ChangeGameStatusResponse {
    games: Game[],
    errorMessage: String
}


export interface Game{
    _id: string,
    gameId: string,
    startTime: string,
    endTime: string,
    status: string,
    result: [number]
    ticketAmount: {
        silver: number,
        gold: number,
        diamond: number
    },
    winners: [Map<string, string>],

}

export interface GameHistory {
    gameId: string,

    userId: string,

    playedOptions: Map<string, [string]>,
    
    totalAmount: number,
}


export interface ChangeGameStatusRequest{
    gameId: string,
    status: string
}



export function useChangeGameStatus() {

    const [changeGameStatusResponse, setChangeGameStatusResponse] = useState({} as ChangeGameStatusResponse);
    const [changeGameStatusError, setChangeGameStatusError] = useState<boolean | null>(null);

    const url = BASE_URL+"changeGameStatus";
    const request_config: AxiosRequestConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("paisaempiretoken")
        }
    }
    
    const changeGameStatus = async (changeGameStatusRequest: ChangeGameStatusRequest) => {
        setChangeGameStatusError(null);
        
        axios.post(url, changeGameStatusRequest, request_config).then(response => {
            setChangeGameStatusResponse(response?.data);
            setChangeGameStatusError(false);
        
        }).catch(error=> {
            console.log(error);
            setChangeGameStatusError(true);
        })
    }

    return {
        changeGameStatusResponse,
        changeGameStatus,
        changeGameStatusError
    };
}