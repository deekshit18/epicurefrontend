import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Header from '../components/Header';
import { deleterecipe, editprofile, userrecipe } from '../services/allapi';
import { BASEURL } from '../services/baseurl';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import Updaterc from '../components/Updaterc';
import { editresrespcon} from '../context/Contextshare';
import Messagebox from '../components/Messagebox';

function Profile() {
  const {editresppcon,seteditrespcon}=useContext(editresrespcon)

  const navigate=useNavigate()
  
  const logout=()=>{
  sessionStorage.removeItem("token")
  sessionStorage.removeItem("existinguser")
  // setistokenres(false)
  //navigate to home page
  navigate('/')
  }

    const [userrecipes,setuserrecipes]=useState([])
    const [userdetails,setuserdetails]=useState([])
    const [preview,setPreview]=useState("")
    const [isupdate,setisupdate]=useState(false)
    const [userdata,setuserdata]=useState({
username:"",email:"",password:"", profile:""
    })
    const [existingimage,setexistingimage]=useState("")
    const getuserrecipes=async()=>{
        const token=sessionStorage.getItem("token")
          const reqheader={
            "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
          }
          const result=await userrecipe(reqheader)
          console.log(result.data);
          setuserrecipes(result.data)
      }
      useEffect(()=>{
        getuserrecipes()
        },[editresppcon])
        useEffect(()=>{
            setuserdetails(JSON.parse(sessionStorage.getItem("existinguser")))
           
          },[])
 useEffect(()=>{
            const user=JSON.parse(sessionStorage.getItem("existinguser"))
            setuserdata({...userdata,username:user.username,email:user.email,password:user.password,profile:""})
           setexistingimage(user.profile)
          },[isupdate])

          useEffect(()=>{
            if(userdata.profile){
            setPreview(URL.createObjectURL(userdata.profile))
            }else{
              setPreview("")
            }
            },[userdata.profile])
          console.log(userdetails);
const handlepupdate=async()=>{
  const {username,email,password,profile}=userdata
  if (!profile) {
    Swal.fire({
      icon: 'info',
      title: 'Oops...',
      text: 'Please Fill The Form!',
      // footer: '<a href="">Why do I have this issue?</a>'
    })}
    else{
      
        //1 create object for formdata-since we have upload content 
        const reqbody = new FormData()
        //2 add data to formdata-append()
        reqbody.append("username",username)

        reqbody.append("email",email)
        reqbody.append("password",password)
        preview?reqbody.append("profile",profile):reqbody.append("profile",existingimage)
        const token = sessionStorage.getItem("token")
        console.log(token);
        if (preview) {
          const reqheader = {
              "Content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
            }
            const result = await editprofile(reqbody,reqheader)
            console.log(result);
          if (result.status === 200) {
            console.log(result.data);  
            // sessionStorage.setItem("existinguser",JSON.stringify(result.data.existinguser))

            sessionStorage.setItem("existinguser",JSON.stringify(result.data))
            Swal.fire({
              icon: 'success',
              title: 'Oops...',
              text: 'Updated',
              // footer: '<a href="">Why do I have this issue?</a>'
            })
            setisupdate(true)

          }
        }  
        else{
          const reqheader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
          const result = await editprofile(reqbody,reqheader)
          console.log(result);
        if (result.status === 200) {
          console.log(result.data);  
          
          sessionStorage.setItem("existinguser",JSON.stringify(result.data))

          setisupdate(true)

        }}
          
}}

const handledelete=async(id)=>{
  const token=sessionStorage.getItem("token")
  const reqheader={
    "Content-Type":"application/json",
"Authorization":`Bearer ${token}`
  }
  const result=await deleterecipe(id,reqheader)
  console.log(result);
  window.location.reload()

}
  return (
    <>
    <Header/>
        <Container className="mt-3">
          {/* Profile Details */}
         <Row>
              <Col md={12}>
                  <Row className="mb-3 p-2" style={{ border: '4px solid black'}}>
                    <Col md={3}>
                      {/* Profile Photo */}
                      <label htmlFor="profile">
                      <input id="profile" type="file" style={{display:'none'}}  onChange={(e)=>setuserdata({...userdata,profile:e.target.files[0]})}/>

        {
          existingimage==""?
                    <img style={{width:"150px",height:"150px"}} src={preview?preview:"https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"} className=' rounded-circle justify-content-center' alt="" />

                : <img style={{width:"150px",height:"150px"}} src={preview?preview:`${BASEURL}/uploads/${existingimage}`} className='rounded-circle justify-content-center' alt="" />

        }
          </label>
          
          <Button variant="primary" className="mx-2 text-dark" onClick={handlepupdate}>
                P
              </Button>
                      {/* <Image
                        src={userdetails.profile?`${BASEURL}/uploads/${userdetails.profile}`:"https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"}
                        alt="Profile Photo"
                        roundedCircle
                        fluid
                      /> */}
                    </Col>
                    <Col md={3}>
                      {/* Username and Email */}
                      <div className='mt-2'>
                        <h4>{userdetails.username}</h4>
                        <p>{userdetails.email}</p>
                      </div>
                    </Col>
                    <Col md={3}>
                      {/* Number of Posts */}
                      <div className='mt-2'>
                        <h4>Number of Posts</h4>
                        <p>{userrecipes.length}</p>
                      </div>
                    </Col>
                    <Col md={2}>
                      <Button variant="primary" className="mx-2 text-dark" onClick={logout}>
                  logout
                </Button>
                <Messagebox/>
                    </Col>
                  </Row>
                  
              </Col>
              {/* <Col md={6}><table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Send by</th>
      <th scope="col">Message</th>
    </tr>
  </thead>
  <tbody>
    <tr class="table-active">
      <td>Column content</td>
      <td>Column content</td>
    </tr>
</tbody>
</table></Col> */}
    
         </Row>    
          {/* Food Details */}
          {userrecipes?.length>0?
    userrecipes?.map((item)=>(   <Row>

            <Col md={4}>
              {/* Food Name and Image */}
              <div>
                <h4>{item.fname}</h4>
                <Image src={item?`${BASEURL}/uploads/${item.fimage}`:"https://i.ytimg.com/vi/YamhG-BXbss/maxresdefault.jpg"} alt="Food Image" fluid />
              </div>
            </Col>
            <Col md={4}>
              {/* Ingredients */}
              <div>
                <h4>Ingredients</h4>
                <p>{item.ingredients}</p>
              </div>
              <Updaterc recipe={item}/>
            </Col>
            <Col md={4}>
              {/* Instructions */}
              <div>
                <h4>Instructions</h4>
                <p>{item.instructions}</p>
              </div>
               <Button variant="primary" className="mx-2 text-dark" onClick={()=>handledelete(item._id)}>
                d
              </Button>
            </Col>
          </Row>)):
      <p class="card-text">No Projects Uploaded yet!!</p>}
        </Container>
    </>
  );
}

export default Profile;
