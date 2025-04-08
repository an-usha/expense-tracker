import React, { useEffect, useState } from 'react'
import TransactionCard from '../components/TransactionCard';
import "../styles/Dashboard.css";
import RecentTransaction from '../components/RecentTransaction';
import { Link } from 'react-router-dom';


const Dashboard = () => {

  const [transaction, setTransaction] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense,setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const existingTransaction = JSON.parse(localStorage.getItem("transaction")) || [];
    setTransaction(existingTransaction);
    let income =0;
    let expense =0;

    existingTransaction.forEach(element => {
      if(element.type ==="Income"){
        income = income + element.amount;
      }else{
        expense = expense + element.amount;
      }
    });

    setTotalExpense(expense);
    setTotalIncome(income);
    setBalance(income-expense);
  },[])

  return (
    <div className='dashboard'>
      <div className='dashboard-inner'>
        <h2>Dashboard</h2>
        <button className='add-transaction'>
          <Link to={'/add'}>Add Transaction</Link>
        </button>
      </div>
      <TransactionCard balance={balance} income={totalIncome} expense={totalExpense}/>
      <div className='transactions-chart-row'>
        <div className='transactions half-width'>
          <RecentTransaction transaction={transaction} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard