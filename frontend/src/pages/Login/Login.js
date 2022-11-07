import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import {useState} from 'react';
import Swal from 'sweetalert2';

//import Cookies from 'universal-cookie';



function Login() {
    const [accountEmail, setAccountEmail] = useState('');
    const [accountPWD, setAccountPWD] = useState('');
    const [errMsg, setErrMsg] = useState('');
    
    // const validation = (values) => {
    //   let errors={};

    //   if(!values.accountEmail){
    //     errors.accountEmail="Email is required."
    //   }
    //   if(values.accountPWD){
    //     errors.accountPWD="Password is required."
    //   }
    //   return errors;
    // }

    function handleSubmit(event){
        event.preventDefault();
        console.log('account email = ', accountEmail);
        console.log('account pwd = ', accountPWD);
        setAccountEmail('');
        setAccountPWD('');
        //setErrors(validation(values));

        axios.post('http://localhost:5000/user/log-in', {
                "account_email": accountEmail,
                "account_pwd": accountPWD
            })
            .then(function (response) {
                console.log(response);
                if(response.data.statuscode == 200){
                    
                    // const cookies = new Cookies();
                    // cookies.set('user_id', response.data.message.user_id);
                    
                    console.log(response.data.message.fullname);
                    console.log(response.data.message.num_users_followed);
                    console.log(response.data.message.num_users_following);
                    console.log(response.data.message.about);
                    console.log(response.data.message.avatar);
                    localStorage.setItem("fullname", response.data.message.fullname);
                    localStorage.setItem("user_id", response.data.message.user_id);
                    localStorage.setItem("num_users_followed", response.data.message.num_users_followed);
                    localStorage.setItem("num_users_following", response.data.message.num_users_following);
                    localStorage.setItem("about", response.data.message.about);
                    localStorage.setItem("avatar", response.data.message.avatar);
                    
                    window.location = "/home";
                }else {
                  console.log(response)
                  Swal.fire({
                      text: 'Wrong email or password',
                      icon: 'error'
                      
                  })
              }

          })
          .catch(function (error) {
              Swal.fire({
                  text: 'error',
                  icon: 'error'
              })
            }
          )
    }
    return (
    
      
                <form onSubmit={handleSubmit}>
                <h3>Sign In </h3>
                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={event => setAccountEmail(event.target.value)}
                    value={accountEmail}
                  />
                  
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={event => setAccountPWD(event.target.value)}
                    value={accountPWD}
                  />
                  
                </div>
                <div className="mb-3">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label className="custom-control-label" htmlFor="customCheck1">
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="submitLogin">
                    Submit
                  </button>
                </div>
                <p className="forgot-password text-right">
                  Forgot <a href="#">password?</a>
                </p>
              </form>
  )
}

export default Login;