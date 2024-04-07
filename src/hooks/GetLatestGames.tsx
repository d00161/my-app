import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { BASE_URL } from "../Constants";
import { Game, User } from "./PlayGame";





// export interface Game{
//     _id: string,
//     startTime: string,
//     endTime: string,
//     status: string,
//     result: [number]
//     ticketAmount: {
//         silver: number,
//         gold: number,
//         diamond: number
//     },
//     winners: number[],

// }

export interface GetLatestGamesResponse{
    games: Game[]
}


export function useGetLatestGames() {

    const [getLatestGamesResponse, setLatestGamesResponse] = useState<GetLatestGamesResponse>();
    const [getLatestGamesError, setGetLatestGamesError] = useState<boolean | null>(null);

    const url = BASE_URL+"getLatestGames";
    const request_config: AxiosRequestConfig = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("paisaempiretoken")
        }
    }
    
    const getLatestGames = async () => {
        axios.post(url, {}, request_config).then(response => {
            setLatestGamesResponse(response?.data);
            setGetLatestGamesError(false);
        }).catch(error=> {
            setGetLatestGamesError(true);
        })
    }

    return {
        getLatestGames,
        getLatestGamesResponse,
        getLatestGamesError
    };

}