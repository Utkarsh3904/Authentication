import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Home from "./pages/Home.jsx"


function App() {
  return (
    <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route/>
    </Routes>
  )
}

export default App

