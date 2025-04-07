import React from 'react';
import "../styles/Transaction.css";

const Transaction = () => {

    const allTransaction = JSON.parse(localStorage.getItem("transaction") || []);
    allTransaction.map((data,i) => {
        console.log(data,i);
        
    })
    return (
        <div className='transactions-container'>
            <h2>
                Transaction Details
            </h2>
            <table>
                <thead>
                <tr>
                    <th>
                        Category
                    </th>
                    <th>
                        Type
                    </th>
                    <th>
                        Amount
                    </th>
                    <th>
                        Description
                    </th>
                    <th>
                        Date
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
                </thead>
                <tbody>
                {allTransaction.map((data,i)=>(
                    <tr key={i}>
                       <td>
                        {data.category}
                       </td>
                       <td className={data.type == "Income"?'income' : 'expense'}>
                        {data.type}
                       </td>
                       <td className={data.type == "Income"?'income' : 'expense'}>
                        {data.amount.toLocaleString('en-Ne',{style:'currency',currency:'NPR'})}
                       </td>
                       <td>
                        {data.description || "No Description"}
                       </td>
                       <td>
                        {data.date}
                       </td>
                       <td>
                            <div className='action-buttons'>
                                <button className='edit-btn'>Edit</button>
                                <button className='delete-btn'>Delete</button>

                            </div>
                       </td>
                    </tr>
                ))}

                </tbody>
            </table>

        </div>
    )
}

export default Transaction