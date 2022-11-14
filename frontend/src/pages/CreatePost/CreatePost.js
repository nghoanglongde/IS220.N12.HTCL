import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./CreatePost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

function CreatePost() {
  const [dataCategories, setDataCategories] = useState([]);
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDecription] = useState('');

  useEffect(() => {
    const resData = async () => {
      const response = await axios.get("http://localhost:5000/post/create");
      setDataCategories(response.data.message);
    };
    resData();
  }, []);
  console.log(dataCategories);

  // let cookie = cookies.get('user_id');
  //       console.log(cookie);

  function handleImage(event){
    event.preventDefault();
    console.log('image = ', image);
    console.log('title = ', title);
    console.log('description = ', description);
    setImage('');
    setTitle('');
    setDecription('');

    axios.post('http://localhost:5000/post/create', {
                          "image": image,
                          "title": title,
                          "description": description
            })
            .then(function (response) {
              console.log(response);
              if (response.data.statuscode == 200) {
                 window.location = "/profile";
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
 


  return (
    <div className="form">
      <div class="wrapper">
        <div className="uploadImage">
          <div className="createPost">
            <label>Create Post</label>
          </div>
          <div className="frameImage">
            <div className="imagePost">
              {/* <img src = "https://i.pinimg.com/236x/c5/bb/78/c5bb78ddfc58e8b0e97634369e4b60a0.jpg"></img> */}
            </div>
            <div className="functionPost">
              <FontAwesomeIcon type="file" onChange={(e) =>this.handleImage(e)} icon={faCloudUpload} className="iconButtonCloudUpload"/>
              <div className="imageText">Drop your image here or browse!</div>
            </div>
            <div className="file-name">File name here<i />
            </div>
          </div>
          <input id="default-btn" type="file" hidden></input>
          <button type="submit" id="custom-btn">Save and Post</button>
        </div>
        <div className="imageContent">
          <FontAwesomeIcon icon={faEllipsisV} className="iconButtonEllipsisV" />
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
                <button>{item.category_description}</button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreatePost;
