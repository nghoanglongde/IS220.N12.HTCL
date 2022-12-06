import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

function Login() {
    const [accountEmail, setAccountEmail] = useState('');
    const [accountPWD, setAccountPWD] = useState('');
    const [errMsg, setErrMsg] = useState('');

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/signup';
        navigate(path);
    }
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


    function handleSubmit(event) {
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
        <div className='background'>
            <div className='body'>
                <div className='Applogin'>
                    <form onSubmit={handleSubmit}>
                        <div className='user'><FontAwesomeIcon icon={faUser} className='iconUser' /></div>
                        <h3 className='signin-heading'> Sign In </h3>
                        <div className='input-form'>
                            <div className="signin-label">

                                <i className='icon'> <FontAwesomeIcon icon={faEnvelope} className='iconEmail-Login' /> </i>
                                <input
                                    type="email"
                                    className="signin-input"
                                    placeholder="Enter email"
                                    onChange={event => setAccountEmail(event.target.value)}
                                    value={accountEmail}
                                    required
                                />
                            </div>
                            <div className="signin-label">

                                <i className='icon'> <FontAwesomeIcon icon={faLock} className='iconLock-Login' /> </i>
                                <input
                                    type="password"
                                    className="signin-input"
                                    placeholder="Enter password"
                                    onChange={event => setAccountPWD(event.target.value)}
                                    value={accountPWD}
                                    required
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
                        </div>
                        <div className='btn-login'>
                            <button type="submit" className="submitLogin">
                                Submit
                            </button>
                        </div>
                        <div className='textcontent'>
                            Or
                        </div>
                        <div className='btn-signup' >
                            <button type="submit" className="submitSignup" onClick={routeChange}>
                                Create new Account
                            </button>
                        </div>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;

