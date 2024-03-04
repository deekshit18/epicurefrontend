import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Accordion, Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { allrecipe, deleterecipe } from '../services/allapi';
import { BASEURL } from '../services/baseurl';
import Message from '../components/Message';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { isadmincontext } from '../context/Contextshare';
import Adminside from '../components/Adminside';
import Pheader from '../components/Pheader';
import nopro from '../noprof.png';
import backg from "../back2.jpg";
import empty from "../empty.png";

function Items() {
  const { isadminres, setisadminres } = useContext(isadmincontext);

  const [allrecipes, setAllrecipes] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [istoken, setIstoken] = useState(false);
  const [filter, setFilter] = useState(null); // State for filtering (null for all, "vegetarian", "nonvegetarian")

  const [userprofiles, setUserprofiles] = useState({
    username: "",
    email: ""
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 50,
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  const getuserprofile = async () => {
    const token = JSON.parse(sessionStorage.getItem("existinguser"));
    setUserprofiles({ ...userprofiles, username: token.username, email: token.email });
  };

  useEffect(() => {
    getuserprofile();
  }, []);

  const getallrecipe = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqheader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const result = await allrecipe(searchkey, reqheader);
      if (result.status === 200) {
        setAllrecipes(result.data);
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
    getallrecipe();
  };

  useEffect(() => {
    getallrecipe();
  }, [searchkey]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIstoken(true);
    }
  }, []);

  const filterRecipes = (type) => {
    setFilter(type);
  };

  const isVegetarian = (recipe) => {
    return recipe.foodType === "vegetarian";
  };

  return (
    <div className='xr' style={{ backgroundImage: `url(${backg})`, minHeight: "100vh" }}>
      {isadminres ? <Adminside /> : <Pheader />}
      <Row className='mb-5 '>
        <Col md={4}></Col>
        <Col md={4}>
          <form className="d-flex mt-3 container" data-aos="slide-down">
            <input className="form-control w-100" type="search" placeholder="Search" value={searchkey} onChange={e => setSearchkey(e.target.value)} />
          </form>
        </Col>
        <Col md={4}>
          <Dropdown className='mt-3' as={ButtonGroup}>
            <Button variant="secondary">Filter</Button>
            <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => filterRecipes(null)}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => filterRecipes("vegetarian")}>Vegetarian</Dropdown.Item>
              <Dropdown.Item onClick={() => filterRecipes("nonvegetarian")}>Non-vegetarian</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row className="justify-content-center m-3 ">
        {allrecipes?.length > 0 ? allrecipes.filter(recipe => filter === null || (filter === "vegetarian" && isVegetarian(recipe)) || (filter === "nonvegetarian" && !isVegetarian(recipe))).map((item) => (
          <Col data-aos="zoom-in" md={3} key={item._id} className='rounded m-4 bg-light' style={{
            border: '4px solid #0099ff',
            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
          }}>
            {/* Profile Section */}
            <Row className='mb-2' style={{ borderBottom: '4px solid #0099ff', background: "#0099ff", color: "red" }}>
              <Col md={12} className='mb-2 mt-2 d-flex align-items-center '>
                <img
                  src={item.profiles ? `${BASEURL}/uploads/${item.profiles}` : nopro}
                  alt="Profile Photo"
                  className="img-fluid rounded-circle"
                  style={{ border: '2px solid white', width: "60px", height: "60px" }}
                />
                <div className='ms-4'>
                  <h3 className='text-light'>{item.uname}</h3>
                  <span className='text-light'>{item.uemail}</span>
                </div>
              </Col>
            </Row>

            {/* Recipe Image */}
            <Row className=' '>
              <Col md={12} className='w-100'>
                <img src={item ? `${BASEURL}/uploads/${item.fimage}` : "https://i.ytimg.com/vi/YamhG-BXbss/maxresdefault.jpg"} alt="Image" style={{ height: "220px" }} className=" w-100" />
              </Col>
            </Row>

            {/* Recipe Details */}
            <Row className='mt-2'>
              <Col md={12}>
                <h3 className='' style={{ color: "#0099ff" }}>{item.fname}</h3>
                {isVegetarian(item) ? <span className="badge bg-success rounded-pill">Veg</span> : <span className="badge bg-danger rounded-pill">Non-veg</span>}
              </Col>
            </Row>

            {/* Accordion for Ingredients */}
            <Accordion className="mt-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Ingredients</Accordion.Header>
                <Accordion.Body>
                  <strong>{item.ingredients}</strong>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* Accordion for Instructions */}
            <Accordion className="mt-3 mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Instructions</Accordion.Header>
                <Accordion.Body>
                  <strong>{item.instructions}</strong>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* Message Component */}
            <Row className='justify-content-center bottom-end m-1 ' style={{ bottom: 0 }}>
              {isadminres ?
                <button className="noselect dltbut p-2 " onClick={() => handledelete(item._id)}>
                  <span class="text">Delete</span>
                  <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                    </svg>
                  </span>
                </button>
                : <Message resp={item.uemail} usp={userprofiles} />}
            </Row>
          </Col>
        )) : <div>{
          istoken ? <div className='text-center'><p className='text-light fs-4'>Sorry, no such recipes are currently available!</p>
            <img src={empty} style={{ width: "300px" }} alt="" /></div> : <p className='fs-3 text-danger'>Please login to view more recipes</p>
        }</div>}
      </Row>
    </div>
  );
}

export default Items;
