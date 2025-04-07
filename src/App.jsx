import { BrowserRouter , Routes , Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Transaction from './pages/Transaction'
import Reports from './pages/Report'
import Navbar from './components/Navbar'
import NotFound from './pages/NotFound'
import AddTransaction from './pages/AddTransaction'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Navbar/>
         <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/add' element={<AddTransaction/>}/>
            <Route path='/transaction' element={<Transaction/>}/>
            <Route path='/report' element={<Reports/>}/>
            <Route path='*' element={<NotFound/>}/>
         </Routes>
      </div>
     </BrowserRouter>
  )
}

export default App
