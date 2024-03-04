import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Arheader from './Arheader';
import { addrecipe } from '../services/allapi';
import Swal from 'sweetalert2';
import Pheader from './Pheader';
import itemimg from '../itempreview.png';

function Addrec() {
  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");
  const [userdetails, setUserDetails] = useState({});
  const [recipedata, setRecipeData] = useState({
    fname: "",
    fimage: "",
    ingredients: "",
    instructions: "",
    foodType: "vegetarian", // New state for food type, default to vegetarian
  });

  useEffect(() => {
    setUserDetails(JSON.parse(sessionStorage.getItem("existinguser")));
  }, []);

  const clearAll = () => {
    setRecipeData({
      fname: "",
      fimage: "",
      ingredients: "",
      instructions: "",
      foodType: "vegetarian", // Reset food type to default (vegetarian)
    });
    setPreview("");
  };

  useEffect(() => {
    if (recipedata.fimage) {
      setPreview(URL.createObjectURL(recipedata.fimage));
    } else {
      setPreview("");
    }
  }, [recipedata.fimage]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const { fname, fimage, ingredients, instructions, foodType } = recipedata;
    if (!fname || !fimage || !ingredients || !instructions) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'Please Fill The Form!',
      });
    } else {
      const currentDateTime = new Date();
      const year = currentDateTime.getFullYear();
      const month = currentDateTime.getMonth() + 1;
      const day = currentDateTime.getDate();
      const rdate = `${day}-${month}-${year}`;

      const reqbody = new FormData();
      reqbody.append("rdate", rdate);
      reqbody.append("uname", userdetails.username);
      reqbody.append("uemail", userdetails.email);
      reqbody.append("profiles", userdetails.profile);
      reqbody.append("fname", fname);
      reqbody.append("fimage", fimage);
      reqbody.append("ingredients", ingredients);
      reqbody.append("instructions", instructions);
      reqbody.append("foodType", foodType); // Include food type in request body

      if (token) {
        const reqheader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        };
        try {
          const result = await addrecipe(reqbody, reqheader);
          if (result.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Recipe Posted',
              text: 'Successfully',
            });
            clearAll();
          } else {
            Swal.fire({
              title: result.response.data,
              icon: 'error',
            });
            console.log(result.response.data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  };

  useEffect(() => {
    setToken(sessionStorage.getItem("token") || "");
  }, []);

  return (
    <>
      <Pheader />
      <Container className='mt-5'>
        <div className='rounded' style={{ border: '2px solid #FF0000', padding: '10px' }}>
          <Row className="mt-2 mb-3" style={{ borderBottom: '2px solid #FF0000' }}>
            <Col xs={12} md={4}>
              <Form.Group controlId="formFoodName" className='mb-3 fs-4'>
                <Form.Label>Food Name</Form.Label>
                <Form.Control type="text" placeholder="Enter food name" value={recipedata.fname} onChange={(e) => setRecipeData({ ...recipedata, fname: e.target.value })} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}>
              <label htmlFor="foodpo">
                <input id="foodpo" type="file" style={{ display: 'none' }} onChange={(e) => setRecipeData({ ...recipedata, fimage: e.target.files[0] })} />
                <img src={preview ? preview : itemimg} className='w-100' style={{ height: "220px" }} alt="" />
              </label>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formIngredients">
                <Form.Label>Ingredients</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Enter ingredients" value={recipedata.ingredients} onChange={(e) => setRecipeData({ ...recipedata, ingredients: e.target.value })} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formInstructions">
                <Form.Label>Instructions</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Enter instructions" value={recipedata.instructions} onChange={(e) => setRecipeData({ ...recipedata, instructions: e.target.value })} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} className="text-center">
              <Form.Check
                inline
                label="Vegetarian"
                type="radio"
                id="vegetarian"
                name="foodType"
                value="vegetarian"
                checked={recipedata.foodType === "vegetarian"}
                onChange={() => setRecipeData({ ...recipedata, foodType: "vegetarian" })}
              />
              <Form.Check
                inline
                label="Non-vegetarian"
                type="radio"
                id="nonvegetarian"
                name="foodType"
                value="nonvegetarian"
                checked={recipedata.foodType === "nonvegetarian"}
                onChange={() => setRecipeData({ ...recipedata, foodType: "nonvegetarian" })}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} className="text-center">
              <Button variant="danger" className="mx-2" onClick={clearAll}>
                Cancel
              </Button>
              <Button variant="primary" className="mx-2" onClick={handleAdd}>
                POST
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Addrec;
