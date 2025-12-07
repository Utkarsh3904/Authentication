import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const dataContext = createContext()

function UserContext({children}) {

  let [userData, setUserData] = useState(null)

    const serverUrl ="http://localhost:8000"

//storing the userdata which going to come from backend 
    const getUserdata = async()=>{
      try {
        let {data} = await axios.get(serverUrl + "/api/getuserdata", {withCredentials:true}) 
        setUserData(data);  //this has to be run one time on the starting time
      } catch (error) {
        console.log(error);
        
      }
    }

    const value={
      serverUrl,userData, setUserData
    }

    useEffect(()=>{
        getUserdata()
    },[])

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  )
}

export default UserContext
//smjhna hai abhi