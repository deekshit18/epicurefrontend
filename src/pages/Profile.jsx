import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { deleterecipe, editprofile, userrecipe } from '../services/allapi';
import { BASEURL } from '../services/baseurl';
import Swal from 'sweetalert2';
import {  useNavigate } from 'react-router-dom';
import Updaterc from '../components/Updaterc';
import { editresrespcon } from '../context/Contextshare';
import Messagebox from '../components/Messagebox';
import Pheader from '../components/Pheader';
import Logout from '../components/Logout';
import Footer from '../components/Footer';
import CountUp from 'react-countup';
import myrecp from "../my-recipes-logo.png";
import addpro from "../addpro.png";
import backg from "../back2.jpg";

function Profile() {
  const { editresppcon, seteditrespcon } = useContext(editresrespcon);

  const navigate = useNavigate();

  // const logout = () => {
  //   sessionStorage.removeItem("token");
  //   sessionStorage.removeItem("existinguser");
  //   navigate('/');
  // };

  const [userrecipes, setuserrecipes] = useState([]);
  const [userdetails, setuserdetails] = useState([]);
  const [preview, setPreview] = useState("");
  const [isupdate, setisupdate] = useState(false);
  const [userdata, setuserdata] = useState({
    username: "",
    email: "",
    password: "",
    profile: ""
  });
  const [existingimage, setexistingimage] = useState("");

  const getuserrecipes = async () => {
    const token = sessionStorage.getItem("token");
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const result = await userrecipe(reqheader);
    setuserrecipes(result.data);
  };

  useEffect(() => {
    getuserrecipes();
  }, [editresppcon]);

  useEffect(() => {
    setuserdetails(JSON.parse(sessionStorage.getItem("existinguser")));
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("existinguser"));
    setuserdata({
      ...userdata,
      username: user.username,
      email: user.email,
      password: user.password,
      profile: ""
    });
    setexistingimage(user.profile);
  }, [isupdate]);

  useEffect(() => {
    if (userdata.profile) {
      setPreview(URL.createObjectURL(userdata.profile));
    } else {
      setPreview("");
    }
  }, [userdata.profile]);

  const handlepupdate = async () => {
    const { username, email, password, profile } = userdata;
    if (!profile) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Make Changes'
      });
    } else {
      const reqbody = new FormData();
      reqbody.append("username", username);
      reqbody.append("email", email);
      reqbody.append("password", password);
      preview ? reqbody.append("profile", profile) : reqbody.append("profile", existingimage);
      const token = sessionStorage.getItem("token");

      if (preview) {
        const reqheader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        };
        const result = await editprofile(reqbody, reqheader);
        if (result.status === 200) {
          sessionStorage.setItem("existinguser", JSON.stringify(result.data));
          Swal.fire({
            icon: 'success',
            title: 'Profile Photo',
            text: 'Updated'
          });
          setisupdate(true);
        }
      } else {
        const reqheader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        };
        const result = await editprofile(reqbody, reqheader);
        if (result.status === 200) {
          sessionStorage.setItem("existinguser", JSON.stringify(result.data));
          setisupdate(true);
        }
      }
    }
  };

  const handledelete = async (id) => {
    const token = sessionStorage.getItem("token");
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    await deleterecipe(id, reqheader);
    getuserrecipes();
  };

  return (
    <div style={{ backgroundImage:`url(${backg})` }}>
      <Pheader />
      <Container className="mt-3">
        {/* profilebox */}
        <Row>
          <Col md={12}>
            <Card className="mb-3 p-5" style={{ boxShadow: "rgba(204, 219, 232, 0.5) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset" }}>
              <Row className="align-items-center">
                <Col md={3}>
                  <label htmlFor="profile">
                    <input
                      id="profile"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(e) => setuserdata({ ...userdata, profile: e.target.files[0] })}
                    />
                    {
                      existingimage === "" ?
                        <img style={{ width: "150px", height: "150px" }} src={preview ? preview : addpro} className='rounded-circle justify-content-center' alt="" />
                        : <img style={{ width: "150px", height: "150px" }} src={preview ? preview : `${BASEURL}/uploads/${existingimage}`} className='rounded-circle justify-content-center' alt="" />
                    }
                  </label>
                { preview ? <button class="bookmarkBtn m-3" onClick={handlepupdate}>
  <span class="IconContainer">
    <svg viewBox="0 0 384 512" height="0.9em" class="icon">
      <path
        d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"
      ></path>
    </svg>
  </span>
  <p class="text mt-3">Save</p>
</button>:null}
                </Col>
                <Col md={3}>
                  <div className='mt-2'>
                    <h1 style={{  color: 'red' }}>{userdetails.username}</h1>
                    <h5 style={{ color: 'black' }}>{userdetails.email}</h5>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='mt-2'>
                    <CountUp end={userrecipes.length} duration={2} separator="," className='fs-1 ' style={{ color: 'red' }} />
                    <h5 style={{  color: 'black' }}>Posts</h5>

                  </div>
                </Col>
                <Col md={3} className="d-flex justify-content-end align-items-center">
                  <Messagebox />
                  <Logout/>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
<div className='text-center'>
          <img className='' style={{width:"200px"}} src={myrecp} alt="" />
  
</div>
        {userrecipes?.length > 0 ? (
          userrecipes?.map((item) => (
            <Card key={item._id} className='p-4 m-3' style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}>
              {/* Food Name and Dropdown (Update & Delete) */}
              <Row className=" p-2 d-flex justify-content-between align-items-center">
                <Updaterc recipe={item} />
                <Button className="ms-3 ps-2 noselect dltbut" onClick={() => handledelete(item._id)}>
                  <span className="text">Delete</span>
                  <span className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                    </svg>
                  </span>
                </Button>
              </Row>
              {/* Food Image */}
              <Row>
                <Col md={4}>
                  <div>
                  <h2 className='text-danger text-center mb-1'>{item.fname}</h2>

                    <Image src={item ? `${BASEURL}/uploads/${item.fimage}` : "https://i.ytimg.com/vi/YamhG-BXbss/maxresdefault.jpg"} alt="Food Image" fluid />
                  </div>
                </Col>

                {/* Ingredients */}
                <Col md={4}>
                  <div>
                    <h5>Ingredients:</h5>
                    <strong className='text-dark'>{item.ingredients}</strong>
                  </div>
                </Col>

                {/* Instructions */}
                <Col md={4}>
                  <div>
                  <h5>Instructions:</h5>

                    <strong className='text-dark'>{item.instructions}</strong>
                  </div>
                </Col>
              </Row>
            </Card>
          ))
        ) : (
          <p className="card-text text-danger">No Posts Uploaded!!</p>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default Profile;
