import React from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    
  return (
    <div>
      login hogya
       <br />
      <button
        className="my-4 mx-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-900 transition"
        onClick={() => navigate("/signup")}
      > sigunp le chlo
      </button>
    </div>
  )
}

export default Login
