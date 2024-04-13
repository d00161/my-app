import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useGetUserDetails } from "../hooks/GetUserDetails";
import { useGetGameDetails } from "../hooks/GetGameDetails";
import Loading from "./Loading";
import { Game, PlayedOptions, usePlayGame } from "../hooks/PlayGame";
import Recharge from "./Recharge";
import { useGetLatestGames } from "../hooks/GetLatestGames";
import { useChangeGameStatus } from "../hooks/ChangeGameStatus";






function GetLatestGameDetails() {

    const [games, setGames] = useState<Game[]>()


    let {
        getLatestGames,
        getLatestGamesResponse,
        getLatestGamesError
    } = useGetLatestGames();

    let {
        changeGameStatusResponse,
        changeGameStatus,
        changeGameStatusError
    } = useChangeGameStatus();
    

    useEffect(() => {
        getLatestGames()
    },[])

    useEffect(()=>{
        if(changeGameStatusError===false && changeGameStatusResponse  && changeGameStatusResponse.games){
            console.log("changeGameStatusResponse===")
            console.log(changeGameStatusResponse)
            console.log("changeGameStatusResponse===")
            setGames(changeGameStatusResponse.games)
        }else if(changeGameStatusResponse.errorMessage){
            alert(changeGameStatusResponse.errorMessage);
        }
    });


    useEffect(() => {

        console.log("getLatestGamesResponse:" +getLatestGamesResponse?.games)
        if (getLatestGamesError===false && getLatestGamesResponse) {

            console.log("getLatestGamesResponse:" +getLatestGamesResponse)
            setGames(getLatestGamesResponse.games)

        }else{
            console.log("hello")
            // setGames([])
        }
    }, [getLatestGamesResponse, getLatestGamesError]);


    const handleCloseGame = (gameId: string) =>{
        changeGameStatus({
            gameId: gameId,
            status: "CLOSED"
        })
    }

    const handleStopGame = (gameId: string) => {
        changeGameStatus({
            gameId: gameId,
            status: "STOPPED"
        })
    }


    
    let gameElements = games?.map((game:Game, index: number) => {
        // console.log(game)
        return <div style={{border: "solid 1px", padding: "5px", margin:"5px"}} key={index}>
            <div style={{display:"flex"}}>
                <div>
                    gameId: 
                </div>
                <div>
                    {game._id}
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div>
                    startTime: 
                </div>
                <div>
                    {game.startTime}
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div>
                    endTime: 
                </div>
                <div>
                    {game.endTime}
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div>
                    status: 
                </div>
                <div>
                    {game.status}
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div>
                    TicketAmount:
                </div>
                <div>

                    <div style={{display:"flex"}}>

                        <div>
                            silver: 
                        </div>
                        <div>
                            {game.ticketAmount.silver}
                        </div>
                    </div>
                    <div style={{display:"flex"}}>

                        <div>
                            gold: 
                        </div>
                        <div>
                            {game.ticketAmount.gold}
                        </div>
                    </div>
                    <div style={{display:"flex"}}>

                        <div>
                            diamond: 
                        </div>
                        <div>
                            {game.ticketAmount.diamond}
                        </div>
                    </div>
                    
                </div>
            </div>
            <div style={{display:"flex"}}>
                <div>
                    Result:
                </div>

                {game.result && game.result.length>=2 && (<div>
                    <div style={{display:"flex"}}>

                        <div>
                            silver: 
                        </div>
                        <div>
                            {game.result[0]}
                        </div>
                    </div>
                    <div style={{display:"flex"}}>

                        <div>
                            gold: 
                        </div>
                        <div>
                            {game.result[1]}
                        </div>
                    </div>
                    <div style={{display:"flex"}}>

                        <div>
                            diamond: 
                        </div>
                        <div>
                            {game.result[2]}
                        </div>
                    </div>
                </div>)}

            </div>
            <div>
                {game.status==="ACTIVE" && (
                    <div>
                        <button onClick={()=>handleStopGame(game._id)}>stop game</button>
                    </div>
                )}
            </div>
            <div>
                {(game.status==="STOPPED" || game.status==="ACTIVE")  && (
                    <div>
                        <button onClick={()=>handleCloseGame(game._id)}>close game</button>
                    </div>
                )}
            </div>
        </div>
    })

    
    
    return (
        
        <div>
            {gameElements}
            
        </div>

    
    );
  }
  
  export default GetLatestGameDetails;