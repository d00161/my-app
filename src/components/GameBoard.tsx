import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useGetUserDetails } from "../hooks/GetUserDetails";
import { useGetGameDetails } from "../hooks/GetGameDetails";
import Loading from "./Loading";
import { PlayedOptions, usePlayGame } from "../hooks/PlayGame";






function GameBoard() {

    const [isLoading, setIsLoading] = useState(true);
    const [options, setOptions] = useState<number[][]>([Array(10).fill(0), Array(10).fill(0), Array(10).fill(0)]);


    let {
        getGameDetails,
        getGameDetailsResponse,
        
        getGameDetailsError,
    } = useGetGameDetails();
    

    useEffect(() => {
        getGameDetails()

        // if(getGameDetailsResponse && getGameDetailsResponse.gameHistory && getGameDetailsResponse.gameHistory.playedOptions){
        //     for(let x in getGameDetailsResponse.gameHistory.playedOptions){
        //         console.log("1st -> ")
        //         console.log(x)
        //     }
        // }

        // if(getGameDetailsResponse && getGameDetailsResponse.gameHistory && getGameDetailsResponse.gameHistory.playedOptions){
        //     for(let x in getGameDetailsResponse.gameHistory.playedOptions){
        //         console.log("1st -> ")
        //         console.log(x)
        //     }
        // }

        // if(getGameDetailsResponse  && getGameDetailsResponse.gameHistory){

        //     console.log("2nd===_>")
        //     setOptions([getGameDetailsResponse.gameHistory.playedOptions.silver,getGameDetailsResponse.gameHistory.playedOptions.gold,getGameDetailsResponse.gameHistory.playedOptions.diamond])
        // }

    },[])

    // if(getGameDetailsResponse  && getGameDetailsResponse.gameHistory && getGameDetailsResponse.gameHistory.playedOptions){
    //     console.log("2nd===_>")
    //     setOptions([getGameDetailsResponse.gameHistory.playedOptions.silver,getGameDetailsResponse.gameHistory.playedOptions.gold,getGameDetailsResponse.gameHistory.playedOptions.diamond])
    // }


    useEffect(() => {
        if (getGameDetailsResponse && getGameDetailsResponse.gameHistory && getGameDetailsResponse.gameHistory.playedOptions && !getGameDetailsError) {
            setOptions([getGameDetailsResponse.gameHistory.playedOptions.silver, getGameDetailsResponse.gameHistory.playedOptions.gold, getGameDetailsResponse.gameHistory.playedOptions.diamond]);
        }else{
            setOptions([Array(10).fill(0), Array(10).fill(0), Array(10).fill(0)])
        }
    }, [getGameDetailsResponse, getGameDetailsError]);



    

    let {
        playGame,
        playGameResponse,
        
    } = usePlayGame();

    const handleChangDiamond = (index: number, value: number) => {
        let updatedOptions = [...options]
        if((updatedOptions[2][index]+value)>=0){
            updatedOptions[2][index]+=value
        }
        setOptions(updatedOptions);
    }

    const handleChangGold = (index: number, value: number) => {
        let updatedOptions = [...options]
        if((updatedOptions[1][index]+value)>=0){
            updatedOptions[1][index]+=value
        }
        setOptions(updatedOptions);
    }

    const handleChangSilver = (index: number, value: number) => {
        let updatedOptions = [...options]
        if((updatedOptions[0][index]+value)>=0){
            updatedOptions[0][index]+=value
        }
        setOptions(updatedOptions);
    }


    // let silverBoard = options[0].map((item:number, index:number)=>{

    //     return <div key={"silver"+index} style={{display: "flex"}}>
    //         <button onClick={() =>handleChangSilver(index,-1)}>-</button>
    //         <div>{item}</div>
    //         <button onClick={() =>handleChangSilver(index,1)}>+</button>
    //     </div>
    // })


    let silverBoard = options[0].map((item:number, index:number)=>{

        return <div key={"silver"+index} style={{display: "flex"}}>
            <button onClick={() =>handleChangSilver(index,-1)}>-</button>
            <div>{item}</div>
            <button onClick={() =>handleChangSilver(index,1)}>+</button>
        </div>
    })

    let goldBoard = options[1].map((item:number, index:number)=>{

        return <div key={"gold"+index} style={{display: "flex"}}>
            <button onClick={() =>handleChangGold(index,-1)}>-</button>
            <div>{item}</div>
            <button onClick={() =>handleChangGold(index,1)}>+</button>
        </div>
    })

    let diamondBoard = options[2].map((item:number, index: number)=>{

        return <div key={"diamond"+index} style={{display: "flex"}}>
            <button onClick={() =>handleChangDiamond(index,-1)}>-</button>
            <div style={{padding:"2px"}}>{item}</div>
            <button onClick={() =>handleChangDiamond(index,1)}>+</button>
        </div>
    })

    
    

    let totalSilverAmount, totalGoldAmount, totalDiamondAmount, totalAmount;
    if(getGameDetailsResponse!=null && getGameDetailsResponse.game!=null){

        totalSilverAmount = (options[0].reduce((accumulator, currentValue) => accumulator + currentValue, 0))*getGameDetailsResponse.game.ticketAmount.silver;
    
        totalGoldAmount = (options[1].reduce((accumulator, currentValue) => accumulator + currentValue, 0))*getGameDetailsResponse.game.ticketAmount.gold;
        
        totalDiamondAmount = (options[2].reduce((accumulator, currentValue) => accumulator + currentValue, 0))*getGameDetailsResponse.game.ticketAmount.diamond;

        totalAmount = totalSilverAmount + totalGoldAmount + totalDiamondAmount;
    }

    const handlePlayGame = () => {

        const playGamePayload = {
            gameId: getGameDetailsResponse.game._id,
            playedOptions: {
                silver: options[0],
                gold: options[1],
                diamond: options[2]
            }
        }

        playGame(playGamePayload)

    }


    

    if (getGameDetailsError==null) {
        return <Loading />;
    } 
    

    return (

        
        <div>
            
            <div style={{ display: 'flex'}}>
                <div style={{margin: "20px"}}>
                    {silverBoard}
                    <div style={{display: "flex"}}>
                        totalAmount : {totalSilverAmount}
                    </div>
                </div>
                <div style={{margin: "20px"}}>
                    {goldBoard}
                    <div style={{display: "flex"}}>
                        totalAmount : {totalGoldAmount}
                    </div>
                </div>
                <div style={{margin: "20px"}}>
                    {diamondBoard}
                    <div style={{display: "flex"}}>
                        totalAmount : {totalDiamondAmount}
                    </div>
                </div>

            </div>
            <div>
                <div>
                    totalAmount : {totalAmount}
                </div>
                <button onClick={handlePlayGame}>play game</button>
            </div>
    </div>

    
    );
  }
  
  export default GameBoard;