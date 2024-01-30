import React, { useEffect, useState } from 'react';
import { Button, Offcanvas, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { BASEURL } from '../services/baseurl';
import nopro from '../noprof.png'
import backg from "../back2.jpg";

function Sidebar() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [userdetails, setuserdetails] = useState({});

  const handleToggle = () => {
    setShowOffcanvas(!showOffcanvas);
  };
  useEffect(() => {
    setuserdetails(JSON.parse(sessionStorage.getItem("existinguser")));
  }, []);
  return (
    <>
      <Button variant="outline-light" onClick={handleToggle} className="bn54 ms-3">
        <i className="fa-solid fa-list"></i>
      </Button>

      <Offcanvas show={showOffcanvas} onHide={handleToggle} style={{backgroundImage: `url(${backg})`}}>
        <Offcanvas.Header className='' closeButton>
          <Offcanvas.Title>EPICUREHUB</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* User Profile */}
          <div className="text-center text-light">
            <Link className='text-light' to="/profile">
              <Image
                src={userdetails.profile ? `${BASEURL}/uploads/${userdetails.profile}` : nopro}
                alt="Profile"
                roundedCircle
                className=""
                style={{ width: "120px", height: "120px" }}
              />
            </Link>
            <div>
              <strong className='text-dark'>{userdetails.username}</strong>
            </div>
            <div className="text-dark">{userdetails.email}</div>
          </div>

          {/* Navigation Links with hr */}
          <Link
            className=''
            to="/"
            onClick={handleToggle}
            style={{ color: 'black', textDecoration: 'none' }}
            onMouseOver={(e) => e.target.style.color = '#ffffff'}
            onMouseOut={(e) => e.target.style.color = 'black'}
          >
            <div className="mb-2">Home</div>
          </Link>
          <hr />

          <Link
            className=''
            to="/profile"
            onClick={handleToggle}
            style={{ color: 'black', textDecoration: 'none' }}
            onMouseOver={(e) => e.target.style.color = '#ffffff'}
            onMouseOut={(e) => e.target.style.color = 'black'}
          >
            <div className="mb-2">Profile</div>
          </Link>
          <hr />

          <Link
            className=''
            to="/items"
            onClick={handleToggle}
            style={{ color: 'black', textDecoration: 'none' }}
            onMouseOver={(e) => e.target.style.color = '#ffffff'}
            onMouseOut={(e) => e.target.style.color = 'black'}
          >
            <div className="mb-2">Recipes</div>
          </Link>
          <hr />

          <Link
            className=''
            to="/addrecipe"
            onClick={handleToggle}
            style={{ color: 'black', textDecoration: 'none' }}
            onMouseOver={(e) => e.target.style.color = '#FFffff'}
            onMouseOut={(e) => e.target.style.color = 'black'}
          >
            <div className="mb-2">Post Recipes</div>
          </Link>
          <hr />

          <Link
            className=''
            to="/mesg"
            onClick={handleToggle}
            style={{ color: 'black', textDecoration: 'none' }}
            onMouseOver={(e) => e.target.style.color = '#FFffff'}
            onMouseOut={(e) => e.target.style.color = 'black'}
          >
            <div className="mb-2">Message</div>
          </Link>
          <hr />
          <Link
            className=''
            to="/forgot"
            onClick={handleToggle}
            style={{ color: 'black', textDecoration: 'none' }}
            onMouseOver={(e) => e.target.style.color = '#FFffff'}
            onMouseOut={(e) => e.target.style.color = 'black'}
          >
            <div className="mb-2">Change Password</div>
          </Link>
          <hr />
          {/* Logout Button */}
          <div className='text-center'>
            <Logout />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
