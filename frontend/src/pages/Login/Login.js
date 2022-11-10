import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';



function Login() {
    const [accountEmail, setAccountEmail] = useState('');
    const [accountPWD, setAccountPWD] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        console.log('account email = ', accountEmail);
        console.log('account pwd = ', accountPWD);
        setAccountEmail('');
        setAccountPWD('');

        axios.post('http://localhost:5000/user/log-in', {
            "account_email": accountEmail,
            "account_pwd": accountPWD
        })
            .then(function (response) {
                console.log(response);
                if (response.data.statuscode == 200) {

                    const cookies = new Cookies();
                    cookies.set('user_id', response.data.message.user_id);
                    
                    localStorage.setItem("fullname", response.data.message.fullname);
                    localStorage.setItem("phone_number", response.data.message.phone_number);
                    localStorage.setItem("address", response.data.message.address);
                    localStorage.setItem("account_pwd", response.data.message.account_pwd);
                    localStorage.setItem("num_users_followed", response.data.message.num_users_followed);
                    localStorage.setItem("num_users_following", response.data.message.num_users_following);
                    localStorage.setItem("about", response.data.message.about);
                    localStorage.setItem("avatar", response.data.message.avatar);

                    window.location = "/";
                } else {
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
        <form className='body'>
            <form onSubmit={handleSubmit}>
                <form className='loginform'>
                    <h3 className="signin-heading">Sign In</h3>
                    <label className="signin-label">Email address</label>
                    <input
                        type="email"
                        className="signin-input"
                        placeholder="Enter email"
                        onChange={event => setAccountEmail(event.target.value)}
                        value={accountEmail} />
                    <label className="signin-label">Password</label>
                    <input
                        type="password"
                        className="signin-input"
                        placeholder="Enter password"
                        onChange={event => setAccountPWD(event.target.value)}
                        value={accountPWD} />
                    <input
                        type="checkbox"
                        //className="signin-input"
                        id="customCheck1" />
                    <label className="check" htmlFor="customCheck1">
                        Remember me
                    </label>
                    <p className="forgot-password text-right"> Forgot <a href="#">password?</a></p>
                    <button className="submitSignup" id="sign_up_btn"> Sign up </button>
                    <button type="submit" className="submitLogin"> Login </button>
                </form>
            </form>
            <img src="https://png.pngtree.com/png-clipart/20210402/ourmid/pngtree-geometric-simple-illustration-abstract-style-png-image_3191301.jpg" class="image" alt="" />
        </form>

    )
}

export default Login;