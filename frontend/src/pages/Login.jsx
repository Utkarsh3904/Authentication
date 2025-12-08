import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataContext } from '../context/UserContext';
import { useContext } from 'react';
import axios from 'axios';

const Login = () => {    
   const navigate = useNavigate();
    let {serverUrl, userData, setUserData, getUserdata} = useContext(dataContext)
    
    let [email, setEmail] = useState(null) 
    let [password, setPassword] = useState(null) 
    let [error, setError] = useState(null) 

    const handleLogin = async (e)=>{
        e.preventDefault()
        try {
        let {data} = await axios.post(serverUrl + '/api/login',{
             email, password
        },{withCredentials:true})  //needed else cookies will not parse
        
        setUserData(data.user)
        await getUserdata()
        
         if(userData){
          navigate("/")
         }
        
      } catch (error) {
        alert(error.response.data.message)
          }
    }


   
  
  return (
    <div className="w-full h-[100vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center items-center">
      <div className="h-auto w-full max-w-md bg-white/10 backdrop-blur rounded-lg shadow-lg flex flex-col justify-center items-center p-8">
        <form
          className="flex flex-col gap-5 w-full"
          autoComplete="off"
          onSubmit={handleLogin}
        >
              <div className="m-2 px-12 text-gray-300 flex justify-center items-center text-4xl font-bold">
            Login
          </div>
        
          <input
            className="px-3 py-2 rounded bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        
          <input
            className="px-3 py-2 rounded bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-gray-300 text-sm">
          Don't have an account?{' '}
          <button
            className="text-blue-400 hover:underline"
            onClick={() => navigate('/signup')}
            type="button"
          >
            Sign Up
          </button>
        </div>
        
         
        </div>
    </div>
  );

}

export default Login
