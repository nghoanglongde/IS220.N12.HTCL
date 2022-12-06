
import { Add, Chat, Home, Notifications, Person, Title } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SearchPage.css';
import '../Profile/menuImage.css';
import Cookies from 'universal-cookie';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

function SearchPage() {

    // const [searchParams, setSearchParams]= useSearchParams();
    // const searchTitlePage = searchParams.get('@') || '';
    const { title } = useParams();
    const [searchResultTitle, setSearchResultTitle] =  useState([]);
    const [dataImg, setDataImg] = useState([]);
    const [filterdataImage , setfilterDataImg] = useState([]);
   
    useEffect(()=>{
      
      const resData = async () => {
        const response = await axios.post('http://localhost:5000/post/post-search' ,{search_content:title});
        console.log(response)
       
         setDataImg(response.data.message)
        
    }
    resData();
    },[title]);
    
    console.log(dataImg);
     
    const [model, setModel] = useState(false);
    const [temimgSrc, setTempImgSrc] = useState('');
    const getImg = (imgSrc) => {
        setTempImgSrc(imgSrc);
        setModel(true);
    }
   

    return (
        
     

    <div className="searchPageContainer">
          


        <div className={model ? "model open" : "model"}>
            <img src={temimgSrc} />

        </div>
        <div className="menuImage">
            {dataImg.map((item, index) => {

                return (
                    <div className="pics" key={index} onClick={() => getImg(item.image)}>
                        <img src={item.image} className="imagemenu" />
                    </div>
                )
            })}
        </div>
    </div>


    );
}

export default  SearchPage;
