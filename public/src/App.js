import React from 'react' 
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Secret from './pages/Secret'
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route  path='/register' element = {<Register/>}></Route>
      <Route  path='/login' element = {<Login/>}></Route>
      <Route  path='/' element = {<Secret/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
