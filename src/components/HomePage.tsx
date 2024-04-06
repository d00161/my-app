import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useGetUserDetails } from "../hooks/GetUserDetails";
import GameBoard from "./GameBoard";






function HomePage() {



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

   
    




    return (

        <div>
            <GameBoard/>
        
        </div>
    );
  }
  
  export default HomePage;