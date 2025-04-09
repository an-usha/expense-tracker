import React, { useEffect, useState } from 'react';
import "../styles/Transaction.css";
import { useNavigate } from 'react-router-dom';
import NoTransaction from '../components/NoTransaction';
import { 
    MdOutlineCurrencyRupee, 
    MdOutlineDeleteOutline, 
    MdDining, 
    MdOutlineLocalGroceryStore,
    MdPedalBike,
    MdOutlineMessage,
    MdOutlineSavings,
} from "react-icons/md";
import { RiEdit2Line, RiMovie2AiFill } from "react-icons/ri";

const Transaction = () => {
    const navigate = useNavigate();
    const categoryIcons = {
        "Salary" : <MdOutlineCurrencyRupee/>,
        "Groceries": <MdOutlineLocalGroceryStore/>,
        "Dining": <MdDining/>,
        "Transport": <MdPedalBike/>,
        "Entertainment": <RiMovie2AiFill/>,
        "Savings": <MdOutlineSavings/>,
        "Others": <MdOutlineMessage/>
    }
    

    const [transaction,setTransaction] = useState([]);

    useEffect(()=>{
        const allTransaction = JSON.parse(localStorage.getItem("transaction") || []);
        setTransaction(allTransaction);
    },[]);

    const handleEditTransaction = (index) => {
        const editTransaction = transaction[index];
        navigate("/add",{state:{transaction:{...editTransaction,index}}});
    }; 

    const handleDeleteTransaction =(index) =>{
        const deleteTransaction = transaction.filter((data,i)=> i!== index);
        setTransaction(deleteTransaction);
        localStorage.setItem("transaction",JSON.stringify(deleteTransaction));
    };
    console.log(transaction);



    return (
        <div className='transactions-container'>
            <h2>
                Transaction Details
            </h2>

            {transaction.length === 0 ? <NoTransaction/> : 
                <table className='icon-manager'>
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
                    {transaction.map((data,i)=>(
                        <tr key={i}>
                        <td>
                           {categoryIcons[data.category]} {data.category}
                        </td>
                        <td className={data.type == "Income"?'income' : 'expense'}>
                            {data.type}
                        </td>
                        <td className={data.type == "Income"?'income' : 'expense'}>
                        <MdOutlineCurrencyRupee />{data.amount.toLocaleString('en-Ne')}
                        </td>
                        <td>
                            {data.description || "No Description"}
                        </td>
                        <td>
                            {data.date}
                        </td>
                        <td>
                                <div className='action-buttons'>
                                    <button className='edit-btn' onClick={() =>handleEditTransaction(i)}><RiEdit2Line/></button>
                                    <button className='delete-btn' onClick={() =>handleDeleteTransaction(i)}><MdOutlineDeleteOutline/></button>

                                </div>
                        </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            }

        </div>
    )
}

export default Transaction