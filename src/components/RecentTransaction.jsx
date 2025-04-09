import React from 'react';
import { MdOutlineCurrencyRupee } from "react-icons/md";


const RecentTransaction = ({transaction}) => {
  return (
    <div>
            <ul>
            {transaction.slice(-10).reverse().map((tx,i) =>(
                <li key={i} className='transaction-item'>
                    <span className='transaction-category'>
                        {tx.category}
                    </span>
                    <span className={`transaction-amount 
                        ${tx.type === "Income" ? 'income' : 'expense'}`}>
                        <MdOutlineCurrencyRupee/>{tx.amount.toLocaleString()}
                    </span>
                </li>
            ))}
            </ul>
    </div>
  )
}

export default RecentTransaction