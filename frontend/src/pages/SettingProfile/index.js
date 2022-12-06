import "./SettingProfile.css";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import { faEye,faCameraRotate, faCamera, faGear } from '@fortawesome/free-solid-svg-icons';
import { Input } from "@mui/material";

function SettingProfile() {



    const [avatar, setAvatar] = useState()
    const [fullname, setFullname] = useState()
    const [about, setAbout] = useState()
    const [phone_number, setPhoneNumber] = useState()
    const [address, setAddress] = useState()
    const [password, setPassword] = useState()

    useEffect(() => {
        return() =>{
         avatar && URL.revokeObjectURL(avatar.preview)
        }

    }, [avatar])

    const handlePreviewAvatar = (e) =>{
        const file =e.target.files[0]
        file.preview=URL.createObjectURL(file)
        
        setAvatar(file)
    }
    // const inputpw = document.querySelector(".inputPw");
    // const eyeopen = document.querySelector(".eyeOpen");
    // const eyeclose = document.querySelector(".eyeClose");
    // eyeopen.addEventListener("click", function(){
    // eyeopen.classList.add("hidden");
    // eyeclose.classList.remove("hidden");
    // inputpw.setAttribute("type", "text");
    // })

    async function handleApi(){
        const formData = new FormData()
        formData.append('img', avatar)
        const cookies = new Cookies();
        let cookie = cookies.get('user_id');
        
        console.log(fullname)
        formData.append('data', JSON.stringify({
          user_id: cookie,
          fullname: fullname === undefined ? localStorage.getItem("fullname") : fullname,
          about: about === undefined ? localStorage.getItem("about") : about,
          phone_number: phone_number === undefined ? localStorage.getItem("phone_number") : phone_number,
          address: address === undefined ? localStorage.getItem("address") : address,
          avatar: localStorage.getItem("avatar"),
          account_pwd: localStorage.getItem("account_pwd")
        }))
        console.log(formData)
        Swal.fire({
            title: 'Uploading...',
            html: 'Please wait...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });

    
        await axios.post('http://localhost:5000/user/edit-profile', formData)
                .then(function (response) {
                  console.log(response);
                  if (response.data.statuscode == 200) {
                    localStorage.setItem("fullname", response.data.message.fullname);
                    localStorage.setItem("phone_number", response.data.message.phone_number);
                    localStorage.setItem("address", response.data.message.address);
                    localStorage.setItem("account_pwd", response.data.message.account_pwd);
                    localStorage.setItem("about", response.data.message.about);
                    localStorage.setItem("avatar", response.data.message.avatar);
                     window.location = "/profile";
                } else {
                    console.log(response)
                    Swal.fire({
                        text: 'Error when updated user'
                    })
                }
                })
                .catch(function (error) {
                  Swal.fire({
                      text: 'error'
                  })
                }
              )
    
        
      }
    



    return (

        <div className="containerSettingPF">

            <div className="containerBoxSetting">
                <div className="settingPFBox">
                    <div className="titleSettingPF">
                        
                        <h4>
                            <span className="h3TitleSetiingPF">Setting profile</span>
                        </h4>
                    </div>
                    <div className="infoSettingPF">
                    <div className="avatarSettingPF">   
                   <div className="avatarContainer"> 
                   {!avatar &&(
                    <img src={localStorage.getItem("avatar")}className="avatarChange" />
                   )
                   }
                   {avatar &&(
                    <img src={avatar.preview} className="avatarChange" />
                   )
                   }
                   
                   </div>
                    
                    
                     {/* <button className='buttonIconCamera'>
                     
                    </button> */}
                    <div className="ContainerButtonChange">
                        <label for="changeava" className="buttonChange buttonchangeImage">
                       
                        <FontAwesomeIcon icon={faCameraRotate} className='iconCamera'/>
                    </label>
                    <input type="file" name="" id="changeava" onChange={handlePreviewAvatar} style={{display:"none" , visibility:"none" }}/>
                    </div>
                    </div>
                    <div className="formSetting">
                    <div className="containerInputSetting">
                        
                        <div className="dataInputSetting">
                            <input  id ="fullname" type="text" required onChange={event => setFullname(event.target.value)} defaultValue={localStorage.getItem("fullname")}/>
                            <div className="underline"></div>
                            <label className="labelSettingPF" >Full name</label>
                        </div>
                        
                    </div>
                    <div className="containerInputSetting">
                        
                        <div className="dataInputSetting">
                            <input id="phonenumber"  type="text" required onChange={event => setPhoneNumber(event.target.value)} defaultValue={localStorage.getItem("phone_number")}/>
                            <div className="underline"></div>
                            <label className="labelSettingPF" >Phone number</label>
                        </div>
                        
                    </div>
                    <div className="containerInputSetting">
                        
                        <div className="dataInputSetting">
                            <input id="address" type="text" required onChange={event => setAddress(event.target.value)} defaultValue={localStorage.getItem("address")} />
                            <div className="underline"></div>
                            <label className="labelSettingPF" >Address</label>
                        </div>
                    </div>       
                    <div className="containerInputSetting">
                        
                        <div className="dataInputSetting">
                            <input id="password" className="inputPw" type="password" required onChange={event => setAddress(event.target.value)} defaultValue={localStorage.getItem("account_pwd")} />
                            <button className="eyeBtn"><FontAwesomeIcon icon={faEye} className='eyeIcon'/></button>
                            <div className="underline"></div>
                            <label className="labelSettingPF" >Password</label>
                        </div>
                    </div>    
                    </div>
                    </div>
                    <div className="infoSettingPFAbout">                   
                                <textarea name="about" placeholder="Tell your story" className="textareaAbout" onChange={event => setAbout(event.target.value)} defaultValue={localStorage.getItem("about")}></textarea>
                    </div>
                        <div className='BoxbuttonSettingPF'>
                                <div className='ContainerButtonSettingPF'>
                                <button className="buttonSettingPF buttonReset">                   
                                   <span>Reset</span>                            
                                 </button>
                               </div>
                                <div className='ContainerButtonSettingPFContainerButtonSettingPF'>
                                <button className="buttonSettingPF buttonSave"  onClick={handleApi}>
                                        <span> Save</span>
                                </button>
                                </div>
                                
                            </div>
                    
                </div>
            </div>
        </div>
    );
}

export default SettingProfile;