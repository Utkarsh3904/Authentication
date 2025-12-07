import React from 'react'
import { dataContext } from '../context/UserContext'

function home() {
        let {userData, setUserData} = useContext(dataContext)
  return (
    <div>
      {userData.firstName}
    </div>
  )
}

export default home
