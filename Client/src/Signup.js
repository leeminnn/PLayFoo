import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./CSS/Login.css";
import axios from './axios';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";

function Signup() {
    const [user, setUser] = useState([]);
    const [password, setPassword] = useState([]);
    const history = useHistory();
  
    function validateForm() {
      return user.length > 0 && password.length > 0;
    }
  
    const { register, handleSubmit } = useForm({
      defaultValues: {
        user_id : user
      }
    });
  
    async function getData() {
      localStorage.setItem("user", user);
      let data = {user_id: user, password: password}
      try{
        const onSubmit =
          await axios({
              method: 'post',
              url: 'http://localhost:5000/user',
              data: data
          })
        if (onSubmit.status == 200){
          history.push(`/home`)
        }
        return onSubmit.status
      }
      catch (err) {
        console.log(err);
      }
    }

    return (
        <body>
            <div className='loginbox' style={{height: '100%', width: '100%',}}>
              <div className='image'>
                <img
                  src="https://playfoo-image.s3.amazonaws.com/PLayFoo.png"
                  style={{marginLeft:'auto', marginRight:'auto', display:'block'}}
                />
                <h2>
                    Create an Account
                </h2>
              </div>
                <div className="Login">
                  <Form onSubmit={handleSubmit(getData)}>
                      <Form.Group size="lg" controlId="email">
                      <Form.Label>User</Form.Label>
                      <Form.Control
                          type="text"
                          value={user}
                          onChange={(e) => setUser(e.target.value)}
                          ref={register}
                      />
                      </Form.Group>
                      <Form.Group size="lg" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                          type="text"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          ref={register}
                      />
                      </Form.Group>
                      <Button block size="lg" type="submit" disabled={!validateForm()}>
                      Sign Up
                      </Button>
                      &nbsp;
                      <Link to={'/'} style={{color:'white'}}>Already have an account? Log in here now!</Link>
                  </Form>
              </div>
          </div>
        </body>
      );
}

export default Signup