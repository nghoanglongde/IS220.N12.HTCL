import styles from './Header.css';

import ImageData from '../../../../assets/images/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass,faSpinner,faCircleXmark, faBell } from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Search from '../../Components/Search';








function Header() {

   
    const navigate = useNavigate();
   
    return (


    <header className='wrapperHeader'>
      <div className='innerHeader'>
        <div className='innerHeaderContainer'>
          <div className='buttonLogoHeader'>

            <div className='logoHeader'>
               <a href='/' className='buttonLogoHeader' >
                <img src={ImageData[0]} alt="logotl" className='logotl' />
                </a>
            </div>
            <div className='ContainerButtonHeader'>
              <button  className="buttonHeader buttonHome" onClick = {() =>{navigate("/");}}>
                      
                       <span >Home</span>
              </button>
            </div>
            <div className='ContainerButtonHeader'>
              <button className="buttonHeader buttonCreate">
    
                        <span onClick = {() =>{navigate("/post");}}>Create</span>
                        
              </button>
            </div>
          </div>
         {/* <div className='searchboxContianer'>
        
          
         </div> */}
          <Search/>
          <div className='actionsHeader'>
              <div className='ContainerButtonHeader'>
                <button className='buttonRightHeader'>
                <FontAwesomeIcon icon={faBell} className="ButtonNotificationIcon"/>
                </button>
              </div>
              
              <div className='ContainerButtonHeader'>
                <button className='buttonRightHeader' onClick = {() =>{navigate("/profile");}} >
                <img src={localStorage.getItem("avatar")}alt="avatar" className='avatarButtonHeader'
               />
                </button>
              </div>
              <div className='ContainerButtonHeader' onClick = {() =>{navigate("/settingprofile");}}>
                              <button className='buttonRightHeader'>
                              <FontAwesomeIcon icon={faAngleDown} className="ButtonNotificationIcon"   />
                              </button>
                            </div>
          </div>

              
        </div>
          

      </div>
       

       

    </header>
    )  ;
    
    
    
    
}

export default Header;