import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLock, faFileText } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';

//import Cookies from 'universal-cookie';



function Signup() {
    const [fullname, setFullName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [account_email, setAccountEmail] = useState('');
    const [account_pwd, setAccountPWD] = useState('');

    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/login';
        navigate(path);
    }

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
        <div className='background'>
            <div className='body'>
                <div className='Appsignup'>
                    <form onSubmit={handleSubmit}>
                        <div className='info'><FontAwesomeIcon icon={faAddressCard} className='iconInfo' /></div>
                        <h3 className="signup-heading">Sign Up </h3>
                        <div className='signup-form'>
                            <div className="signup-label">
                                <span className='iconName'> <FontAwesomeIcon icon={faFileText} className='icon' /> </span>
                                <input
                                    type="text"
                                    className="signup-input"
                                    placeholder="Enter fullname"
                                    onChange={event => setFullName(event.target.value)}
                                    value={fullname}
                                    required
                                />
                            </div>
                            <div className='signup-label'>
                                <span className='iconPhone'> <FontAwesomeIcon icon={faPhone} className='icon' /> </span>
                                <input
                                    type="text"
                                    className="signup-input"
                                    placeholder="Enter Phonenumber"
                                    onChange={event => setPhoneNumber(event.target.value)}
                                    value={phone_number}
                                />
                            </div>
                            <div className="signup-label">
                                <span className='iconLocation'> <FontAwesomeIcon icon={faLocationDot} className='icon' /> </span>
                                <input
                                    type="text"
                                    className="signup-input"
                                    placeholder="Enter Address"
                                    onChange={event => setAddress(event.target.value)}
                                    value={address}
                                />
                            </div>
                            <div className="signup-label">
                                <span className='iconEmail'> <FontAwesomeIcon icon={faEnvelope} className='icon' /> </span>
                                <input
                                    type="email"
                                    className="signup-input"
                                    placeholder="Enter Email"
                                    onChange={event => setAccountEmail(event.target.value)}
                                    value={account_email}
                                    required
                                />
                            </div>
                            <div className="signup-label">
                                <span className='iconLock'> <FontAwesomeIcon icon={faLock} className='icon' /> </span>
                                <input
                                    type="password"
                                    className="signup-input"
                                    placeholder="Enter password"
                                    onChange={event => setAccountPWD(event.target.value)}
                                    value={account_pwd}
                                    required
                                />
                            </div>
                        </div>
                        <div className='btn-'>
                            <button className="submitSignup" id="sign_up_btn"> Submit </button>
                            <div className='textcontent_su'>
                                Or
                            </div>
                            <button type="submit" className="submitLogin" onClick={routeChange}> Sign in </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;






