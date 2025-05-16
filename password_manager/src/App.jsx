import { useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import Manager from './component/Manager'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <div className="my-10"></div>
     <Manager/>
     <ToastContainer position="top-right" autoClose={3000} />

    </>
  )
}

export default App
