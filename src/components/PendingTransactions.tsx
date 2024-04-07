import { useEffect, useState } from "react";

import { RechargeTransaction, useGetPendingTransactions } from "../hooks/GetPendingTransactions";
import { useApproveTransaction } from "../hooks/ApproveTransaction";






function PendingTransactions() {
    const [rechargeTransactions, setRechargeTransactions] = useState<RechargeTransaction[]>([]);

    let {
        getPendingTransactions,
        pendingTransactionsResponse,
        pendintTransactionsError
    } = useGetPendingTransactions()

    useEffect(() => {
        getPendingTransactions()
    },[])

    useEffect(()=>{
        if(pendintTransactionsError===false){
            setRechargeTransactions(pendingTransactionsResponse)
        }
    },[pendintTransactionsError, pendingTransactionsResponse])

    let {
        approveTransaction,
        approveTransactionResponse,
        approveTransactionError
    } = useApproveTransaction();

    useEffect(() => {
        if(approveTransactionError === false){
            let transactions = [...rechargeTransactions]
            transactions = transactions.filter((rt)=>{return rt.transactionId!=approveTransactionResponse?.transactionId});
            setRechargeTransactions(transactions)
            console.log(transactions)

        }

        // if(pendintTransactionsError===false){
        //     setRechargeTransactions(pendingTransactionsResponse)
        // }
    },[approveTransactionError, approveTransactionResponse]);

    const handleApproveTransaction=(index: number)=>{
        approveTransaction({transactionId:rechargeTransactions[index].transactionId})
    }


    let rechargeTransactionsElement = rechargeTransactions.map((item:RechargeTransaction, index:number)=>{

        return <div key={index} >

            <table>
                <tbody>
                <tr>
                    <td>
                        username: 
                    </td>
                    <td>
                        {item.userId}
                    </td>
                </tr>
                <tr>
                    <td>
                        transactionId: 
                    </td>
                    <td>
                        {item.transactionId}
                    </td>
                </tr>
                <tr>
                    <td>
                        amount: 
                    </td>
                    <td>
                        {item.amount}
                    </td>
                </tr>
                <tr>
                    <td>
                        status: 
                    </td>
                    <td>
                        {item.status}
                    </td>
                </tr>
                </tbody>
            </table>
            <div>
                <button onClick={()=>handleApproveTransaction(index)}>approve</button>
            </div>
        </div>
    })



    return (
    <div>

        {rechargeTransactionsElement}
    
    </div>);
  }
  
  export default PendingTransactions;