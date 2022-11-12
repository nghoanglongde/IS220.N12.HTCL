import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import {useState} from 'react';
import Swal from 'sweetalert2';

//import Cookies from 'universal-cookie';



function Signup() {
    const [fullname, setFullName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [account_email, setAccountEmail] = useState('');
    const [account_pwd, setAccountPWD] = useState('');
    
    
    function handleSubmit(event){
        event.preventDefault();
        console.log('fullname = ', fullname);
        console.log('phone_number = ', phone_number);
        console.log('address = ', address);
        console.log('account_email = ', account_email);
        console.log('account_pwd = ', account_pwd);
        setFullName('');
        setPhoneNumber('');
        setAddress('');
        setAccountEmail('');
        setAccountPWD('');
       

        axios.post('http://localhost:5000/user/sign-up', {
                          "fullname": fullname,
                          "phone_number": phone_number,
                          "address": address,
                          "account_email": account_email,
                          "account_pwd": account_pwd
            })
            .then(function (response) {
                console.log(response);
                if (response.data.statuscode == 200) {
                   window.location = "/login";
              } else {
                  console.log(response)
                  Swal.fire({
                      text: 'Account already existed',
                      icon: 'error',
                      confirmButtonText: 'OK'
                  })
              }

          })
          .catch(function (error) {
              Swal.fire({
                  text: 'error',
                  icon: 'error',
                  confirmButtonText: 'OK'
              })
            }
          )
    }

    return (
    
      
                <form onSubmit={handleSubmit}>
                <h3>Sign Up </h3>
                <div className="mb-3">
                   <label>Full Name</label>
                   <input
                      type="text"
                      className="form-control"
                      placeholder="Enter fullname"
                      onChange={event => setFullName(event.target.value)}
                      value={fullname}
                  />
                </div>
                <div className="mb-3">
                   <label>Phone Number</label>
                   <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Phonenumber"
                    onChange={event => setPhoneNumber(event.target.value)}
                    value={phone_number}
                  />
                  
                </div>
                <div className="mb-3">
                   <label>Address</label>
                   <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Address"
                    onChange={event => setAddress(event.target.value)}
                    value={address}
                  />
                  
                </div>
                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter address"
                    onChange={event => setAccountEmail(event.target.value)}
                    value={account_email}
                  />
                  
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={event => setAccountPWD(event.target.value)}
                    value={account_pwd}
                  />
                  
                </div>
                
                <div className="d-grid">
                  <button type="submit" className="buttonSignup">
                    Submit
                  </button>
                </div>
              </form>
  )
}

export default Signup;






