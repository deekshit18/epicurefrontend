import React from 'react'
import Addrec from '../components/Addrec'
import backg from "../back2.jpg";

function Addrecipe() {
  return (
    <div style={{backgroundImage: `url(${backg})`,minHeight:"100vh"}}><Addrec/></div>
  )
}

export default Addrecipe