import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import { useState } from 'react';
import Swal from 'sweetalert2';

//import Cookies from 'universal-cookie';



function Signup() {
    const [fullname, setFullName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [account_email, setAccountEmail] = useState('');
    const [account_pwd, setAccountPWD] = useState('');


    function handleSubmit(event) {
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

        <form className='body'>
            <form onSubmit={handleSubmit}>
                <form className='signupform'>
                    <h3 className="signup-heading">Sign Up </h3>

                    <label className="signup-label">Full Name</label>
                    <input
                        type="text"
                        className="signup-input"
                        placeholder="Enter fullname"
                        onChange={event => setFullName(event.target.value)}
                        value={fullname}
                        required
                    />
                    <label className="signup-label">Phone Number</label>
                    <input
                        type="text"
                        className="signup-input"
                        placeholder="Enter Phonenumber"
                        onChange={event => setPhoneNumber(event.target.value)}
                        value={phone_number}
                    />
                    <label className="signup-label">Address</label>
                    <input
                        type="text"
                        className="signup-input"
                        placeholder="Enter Address"
                        onChange={event => setAddress(event.target.value)}
                        value={address}

                    />
                    <label className="signup-label">Email address</label>
                    <input
                        type="email"
                        className="signup-input"
                        placeholder="Enter Email"
                        onChange={event => setAccountEmail(event.target.value)}
                        value={account_email}
                        required
                    />
                    <label className="signup-label">Password</label>
                    <input
                        type="password"
                        className="signup-input"
                        placeholder="Enter password"
                        onChange={event => setAccountPWD(event.target.value)}
                        value={account_pwd}
                        required
                    />
                    <button type="submit" className="submitLogin"> Sign in </button>
                    <button className="submitSignup" id="sign_up_btn"> Sign up </button>
                </form>
            </form>
        </form>
    )
}

export default Signup;






