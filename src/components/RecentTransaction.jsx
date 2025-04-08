import React from 'react'

const RecentTransaction = ({transaction}) => {
  return (
    <div>
        <h2>Recent Transaction</h2>
        <div>
            <ul>
            {transaction.slice(-10).reverse().map((tx,i) =>(
                <li key={i} className='transaction-item'>
                    <span className='transaction-category'>
                        {tx.category}
                    </span>
                    <span className={`transaction-amount 
                        ${tx.type === "Income" ? 'income' : 'expense'}`}>
                        {tx.amount.toLocaleString()}
                    </span>
                </li>
            ))}
            </ul>
        </div>
    </div>
  )
}

export default RecentTransaction