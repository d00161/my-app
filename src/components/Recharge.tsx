import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useGetUserDetails } from "../hooks/GetUserDetails";
import { useLoginUser } from "../hooks/LoginUser";
import { useNavigate } from "react-router-dom";
import { useRecharge } from "../hooks/Recharge";




interface RechargeProps {
    setIsRecharPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


function Recharge({setIsRecharPopUpOpen}: RechargeProps) {



    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    // const navigate = useNavigate();

    // const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setUsername(e.target.value);
    // };

    // const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setPassword(e.target.value);
    // };

    // let {getLoginUser, loginUserResponse, errorOccurred} = useLoginUser();
    // // useEffect(() => {
    // //     getLoginUser();
    // // }, []);

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     // Here you can add your logic for handling login
    //     console.log('Username:', username);
    //     console.log('Password:', password);
    //     // Clear input fields after submission
    //     // setUsername('');
    //     // setPassword('');
    //     let data = {
    //         username: username,
    //         password: password
    //     }
    //     getLoginUser(data);

    // };

    // useEffect(() => {
    //     if(errorOccurred === false){
    //         localStorage.setItem("accessToken", loginUserResponse.token);
    //         navigate('/');
    //     }
    // });





    const [amount, setAmount] = useState(0);
    const [transactionId, setTransactionId] = useState('');
    let {
        recharge,
        rechargeResponse,
        rechargeError
    } = useRecharge()

    const handleTransactionChange = (e: ChangeEvent<HTMLInputElement>) => {

        setTransactionId(e.target.value);
    }

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        if (!isNaN(Number(value))) {
            setAmount(Number(value));
        }
        
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you can add your logic for handling login
        // console.log('Username:', username);
        // console.log('Password:', password);
        // Clear input fields after submission
        // setUsername('');
        // setPassword('');


        let data = {
            amount,
            transactionId
        };
        recharge(data);
    };

    



    const handleClosePopUp = () => {
        setIsRecharPopUpOpen(false)
    }

    return (


    <div>
    <h2>Recharge Form</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          required
        />
      </div>
      <div>
        <label htmlFor="transactionId">TransactionId:</label>
        <input
          type="text"
          id="transactionId"
          value={transactionId}
          onChange={handleTransactionChange}
          required
        />
      </div>
      <button type="submit">submit</button>
      <button onClick={handleClosePopUp}>close</button>
      {rechargeError===false && 
      <div>
        recharge successfull
        </div>}
        {
            rechargeError===true && 
            <div>
                recharge failed
            </div>
        }
    </form>

    
  </div>


    );
  }
  
  export default Recharge;