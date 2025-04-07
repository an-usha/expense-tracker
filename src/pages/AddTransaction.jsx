import React, { useState } from 'react';
import "../styles/AddTransaction.css";

const AddTransaction = () => {
    const [type, setType] = useState("Expense");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    function handleAddTransaction (e) {
        e.preventDefault();
        if(!amount || !category || !date){
            return alert("Error");
        }

        const existingTransaction = JSON.parse(localStorage.getItem("transaction")) || [];

        const newTransaction ={
            type : type,
            amount: parseFloat(amount),
            category,
            description,
            date
        }

        const allTransaction = [...existingTransaction,newTransaction];

        localStorage.setItem("transaction",JSON.stringify(allTransaction));

        alert("Transaction Added Successfully");
        setAmount("");
        setDescription("");
        setCategory("");
        setDate("");
    }

  return (
    <div className='add-transaction-container'>
        <h2>Add Transaction</h2>
        <form onSubmit={handleAddTransaction}>
            <div className='transaction-box'>
                <div className='transaction-type'>
                    <label>
                        <input type='radio' value="expense" checked={type==="Expense"} onChange={() => setType("Expense")}/>Expense
                    </label>
                    <label>
                        <input type='radio' value="income" checked={type==="Income"} onChange={() => setType("Income")}/>Income
                    </label>
                </div>
                <input type='number' placeholder='Enter Amount Here...' value={amount}  onChange={(e) => setAmount(e.target.value)}/>
                <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select a Category</option>
                    <option value="salary">Salary</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Savings">Savings</option>
                    <option value="Others">Others</option>
                </select>
                <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}> </textarea>
                <input type='date' value={date} onChange={(e) => setDate(e.target.value)}/>
                <button  type='submit'> Add Transaction</button>
            </div>
        </form>
    </div>
  )
}

export default AddTransaction