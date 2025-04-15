import React, { useEffect, useState } from 'react'
import TransactionCard from '../components/TransactionCard';
import "../styles/Dashboard.css";
import RecentTransaction from '../components/RecentTransaction';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {Chart as CharJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import NoTransaction from '../components/NoTransaction';


CharJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {

  const [transaction, setTransaction] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense,setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const [maxExpense, setMaxExpense] = useState(0);

  const categories =[
    "Groceries",
    "Transport",
    "Entertainment",
    "Others",
    "Savings",
    "Dining"
  ]


  useEffect(() => {
    const existingTransaction = JSON.parse(localStorage.getItem("transaction")) || [];
    setTransaction(existingTransaction);
    let income = 0;
    let expense = 0;
    let categoryBreakdown = {};
    let highestExpense = 0;
    categories.forEach((cat)=> categoryBreakdown[cat] = 0)

    existingTransaction.forEach(element => {
      if(element.type ==="Income"){
        income += element.amount;
      }else{
        expense += element.amount;
        categoryBreakdown[element.category] = (categoryBreakdown[element.category] || 0) + element.amount;
        if(categoryBreakdown[element.category] > highestExpense){
          highestExpense = categoryBreakdown[element.category];
        }
      }
    });
    console.log(categoryBreakdown,"category");
    console.log(highestExpense,"expense");
    

    setTotalExpense(expense);
    setTotalIncome(income);
    setBalance(income-expense);
    setCategoryData(categoryBreakdown);
    setMaxExpense(highestExpense);
  },[]);

  const chartData = {
    labels: categories,
    datasets : [
      {
        label: "Expense per category",
        data: categories.map((cat) => categoryData[cat] || 0),
        backgroundColor:[
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#9966FF",
          "#FFA07A",
          "#9966FF",
        ],
      },
    ],
  };

  const chartOptions = {
    scales :{
      y:{
        beginAtZero: true,
        suggestedMax: maxExpense > 0 ? maxExpense *1.2 : 10,
        grid: {
          display: true,
        },
      },
      x:{
        grid:{
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className='dashboard'>
      <div className='dashboard-inner'>
        <h2>Dashboard</h2>
        <button className='add-transaction common-button'>
          <Link to={'/add'}>Add Transaction</Link>
        </button>
      </div>
      <TransactionCard balance={balance} income={totalIncome} expense={totalExpense}/>
      <div className='transactions-chart-row'>
        <div className='transactions half-width'>
          <h2>Recent Transaction</h2>
          {transaction.length === 0 ? <NoTransaction/> : 
          <RecentTransaction transaction={transaction} />
        }
        </div>
        <div className='expense-chart half-width'>
          <h2>Expense By Category</h2>
          {chartData.datasets[0].data.every((value) => value === 0) ? (
            <NoTransaction/> ) : 
            <div className='chart-container'>
              <Bar data={chartData} options={chartOptions}></Bar>
            </div>
          }
         

        </div>
      </div>
    </div>
  )
}

export default Dashboard