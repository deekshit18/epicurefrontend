import React, { useContext, useEffect, useState } from 'react'
import backg from "../back2.jpg";

import About from '../components/About'
import Start from '../components/Start'
import AdminPage from './Adminpage'
import { isadmincontext, isauthtokencontext } from '../context/Contextshare'

function Home() {
  const { isadminres, setisadminres } = useContext(isadmincontext);
  const {istokenres,setistokenres}=useContext(isauthtokencontext)

  const [admin,setadmin]=useState(false)


  const [log,setlog]=useState(false)


  useEffect(()=>{
    if(sessionStorage.getItem("token")) {
      setlog(true)
      setistokenres(true)
      if(JSON.parse(sessionStorage.getItem("existinguser")).email=="admin@gmail.com" && JSON.parse(sessionStorage.getItem("existinguser")).password=="admin123") {
        setadmin(true)
        setisadminres(true)
      }
    }
  },[])

  return (
<div className='' style={{backgroundImage: `url(${backg})`}}>
  
          {
              !log?<Start log={log}/>:admin?<AdminPage/>:<About log={log}/>
              }
              
  

{/* <About/> */}


    </div>
  )
}

export default Home