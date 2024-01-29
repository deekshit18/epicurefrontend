import React from 'react'
import Addrec from '../components/Addrec'
import backg from "../back2.jpg";

function Addrecipe() {
  return (
    <div style={{backgroundImage: `url(${backg})`,height:"100vh"}}><Addrec/></div>
  )
}

export default Addrecipe