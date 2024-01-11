import React, { useEffect, useState } from 'react'
import Header from '../components/Header'

import Footer from '../components/Footer'
import About from '../components/About'
import Start from '../components/Start'

function Home() {
  const [log,setlog]=useState(false)
  useEffect(()=>{
    if(sessionStorage.getItem("token")) {
      setlog(true)
    }
  },[])
  return (
    <>
        <Header/>

        {
            !log?<Start/>:<About/>
            }
            

<Footer/>

{/* <About/> */}


    </>
  )
}

export default Home