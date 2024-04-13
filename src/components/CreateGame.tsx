import { ChangeEvent, useEffect, useState } from "react";
import { useCreateGame } from "../hooks/CreateGame";


function CreateGame() {


    const [silverValue, setSilverValue] = useState(10);
    const [goldValue, setGoldValue] = useState(100);
    const [diamondValue, setDiamondValue] = useState(1000);
    const [startTime, setStartTime] = useState("starttime");
    const [endTime, setEndTime] = useState("endtime");


    const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value);
    };

    const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEndTime(e.target.value);
    };


    let {
        createGameResponse,
        createGame,
        createGameError
    } = useCreateGame()

    
    
    const handleCreateGame = ()=>{

        createGame({
            startTime,
            endTime,
            ticketAmount: {
                silver: silverValue,
                gold: goldValue,
                diamond: diamondValue
            },
            gameId: "gameId"
        });
    }

    useEffect(()=>{

        if(createGameError===false){

            console.log(createGameResponse)
        }
    })
    




    const handleSilverValue = (e: ChangeEvent<HTMLInputElement>)=>{

        const value = e.target.value;
        if (!isNaN(Number(value))) {
            setSilverValue(Number(value));
        }
    }

    const handleGoldValue = (e: ChangeEvent<HTMLInputElement>)=>{

        const value = e.target.value;
        if (!isNaN(Number(value))) {
            setGoldValue(Number(value));
        }
    }

    const handleDiamondValue = (e: ChangeEvent<HTMLInputElement>)=>{

        const value = e.target.value;
        if (!isNaN(Number(value))) {
            setDiamondValue(Number(value));
        }
    }


    return <div>
        <form onSubmit={handleCreateGame}>
                <div>
                    <label>startTime: </label>
                    <input
                        type="text"
                        id="startTime"
                        value={startTime}
                        onChange={handleCreateGame}
                        required
                    />
                </div>
                <div>
                    <label>endTime: </label>
                    <input
                        type="text"
                        id="endTime"
                        value={endTime}
                        onChange={handleCreateGame}
                        required
                    />
                </div>
                <div>
                    <label>silver value: </label>
                    <input
                        type="number"
                        id="silverValue"
                        value={silverValue}
                        onChange={handleSilverValue}
                        required
                    />
                </div>
                <div>
                    <label>gold value: </label>
                    <input
                        type="number"
                        id="goldValue"
                        value={goldValue}
                        onChange={handleGoldValue}
                        required
                    />
                </div>
                <div>
                    <label>diamond value: </label>
                    <input
                        type="nu"
                        id="diamondValue"
                        value={diamondValue}
                        onChange={handleDiamondValue}
                        required
                    />
                </div>
                <button type="submit">createGame</button>
            </form>
            </div>;
}


export default CreateGame;