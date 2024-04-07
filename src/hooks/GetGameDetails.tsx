import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { BASE_URL } from "../Constants";
import { User } from "./PlayGame";


export interface GameDetailsResponse {


    game: Game,
    gameHistory: GameHistory,
    userDetails: User
}


export interface Game{
    _id: string,
    startTime: string,
    endTime: string,
    status: string,
    result: [number]
    ticketAmount: {
        silver: number,
        gold: number,
        diamond: number
    },
    winners: number[],

}

export interface GameHistory {
    gameId: string,
    userId: string,

    playedOptions: {
        silver: number[],
        gold: number[],
        diamond: number[]
    },
    
    totalAmount: number
}




export function useGetGameDetails() {

    const [getGameDetailsResponse, setGetGameDetailsResponse] = useState({} as GameDetailsResponse);
    const [getGameDetailsError, setGetGameDetailsError] = useState<boolean | null>(null);

    const url = BASE_URL+"getGameDetails";
    const request_config: AxiosRequestConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("paisaempiretoken")
        }
    }
    
    const getGameDetails = async () => {
        axios.post(url, {}, request_config).then(response => {
            setGetGameDetailsResponse(response?.data);
            setGetGameDetailsError(false);
        }).catch(error=> {
            setGetGameDetailsError(true);
        })
    }

    return {
        getGameDetails,
        getGameDetailsResponse,
        getGameDetailsError
    };

}