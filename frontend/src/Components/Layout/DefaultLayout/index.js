import Header from './Header';
import Sidebar from './Sidebar';
import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function DefaultLayout({children}) {
    return (
        <div>
            <Header/>    
            <div className="container">
                <Sidebar/>
                <div className="content">  {children} </div>
            </div>  
        </div>
    );
}

export default DefaultLayout;