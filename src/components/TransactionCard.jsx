import React from 'react';
import { MdOutlineCurrencyRupee } from "react-icons/md";

const TransactionCard = ({balance,income,expense}) => {
  return (
    <div>
    <div className='balance-card'>
        <p>Current Balance</p>
        <h1><MdOutlineCurrencyRupee/>{balance.toLocaleString('en-Ne')}</h1>
    </div>
    <div className='summary-cards'>
        <div className='income-card'>
            <p>Total Income</p>
            <h3 className='income'><MdOutlineCurrencyRupee/>{income.toLocaleString('en-Ne')}</h3>
        </div>
        <div className='expense-card'>
            <p>Total expense</p>
            <h3 className='expense'><MdOutlineCurrencyRupee/>{expense.toLocaleString('en-Ne')}</h3>
        </div>
    </div>
    </div>
  )
}

export default TransactionCard