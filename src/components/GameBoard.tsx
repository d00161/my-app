import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useGetUserDetails } from "../hooks/GetUserDetails";
import { useGetGameDetails } from "../hooks/GetGameDetails";
import Loading from "./Loading";
import { PlayedOptions, usePlayGame } from "../hooks/PlayGame";
import Recharge from "./Recharge";






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

    },[])


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

    
    

    let totalSilverAmount, totalGoldAmount, totalDiamondAmount, totalAmount, userdetails;
    if(getGameDetailsResponse!=null && getGameDetailsResponse.game!=null){

        totalSilverAmount = (options[0].reduce((accumulator, currentValue) => accumulator + currentValue, 0))*getGameDetailsResponse.game.ticketAmount.silver;
    
        totalGoldAmount = (options[1].reduce((accumulator, currentValue) => accumulator + currentValue, 0))*getGameDetailsResponse.game.ticketAmount.gold;
        
        totalDiamondAmount = (options[2].reduce((accumulator, currentValue) => accumulator + currentValue, 0))*getGameDetailsResponse.game.ticketAmount.diamond;

        totalAmount = totalSilverAmount + totalGoldAmount + totalDiamondAmount;

        
    }

    if(getGameDetailsResponse && getGameDetailsResponse.userDetails && getGameDetailsResponse.userDetails.username){
        userdetails = {
            username: getGameDetailsResponse.userDetails.username,
            balance: getGameDetailsResponse.userDetails.balance,
            mobile: getGameDetailsResponse.userDetails.mobile
        }
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


    const [isRechargePopUpOpen, setIsRecharPopUpOpen] = useState(false);

    const handleRecharge = () => {

        setIsRecharPopUpOpen(true)
    }


    if(isRechargePopUpOpen){
        return <Recharge setIsRecharPopUpOpen={setIsRecharPopUpOpen} />;
    }
    

    if (getGameDetailsError==null) {
        return <Loading />;
    }

    let gameBoardDetails =getGameDetailsResponse && getGameDetailsResponse.game && 
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

        
    let userDetails = userdetails &&
        <div className="userDetails" style={{border: "solid 1px", margin: "10px", padding: "10px" }}>
            <div style={{display: "flex"}}>
                <div>
                    username: 
                </div>
                <div>
                    { userdetails.username}
                </div>
            </div>
            <div style={{display: "flex"}}>
                <div>
                    mobile: 
                </div>
                <div>
                    { userdetails.mobile}
                </div>
            </div>
            <div style={{display: "flex"}}>
                <div>
                    balance: 
                </div>
                <div>
                    { userdetails.balance}
                </div>
            </div>
            <div>
                <button onClick={handleRecharge}>Recharge</button>
            </div>
        </div>
        

    return (
        <div>
            {userDetails}   
            {gameBoardDetails}
        </div>
    );
  }
  
  export default GameBoard;