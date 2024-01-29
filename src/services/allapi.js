import { BASEURL } from "./baseurl"
import { commonapi } from "./commonapi"



export const registerAPI=async(user)=>{
    return  await commonapi('POST',`${BASEURL}/user/register`,user,"")
  }

  export const loginAPI= async(user)=>{

    return await commonapi('POST',`${BASEURL}/user/login`,user,"")
    
    }


    //add recipe
export const addrecipe=async(reqbody,reqheader)=>{
    return  await commonapi('POST',`${BASEURL}/recipe/add`,reqbody,reqheader)
  }

  //home project
export const homerecipe=async()=>{
  return  await commonapi('GET',`${BASEURL}/recipe/homerecipe`)
}
//all recipe
export const allrecipe=async(searchkey,reqheader)=>{
//query parameter=path?key
  return  await commonapi('GET',`${BASEURL}/recipe/allrecipe?search=${searchkey}`,"",reqheader)
}//user recipe
export const userrecipe=async(reqheader)=>{
  return  await commonapi('GET',`${BASEURL}/user/recipe`,"",reqheader)
}
// export const sendmessage=async(reqbody,reqheader)=>{
//   return  await commonapi('POST',`${BASEURL}/message/send`,reqbody,reqheader)
// }

export const sendmessage = async (messages) => {
    const response = await commonapi('POST', `${BASEURL}/message/send`, messages);
    return response;
}

// export const userprofile=async(id)=>{
//   return  await commonapi('GET',`${BASEURL}/user/profile/${id}`,"","")
// }
export const editprofile=async(reqbody,reqheader)=>{
  return  await commonapi('PUT',`${BASEURL}/user/edit/`,reqbody,reqheader)
}


export const editrecipe=async(recipeid,reqbody,reqheader)=>{
  return  await commonapi('PUT',`${BASEURL}/recipe/edit/${recipeid}`,reqbody,reqheader)
}
//delete
export const deleterecipe=async(recipeid,reqheader)=>{
  return  await commonapi('DELETE',`${BASEURL}/recipe/remove/${recipeid}`,{},reqheader)
}
//getmesg
export const allmessage=async(reqheader)=>{
  //query parameter=path?key
    return  await commonapi('GET',`${BASEURL}/message/allmessage`,"",reqheader)
  }
  //delete mesg
export const deletemessage=async(messageid,reqheader)=>{
  return  await commonapi('DELETE',`${BASEURL}/message/remove/${messageid}`,{},reqheader)
}
//useralll
export const alluser=async(reqheader)=>{
  //query parameter=path?key
    return  await commonapi('GET',`${BASEURL}/user/alluser`,"",reqheader)
  }
