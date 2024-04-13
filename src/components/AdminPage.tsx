import { ChangeEvent, useEffect, useState } from "react";
import GetLatestGameDetails from "./GetLatestGameDetails";
import PendingTransactions from "./PendingTransactions";
import { useCreateGame } from "../hooks/CreateGame";
import CreateGame from "./CreateGame";







function AdminPage() {


    return (
        <div>

            <CreateGame/>
            

            <PendingTransactions/>

            <GetLatestGameDetails/>
            
            
        </div>
    );
  }
  
  export default AdminPage;