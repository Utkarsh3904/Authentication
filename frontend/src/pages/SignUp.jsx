import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import dp from '../assets/dp.webp'
import { useContext } from 'react';
import { dataContext } from '../context/UserContext';
import axios from "axios"

function SignUp () {
    const navigate = useNavigate();
    let {serverUrl} = useContext(dataContext)

    let [firstName, setFirstName] = useState(null) 
    let [lastName, setLastName] = useState(null) 
    let [userName, setUserName] = useState(null) 
    let [email, setEmail] = useState(null) 
    let [password, setPassword] = useState(null) 
    let [error, setError] = useState(null) 
    let file=useRef(null)


    const handleSignUp = async (e) => {
      e.preventDefault()
      try {
        let data = await axios.post(serverUrl + '/api/signup',{
            firstName, lastName, userName, email, password
        },{withCredentials:true})  //needed else cookies will not parse
        console.log(data);
        
      } catch (error) {
        console.log(error.message);
      }
    }

    let [frontendImage, setFrontendImage] = useState(dp)
    let [backendImage, setBackendImage] = useState(null)
    function handleImage (e){
      // console.log(e);
      let file = e.target.files[0];
      setBackendImage(file);
      let image = URL.createObjectURL(file);
      setFrontendImage(image) 
      
    }
  
  return (
    <div className="w-full h-[100vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center items-center">
      <div className="h-auto w-full max-w-md bg-white/10 backdrop-blur rounded-lg shadow-lg flex flex-col justify-center items-center p-8">
        <form
          className="flex flex-col gap-5 w-full"
          autoComplete="off"
          onSubmit={handleSignUp}
        >
          {/* for to change image */}
          <input type="file" hidden ref={file} onChange={handleImage}/>
        
          <h1 className='text-white font-bold text-3 xl flex justify-center'>Let's create an account</h1>
            <div className="flex justify-center w-full">
              <div className='flex justify-center items-center relative w-[100px] h-[100px] rounded-full bg-white overflow-hidden border-2 border-gray-800'>
                  <img src={frontendImage} alt="" className='w-[100%] h-[100%]' />
                  <div className='absolute w-[100%] h-[100%] bg-black top-0 opacity-0 hover:opacity-50 cursor-pointer flex justify-center items-center text-white font-bold text-[50px] ' 
                  onClick={()=>{file.current.click()}}>
                    +</div>
              </div>
            </div>

        
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <input
              className="flex-1 px-3 py-2 rounded bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
            />
            <input
              className="flex-1 px-3 py-2 rounded bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
            />
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
            type="text"
            name="username"
            placeholder="Username"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
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
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-gray-300 text-sm">
          Already have an account?{' '}
          <button
            className="text-blue-400 hover:underline"
            onClick={() => navigate('/login')}
            type="button"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

