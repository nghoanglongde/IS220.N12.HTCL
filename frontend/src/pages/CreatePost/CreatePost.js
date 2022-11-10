import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./CreatePost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

function CreatePost() {
  const [dataCategories, setDataCategories] = useState([]);
  useEffect(() => {
    const resData = async () => {
      const response = await axios.get("http://localhost:5000/post/create");
      setDataCategories(response.data.message);
    };
    resData();
  }, []);
  console.log(dataCategories);

  return (
    <div className="form">
      <div class="wrapper">
        <div className="uploadImage">
          {" "}
          {/* contener*/}
          <div className="createPost">
            <label>Create Post</label>
          </div>
          <div className="frameImage">
            {/* wrapper*/}
            <div className="imagePost">
              {/* <img src = "https://i.pinimg.com/236x/c5/bb/78/c5bb78ddfc58e8b0e97634369e4b60a0.jpg"></img> */}
            </div>
            <div className="functionPost">
              <FontAwesomeIcon
                icon={faCloudUpload}
                className="iconButtonCloudUpload"
              />
              <div className="imageText">Drop your image here or browse!</div>
            </div>
            <div className="file-name">
              Save and Post
              <i />
            </div>
          </div>
          <input id="default-btn" type="file" hidden></input>
          <button id="custom-btn">choose a file</button>
        </div>
        <div className="imageContent">
          <FontAwesomeIcon icon={faEllipsisV} className="iconButtonEllipsisV" />
          <div className="addTitle">
            <input type="text" required></input>
            <div className="line"></div>
            <label>Add your title..</label>
          </div>
          <h2>Description</h2>
          <div className="contentDescription">
            <input type="text" required></input>
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
