import React, { createContext, useState } from 'react'

export const editresrespcon=createContext()
export const isauthtokencontext=createContext()
export const isadmincontext=createContext()
export const userconc=createContext()


function Contextshare({children}) {
    const [editresppcon,seteditrespcon]=useState({})
    const [istokenres,setistokenres]=useState(false)
    const [isadminres,setisadminres]=useState(false)
    const [userc,setuserc]=useState("")

  return (
    <>
    <editresrespcon.Provider value={{editresppcon,seteditrespcon}}>
    <isauthtokencontext.Provider value={{istokenres,setistokenres}}>
    <isadmincontext.Provider value={{isadminres,setisadminres}}>
    <userconc.Provider value={{userc,setuserc}}>

{children}
</userconc.Provider>

</isadmincontext.Provider>
</isauthtokencontext.Provider>

    </editresrespcon.Provider>
    
    </>
  )
}

export default Contextshare