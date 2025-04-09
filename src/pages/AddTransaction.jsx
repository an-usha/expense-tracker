import React, { useEffect, useState } from 'react';
import "../styles/AddTransaction.css";
import { useLocation, useNavigate } from 'react-router-dom';

const AddTransaction = () => {
    const [type, setType] = useState("Expense");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [transaction, setTransaction] =useState([]);
    const[editIndex,setEditIndex] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();


    function handleAddTransaction (e) {
        e.preventDefault();
        if(!amount || !category || !date){
            return alert("Error");
        }

        const newTransaction ={
            type : type,
            amount: parseFloat(amount),
            category,
            description,
            date
        }

        let allTransaction;

        if(editIndex === null){
            allTransaction = [...transaction,newTransaction];
        }else{
            allTransaction = [...transaction];
            allTransaction[editIndex] = newTransaction;
        }

        setTransaction(allTransaction);

        localStorage.setItem("transaction",JSON.stringify(allTransaction));

        if(editIndex === null){
            alert(`${type} Added Successfully`);
        }else{
            alert(`${type} Has Been Updated Successfully.`);
            navigate("/transaction");

        }

        setAmount("");
        setDescription("");
        setCategory("");
        setDate("");
        setType("Expense");
    }

    useEffect(()=>{
        const existingTransaction = JSON.parse(localStorage.getItem("transaction")) || [];
        setTransaction(existingTransaction);

        if(location.state && location.state.transaction){
            const transaction = location.state.transaction;
            setType(transaction.type);
            setAmount(transaction.amount);
            setCategory(transaction.category);
            setDescription(transaction.description);
            setDate(transaction.date);
            setEditIndex(transaction.index);
        }
        

    },[location])

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
                    <option value="Salary">Salary</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Dining">Dining</option>
                    <option value="Savings">Savings</option>
                    <option value="Others">Others</option>
                </select>
                <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}> </textarea>
                <input type='date' value={date} onChange={(e) => setDate(e.target.value)}/>
                <button  type='submit'> {editIndex === null ?  'Add Transaction' : 'Update Transaction'}</button>
            </div>
        </form>
    </div>
  )
}

export default AddTransaction