import "./SettingProfile.css";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import { faCamera, faGear } from '@fortawesome/free-solid-svg-icons';
import { Input } from "@mui/material";

function SettingProfile() {
    return (

        <div className="containerSettingPF">

            <div className="containerBoxSetting">
                <div className="settingPFBox">
                    <div className="titleSettingPF">
                        
                        <h4><FontAwesomeIcon icon={faGear} className='iconSetting'/>
                            
                            <span className="h3TitleSetiingPF">Setting profile</span>
                        </h4>
                    </div>
                    <div className="infoSettingPF">
                    <div className="avatarSettingPF">   
                   <div className="avatarContainer"> <img src="https://i.pinimg.com/474x/21/e2/c6/21e2c62dbab6dbd638213d49229f4690.jpg" className="avatarChange" /></div>
                     <button className='buttonIconCamera'>
                     <FontAwesomeIcon icon={faCamera} className='iconCamera'/>
                    </button>
                    </div>
                    <div className="formSetting">
                    <div className="containerInputSetting">
                        <label for="lname"> Name</label>
                        <div className="">
                        <input id="lastname" class="inputSetingPF" type="text" placeholder=" Name" />
        
                        </div>
                    </div>
                    <div className="containerInputSetting">
                        <label for="lname"> Email</label>
                        <div className="">
                        <input id="lastname" class="inputSetingPF" type="text" placeholder=" Email" />
        
                        </div>
                    </div>
    
                    <div className="containerInputSetting">
                        <label for="lname"> Phone Number</label>
                        <div className="">
                        <input id="lastname" class="inputSetingPF" type="text" placeholder=" Phone Number" />
        
                        </div>
                    </div>
                    <div className="containerInputSetting">
                        <label for="lname"> Address</label>
                        <div className="">
                        <input id="lastname" class="inputSetingPF" type="text" placeholder="Address " />
        
                        </div>
                    </div>
                    <div className="containerInputSetting">
                        <label for="lname"> About</label>
                        <div className="">
                        <input id="lastname" class="inputSetingPF" type="text" placeholder=" Tell your story" />
        
                        </div>
                    </div>
                    
                    
                    
    
                    </div>
    
    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingProfile;