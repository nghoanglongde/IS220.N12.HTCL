import { Fragment } from 'react';
import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {publicRoutes} from './Routes';
import {DefaultLayout} from './Components/Layout';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Cookies from 'universal-cookie';
import Login from './pages/Login/Login';

import { useState } from 'react';


function App() {

  const [User, setUser] = useState(() => {
    const cookies = new Cookies();
    let cookie = cookies.get('user_id');
    return cookie ? { have_cookie: true } : { have_cookie: false }
  })
  return ( 
    <Router>
      <div className="App">
        <Routes>
          
          {publicRoutes.map((route, index) =>{
            const Page = User.have_cookie ? route.component : Login 
            // const Page = route.component 
            let Layout = DefaultLayout
            if (route.layout){
              Layout = route.layout
            }
            else if(route.layout === null){
              Layout=Fragment
            }
            
            if(!User.have_cookie && route.path === '/'){
              Layout=Fragment
            }
            return <Route key={index} path={ route.path } element={
                    <Layout>
                      <Page/>
                    </Layout>
                  }/>
          })} 
        </Routes>
      </div>
    </Router>
   );
}
export default App;