import React from 'react';
import { ImFileEmpty } from "react-icons/im";
import "../styles/NoTransaction.css";


const NoTransaction = () => {
  return (
    <div className='no-transactions'>
        <ImFileEmpty size="5rem" className='no-transactions-icons'/>
        <h3>No Transaction Recorded</h3>
        <p>Add some transaction to see reports</p>
    </div>
  )
}

export default NoTransaction;