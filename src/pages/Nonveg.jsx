import React, { useEffect, useState } from 'react';
import { Row, Col, Accordion, Form } from 'react-bootstrap'; // Import Form from react-bootstrap
import { allrecipe } from '../services/allapi';
import { BASEURL } from '../services/baseurl';
import nopro from '../noprof.png';
import backg from "../back2.jpg";
import Message from '../components/Message';
import Pheader from '../components/Pheader';

function Nonveg() {
  const [userprofiles, setUserprofiles] = useState({
    username: "",
    email: ""
  });
  const [recipes, setRecipes] = useState([]);
  const [searchKey, setSearchKey] = useState(""); // State for search input

  const getuserprofile = async () => {
    const token = JSON.parse(sessionStorage.getItem("existinguser"));
    setUserprofiles({ ...userprofiles, username: token.username, email: token.email });
  };

  useEffect(() => {
    getuserprofile();
  }, []);

  useEffect(() => {
    getRecipes();
  }, [searchKey]); // Trigger getRecipes on searchKey change

  const getRecipes = async () => {
    const token = sessionStorage.getItem("token");
    const reqheader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const result = await allrecipe(searchKey, reqheader); // Pass searchKey to allrecipe function
    if (result.status === 200) {
      const nonvegRecipes = result.data.filter(recipe => recipe.foodType === "nonvegetarian");
      setRecipes(nonvegRecipes);
    }
  };

  return (
    <div className='xr' style={{ backgroundImage: `url(${backg})`, minHeight: "100vh" }}>
      <Pheader/>
      <Row className="justify-content-center m-3 ">
        <Col md={4}>
          <Form className="mt-3">
            <Form.Control 
              type="text" 
              placeholder="Search Non-veg recipes" 
              value={searchKey} 
              onChange={(e) => setSearchKey(e.target.value)} // Update searchKey state on change
            />
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center m-3 ">
        {recipes.map((recipe) => (
          <Col md={3} key={recipe._id} className='rounded m-4 bg-light' style={{
            border: '4px solid #0099ff',
            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
          }}>
            {/* Profile Section */}
            <Row className='mb-2' style={{ borderBottom: '4px solid #0099ff', background: "#0099ff", color: "red" }}>
              <Col md={12} className='mb-2 mt-2 d-flex align-items-center '>
                <img
                  src={recipe.profiles ? `${BASEURL}/uploads/${recipe.profiles}` : nopro}
                  alt="Profile Photo"
                  className="img-fluid rounded-circle"
                  style={{ border: '2px solid white', width: "60px", height: "60px" }}
                />
                <div className='ms-4'>
                  <h3 className='text-light'>{recipe.uname}</h3>
                  <span className='text-light'>{recipe.uemail}</span>
                </div>
              </Col>
            </Row>

            {/* Recipe Image */}
            <Row className=' '>
              <Col md={12} className='w-100'>
                <img src={recipe ? `${BASEURL}/uploads/${recipe.fimage}` : "https://i.ytimg.com/vi/YamhG-BXbss/maxresdefault.jpg"} alt="Image" style={{ height: "220px" }} className=" w-100" />
              </Col>
            </Row>

            {/* Recipe Details */}
            <Row className='mt-2'>
              <Col md={12}>
                <h3 className='' style={{ color: "#0099ff" }}>{recipe.fname}</h3>
                <span className="badge bg-danger rounded-pill">Non-Veg</span>
              </Col>
            </Row>

            {/* Accordion for Ingredients */}
            <Accordion className="mt-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Ingredients</Accordion.Header>
                <Accordion.Body>
                  <strong>{recipe.ingredients}</strong>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* Accordion for Instructions */}
            <Accordion className="mt-3 mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Instructions</Accordion.Header>
                <Accordion.Body>
                  <strong>{recipe.instructions}</strong>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* Message Component */}
            <Row className='justify-content-center bottom-end m-1 ' style={{ bottom: 0 }}>
              <Message resp={recipe.uemail} usp={userprofiles} />
            </Row>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Nonveg;
