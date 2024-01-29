import React from 'react';
import icon from '../recipes.png';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Sidebar from './Sidebar';

function Rheader() {
  // const [showOffcanvas, setShowOffcanvas] = useState(false);

  // const handleToggle = () => {
  //   setShowOffcanvas(!showOffcanvas);
  // };

  return (
    <>
      <Navbar style={{ backgroundColor: "#FFD700" }} className="d-flex justify-content-center recbg">

      <Sidebar/>

        <Container>
          <Navbar.Brand className='mx-auto' href="#">
            <img
              alt="Logo"
              src={icon}
              width="100%"
              height="70"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>        </Container>

          {/* <Button variant="outline-light" onClick={handleToggle} className="me-2">
            Toggle
          </Button> */}
      </Navbar>

      
    </>
  );
}

export default Rheader;
