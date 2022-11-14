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
                   <div className="avatarContainer"> <img src="https://i.pinimg.com/564x/74/0d/0e/740d0e1ebf06dab777428226ce3d8e76.jpg" className="avatarChange" /></div>
                     <button className='buttonIconCamera'>
                     <FontAwesomeIcon icon={faCamera} className='iconCamera'/>
                    </button>
                    </div>
                    <div className="formSetting">
                    <div className="containerInputSetting">
                        
                        <div className="dataInputSetting">
                            <input  id ="fullname" type="text" required value="Bùi Ngọc Thành"  />
                            <div className="underline"></div>
                            <label className="labelSettingPF" >Full name</label>
                        </div>
                        
                    </div>
                    <div className="containerInputSetting">
                        
                        <div className="dataInputSetting">
                            <input id="phonenumber"  type="text" required value="079878999" />
                            <div className="underline"></div>
                            <label className="labelSettingPF" >Phone number</label>
                        </div>
                        
                    </div>
                    <div className="containerInputSetting">
                        
                        <div className="dataInputSetting">
                            <input id="address" type="text" required value="Seoul, Hàn Quốc" />
                            <div className="underline"></div>
                            <label className="labelSettingPF" >Address</label>
                        </div>
                        
                    </div>
                    <div className="containerInputSetting">
                        
                        <div className="dataInputSetting">
                            <input  type="text" required  >
                            </input>
                            <div className="underline"></div>
                            <label className="labelSettingPF"> About</label>
                        </div>
                        
                    </div>
                    <div className='BoxbuttonSettingPF'>
                            <div className='ContainerButtonSettingPF'>
                            <button className="buttonSettingPF buttonReset">
                                                
                               <span>Reset</span>
                                                                    
                             </button>
                           </div>
                            <div className='ContainerButtonSettingPFContainerButtonSettingPF'>
                            <button className="buttonSettingPF buttonSave">
                                    <span> Save</span>
                            </button>
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