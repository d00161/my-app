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
    result: number[]
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

export interface CreateGameRequest {
    startTime: string,
    endTime: string,
    ticketAmount: {
        silver: number,
        gold: number,
        diamond: number
    },
    gameId: string
}

export interface CreateGameResponse {
    startTime: string,
    endTime: string,
    ticketAmount: {
        silver: number,
        gold: number,
        diamond: number
    },
    _id: string,
    status: string,
    result: number[],
    errorMessage: string
}



export function useCreateGame() {

    const [createGameResponse, setCreateGameResponse] = useState({} as CreateGameResponse);
    const [createGameError, setCreateGameError] = useState<boolean | null>(null);

    const url = BASE_URL+"createGame";
    const request_config: AxiosRequestConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("paisaempiretoken")
        }
    }
    
    const createGame = async (createGameRequest: CreateGameRequest) => {
        setCreateGameError(null);
        
        axios.post(url, createGameRequest, request_config).then(response => {
            setCreateGameResponse(response?.data);
            setCreateGameError(false);
        
        }).catch(error=> {
            alert(error);
            setCreateGameError(true);
        })
    }

    return {
        createGameResponse,
        createGame,
        createGameError
    };
}