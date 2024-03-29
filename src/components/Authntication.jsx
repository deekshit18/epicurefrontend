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
  const [cpass, setcpass] = useState('');
  const [userdata, setUserdata] = useState({
    username: '',
    email: '',
    password: '',
    type:"user"
  });
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const registerform = reg ? true : false;

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const isUsernameValid = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

  const handlechange = async (e) => {
    e.preventDefault();
    const { username, email, password } = userdata;
    if (!isUsernameValid(username) || !isEmailValid(email) || !isPasswordValid(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input!',
        text: 'Please enter valid details.',
      });
    } else if (password !== cpass) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Passwords do not match! Please ensure they are identical.',
      });
    } else {
      const result = await registerAPI(userdata);
      if (result.status === 200) {
        // Swal.fire({
        //   icon: 'success',
        //   title: `Hello, ${result.response.data.name}! You have successfully logged in to EpicureHub`,
        //   text: 'Enjoy your culinary journey!',
        // }); 


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
    }
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    setTouchedInputs({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    const { email, password } = userdata;
    if (!isEmailValid(email) || !isPasswordValid(password)) {
      Swal.fire({
        icon: 'info',
        title: 'Invalid Input!',
        text: 'Please enter valid details.',
      });
    } else {
      const result = await loginAPI(userdata);
      if (result.status === 200) {
        Swal.fire({
          icon: 'success',
          title: `Hello, ${result.data.existinguser.username}! `,
          text: 'You have successfully logged in to EpicureHub',
        });         setistokenres(true);
        // Store data
        sessionStorage.setItem('existinguser', JSON.stringify(result.data.existinguser));
        sessionStorage.setItem('token', result.data.token);
        // Reset state
        setUserdata({
          email: '',
          password: '',
        });
        setcpass('');
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
    backgroundImage: 'linear-gradient(180deg,#04e2f7, #1448d8)',
  };
  const [touchedInputs, setTouchedInputs] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="regbg d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Container fluid className="d-flex align-items-center justify-content-center">
        <Row className="container w-100 p-3" style={boxStyle}>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            {registerform ? (
              <Image style={{ width: '100%' }} src={register} alt="Image" />
            ) : (
              <Image src={login} alt="Image" fluid />
            )}
          </Col>

          <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-dark">EPICUREHUB</h1>
            <h6 className="text-light">{registerform ? 'Sign Up to your Account' : 'Sign into Account'}<i class="fa-solid fa-eye justify-content-center text-dark ms-2" onClick={togglePasswordVisibility} ></i></h6>

            <div className="form-group w-75">
              {registerform && (
                <>
                  <div className={`form-floating mb-3 ${touchedInputs.username && !isUsernameValid(userdata.username) ? 'focused' : ''}`}>
                    <input
                      type="text"
                      className={`form-control ${(!isUsernameValid(userdata.username) && touchedInputs.username) ? 'is-invalid' : ''}`}
                      id="floatingInput"
                      placeholder="Username"
                      style={{ width: '100%', borderRadius: '5px' }}
                      value={userdata.username}
                      onChange={(e) => setUserdata({ ...userdata, username: e.target.value })}
                      onFocus={() => setTouchedInputs({ ...touchedInputs, username: true })}
                    />

                    <label htmlFor="floatingInput">Username</label>
                    {(touchedInputs.username && !isUsernameValid(userdata.username)) && (
                      <div className="invalid-feedback">Username must be alphanumeric, 3-20 characters.</div>
                    )}
                  </div>
                </>
              )}

              <div className={`form-floating mb-3 ${touchedInputs.email && !isEmailValid(userdata.email) ? 'focused' : ''}`}>
                <input
                  type="email"
                  className={`form-control ${(!isEmailValid(userdata.email) && touchedInputs.email) ? 'is-invalid' : ''}`}
                  id="floatingInput"
                  placeholder="name@example.com"
                  style={{ width: '100%', borderRadius: '5px' }}
                  value={userdata.email}
                  onChange={(e) => setUserdata({ ...userdata, email: e.target.value })}
                  onFocus={() => setTouchedInputs({ ...touchedInputs, email: true })}
                />
                <label htmlFor="floatingInput">Email address</label>
                {(touchedInputs.email && !isEmailValid(userdata.email)) && (
                  <div className="invalid-feedback">Enter a valid email address.</div>
                )}
              </div>

              <div className={`form-floating mb-3 ${touchedInputs.password && !isPasswordValid(userdata.password) ? 'focused' : ''}`}>
                <input
                  type={passwordVisible ? "text" : "password"} 
                  className={`form-control ${(!isPasswordValid(userdata.password) && touchedInputs.password) ? 'is-invalid' : ''}`}
                  id="floatingPassword"
                  placeholder="Password"
                  autoComplete="off"
                  style={{ width: '100%', borderRadius: '5px' }}
                  value={userdata.password}
                  onChange={(e) => setUserdata({ ...userdata, password: e.target.value })}
                  onFocus={() => setTouchedInputs({ ...touchedInputs, password: true })}
                />

                <label htmlFor="floatingPassword">Password</label>
                {(touchedInputs.password && !isPasswordValid(userdata.password)) && (
                  <div className="invalid-feedback">
                    Password must be at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.
                  </div>
                )}
              </div>

              {registerform && (
                <div className={`form-floating ${touchedInputs.confirmPassword && userdata.password !== cpass ? 'focused' : ''}`}>
                  <input
                    type={passwordVisible ? "text" : "password"} 
                    className={`form-control ${userdata.password !== cpass && touchedInputs.confirmPassword ? 'is-invalid' : ''}`}
                    id="floatingPassword"
                    placeholder="Confirm Password"
                    autoComplete="off"
                    style={{ width: '100%', borderRadius: '5px' }}
                    value={cpass}
                    onChange={(e) => setcpass(e.target.value)}
                    onFocus={() => setTouchedInputs({ ...touchedInputs, confirmPassword: true })}
                  />
                  <label htmlFor="floatingPassword">Confirm Password</label>
                  {userdata.password !== cpass && touchedInputs.confirmPassword && (
                    <div className="invalid-feedback">Passwords do not match.</div>
                  )}
                </div>
              )}
            </div>

            {registerform ? (
              <div className="w-75 align-items-center justify-content-center">
                <Button className="mx-auto mt-3 bn642-hover bn26" onClick={handlechange}>
                  Register
                </Button>
                <h6 className="text-light mt-2">
                  <span className="text-dark">Already a user ? </span>
                  <Link to={'/login'} className='text-light'>Click here to Login.</Link>
                </h6>
              </div>
            ) : (
              <div className="w-75">
                <Button className="mt-3 mx-auto bn642-hover bn26" type="submit" onClick={handlelogin}>
                  Login
                </Button>

                <h6 style={{ color: 'black' }}>
                  New user?
                  <Link to={'/register'} className="text-light ms-1">
                    Click here to register.
                  </Link>
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