import React, { createContext, useState } from 'react'

export const editresrespcon=createContext()
// export const profilephotoc=createContext()


function Contextshare({children}) {
    const [editresppcon,seteditrespcon]=useState({})
    // const [profilephoto,setprofilephoto]=useState(false)

  return (
    <>
    <editresrespcon.Provider value={{editresppcon,seteditrespcon}}>
    {/* <profilephotoc.Provider value={{profilephoto,setprofilephoto}}> */}

{children}
{/* </profilephotoc.Provider> */}
    </editresrespcon.Provider>
    
    </>
  )
}

export default Contextshare