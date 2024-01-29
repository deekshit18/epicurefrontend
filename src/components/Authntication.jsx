import React, { useContext, useState } from 'react';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import login from '../login.png';
import register from '../register.png';
import { loginAPI, registerAPI } from '../services/allapi';
import Swal from 'sweetalert2';
import { isauthtokencontext } from '../context/Contextshare';

function Authentication({ reg }) {
  const { istokenres, setistokenres } = useContext(isauthtokencontext);
const [cpass,setcpass]=useState('')
  const [userdata, setUserdata] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const registerform = reg ? true : false;

  const handlechange = async (e) => {
    e.preventDefault();
    const { username, email, password } = userdata;
    if (!username || !email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Fill The Form!',
      });
    }else {if (password!==cpass) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Passwords do not match! please ensure they are identical!',
      });
    }  else {
      const result = await registerAPI(userdata);
      if (result.status === 200) {
        Swal.fire('Successfully Registered!', 'success');
        setUserdata({
          username: '',
          email: '',
          password: '',
        });
        // Navigate to login
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'info',
          title: result.response.data,
        });
      }
    }}
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = userdata;
    if (!email || !password) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Please Fill The Form!',
      });
    }else {
      const result = await loginAPI(userdata);
      if (result.status === 200) {
        Swal.fire('Login Successfully!', 'success');
        setistokenres(true);
        // Store data
        sessionStorage.setItem('existinguser', JSON.stringify(result.data.existinguser));
        sessionStorage.setItem('token', result.data.token);
        // Reset state
        setUserdata({
          email: '',
          password: '',
        });
        setcpass('')
        // Navigate to home
        navigate('/');
      } else {
        Swal.fire({
          title: result.response.data,
          icon: 'error',
        });
      }
    }
  };

  const boxStyle = {
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',

    backgroundImage: "linear-gradient(180deg,#04e2f7, #1448d8)"

  };

  return (
    <div className="vh-100 regbg d-flex align-items-center justify-content-center" style={{ }}>
      <Container fluid className="d-flex align-items-center justify-content-center">
        <Row className="container w-75 p-3" style={boxStyle}>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            {registerform ? (
              <Image style={{ width: '100%' }} src={register} alt="Image" />
            ) : (
              <Image src={login} alt="Image" fluid />
            )}
          </Col>

          <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-dark">EPICUREHUB</h1>
            <h6 className="text-light">
              {registerform
                ? 'Sign Up to your Account'
                : 'Sign into Account'}
            </h6>

            <div class="form-group w-75">
              {registerform && (
                <>
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder="Username"
                      style={{ width: '100%', borderRadius: '5px' }}
                      value={userdata.username}
                      onChange={(e) => setUserdata({ ...userdata, username: e.target.value })}
                    />
                    <label for="floatingInput">Username</label>
                  </div>
                </>
              )}

              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  style={{ width: '100%', borderRadius: '5px' }}
                  value={userdata.email}
                  onChange={(e) => setUserdata({ ...userdata, email: e.target.value })}
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  autocomplete="off"
                  style={{ width: '100%', borderRadius: '5px' }}
                  value={userdata.password}
                  onChange={(e) => setUserdata({ ...userdata, password: e.target.value })}
                />
                <label for="floatingPassword">Password</label>
              </div>
              {registerform &&   <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Confirm Password"
                  autocomplete="off"
                  style={{ width: '100%', borderRadius: '5px' }}
                  value={cpass}
                  onChange={(e) => setcpass(e.target.value)}
                />
                <label for="floatingPassword">Confirm Password</label>
              </div>}
            </div>

            {registerform ? (
              <div className="w-75 align-items-center justify-content-center">
                <Button className="mx-auto mt-3 bn642-hover bn26" onClick={handlechange}>
                  Register
                </Button>
                <h6 className=" text-light mt-2">
                  <span className="text-dark">Already a user ? </span>
                  <Link to={'/login'} >Click here to Login.</Link>
                </h6>
              </div>
            ) : (
              <div className="w-75">
                <Button className="mt-3 mx-auto bn642-hover bn26"  type="submit" onClick={handlelogin}>
                  Login
                </Button>

                <h6 style={{color:"black"}}>
                  New user?
                  <Link to={'/register'} className='light ms-1'>Click here to register.</Link>
                </h6>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Authentication;
