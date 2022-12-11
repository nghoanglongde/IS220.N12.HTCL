import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./CreatePost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { IconButton } from "@mui/icons-material";

function CreatePost() {
    const [dataCategories, setDataCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDecription] = useState('');
    const [image, setImage] = useState('');
    const[preview, setPreview] = useState('');
    const [category_id, setCategoryId] = useState('');
    
    useEffect(() => {
        if(image){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setPreview(reader.result);
            }
            reader.readAsDataURL(image);
        }else{
            setPreview(null);
        }
    },[image]);

    useEffect(() => {
        const resData = async () => {
            const response = await axios.get("http://localhost:5000/post/create");
            setDataCategories(response.data.message);
        };
        resData();
    }, []);
    console.log(dataCategories);

    function handleImage(event) {
        if (event.target.files && event.target.files.length > 0) {
            setImage(event.target.files[0])
            setImage.type.substr(0, 5 === "image")
        }

    }

    async function handleApi() {
        const formData = new FormData()
        formData.append('img', image)
        const cookies = new Cookies();
        let cookie = cookies.get('user_id');
        console.log('title = ', title);
        console.log('description = ', description);

        formData.append('data', JSON.stringify({
            user_id: cookie,
            categories_id: [category_id],
            title: title,
            description: description
        }))
        console.log(formData);
        Swal.fire({
            title: 'Uploading...',
            html: 'Please wait...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
        
        
        await axios.post('http://localhost:5000/post/create', formData)
            .then(function (response) {
                console.log(response);
                if (response.data.statuscode == 200) {
                    setCategoryId(response.data.message.category_id)
                    window.location = "/";
                } else {
                    console.log(response)
                    Swal.fire({
                        text: 'Error when uploading image to cloudinary',
                        text: 'Error when insert new post to database'
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
    const [state,setState] = useState(false);
    function clicka(index){
        setState(state => !state);
        setCategoryId(response.data.message.category_id);
    }
    let toggleClassCheck = state ? ' blackcolor':'';

    return (
        <div className="CreatePost">
            <div className="form">
                <div class="wrapper">
                    <div className="createPost">
                        <label>Create Post</label>
                    </div>
                    <div className="uploadImage">
                        <div className="frameImage">
                            <div className="functionPost">
                                <div className="cloudUpLoad">
                                    <button>
                                        <FontAwesomeIcon icon={faCloudUpload} className="iconButtonCloudUpload" />
                                    </button>
                                    <input type="file" onChange={handleImage} accept="image/*" />
                                </div>
                                <div className="imageText">Click here to upload your image!</div>
                            </div>
                            <img src= {preview} style = {{objectFit: "cover"}} />
                        </div>
                        <FontAwesomeIcon icon={faTrash} onClick ={() =>{ setImage(null);}} className = "deleteImg"/>
                        <button type="submit" id="custom-btn" onClick={handleApi}>Save and Post</button>
                    </div>
                </div>
                <div className="imageContent">
                    <div className="addTitle">
                        <input type="text" onChange={event => setTitle(event.target.value)} value={title} required></input>
                        <div className="line"></div>
                        <label>Add your title..</label>
                    </div>
                    <h2>Description</h2>
                    <div className="contentDescription">
                        <input type="text" onChange={event => setDecription(event.target.value)} value={description} required></input>
                        <div className="lineD"></div>
                        <label>Tell everyone what your description is about..</label>
                    </div>
                    <div className="option">
                        {dataCategories.map((item, index) => {
                            return (
                                <button 
                                        classname = 'catergory'
                                        // className = {`catergory${toggleClassCheck}`} 
                                        key={index} 
                                        // onClick={() =>clicka(index)}
                                    >{item.category_description}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CreatePost;
