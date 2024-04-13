import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { BASE_URL } from "../Constants";


export interface GameDetailsResponse {
    // username: string
    // name: string,
    // mobile: string,
    // jwt: string

    game: Game,
    gameHistory: GameHistory
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

export interface User{
    username: string,
    mobile: string,
    balance: number
}


export interface PlayGameResponse{
    userDetails: User,
    gameHistory: GameHistory
}

export interface PlayedOptions{
    silver: number[],
    gold: number[],
    diamond: number[]
}

export interface PlayGameRequest{

    gameId: string,
    playedOptions: PlayedOptions
}



export function usePlayGame() {

    const [playGameResponse, setPlayGameResponse] = useState({} as PlayGameResponse);
    const [errorOccurred, setErrorOccurred] = useState<boolean | null>(null);

    const url = BASE_URL+"playGame";
    const request_config: AxiosRequestConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("paisaempiretoken")
        }
    }
    
    const playGame = async (playGamePayload: PlayGameRequest) => {
        setErrorOccurred(null);


        console.log("playing game api")
        
        axios.post(url, playGamePayload, request_config).then(response => {
            console.log("getgamedetails api")
            setPlayGameResponse(response?.data);
            setErrorOccurred(false);
            console.log(response);

            console.log("playing game api-1")
        
        }).catch(error=> {
            console.log(error);
            setErrorOccurred(true);
        })
    }

    return {
        playGameResponse,
        playGame,
        errorOccurred
    };

}