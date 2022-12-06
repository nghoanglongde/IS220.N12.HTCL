
import { Add, Chat, Home, Notifications, Person } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import './Home.css';
import '../Profile/menuImage.css';

import MenuContainer from "./MenuContainer";
import Pin from './Pin';
import Cookies from 'universal-cookie';
import axios from 'axios';

function HomePage() {

    // const [dataImg, setDataImg] = useState([]);
    // useEffect(() => {
    //     const cookies = new Cookies();
    //     let cookie = cookies.get('user_id');
    //     console.log(cookie);
    //     const resData = async () => {
    //         const response = await axios.post('http://localhost:5000/user/view-profile',
    //             {
    //                 "user_id": cookie
    //             });
    //         setDataImg(response.data.message)
    //     }
    //     resData();
    // }, []);
    // console.log(dataImg);

    // const [model, setModel] = useState(false);
    // const [temimgSrc, setTempImgSrc] = useState('');
    // const getImg = (imgSrc) => {
    //     setTempImgSrc(imgSrc);
    //     setModel(true);
    // }

    const [dataImg, setDataImg] = useState([]);
    useEffect(() => {
        const resData = async () => {
            const response = await axios.get('http://localhost:5000/post/homepage');
            setDataImg(response.data.message)
            
        }
        resData();
        const allIcon = document.querySelectorAll(".iconContainer");

        function setMenuActive() {
            allIcon.forEach((n) => n.classList.remove("active"));
            this.classList.add("active");
        }

        allIcon.forEach(n => n.addEventListener('click', setMenuActive));
    }, []);
    console.log(dataImg);
    const [model, setModel] = useState(false);
    const [temimgSrc, setTempImgSrc] = useState('');
    const getImg = (imgSrc) => {
        setTempImgSrc(imgSrc);
        setModel(true);
    }

    return (
        // <div className="App">
        //     <main>

        //         <div className="mainContainer">
        //             {data.map((item, index)=>{
        //                 const li_size = ['small', 'medium', 'large']
        //                 const rand_size = Math.floor(Math.random() * li_size.length)
        //                 return(
        //                     <Pin pinSize={li_size[rand_size]} data_img={item.image} />
        //                 )
        //             })}
        //         </div>
        //     </main>
        // </div>

        /*--------------------------------------------------------------------------------*/

        <div className="pageHomeContainer">

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

export default HomePage;
