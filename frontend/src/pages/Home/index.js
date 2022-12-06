
import { Add, Chat, Cookie, Home, Notifications, Person } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import './Home.css';
import '../Profile/menuImage.css';
import CloseIcon from '@mui/icons-material/Close';
import MenuContainer from "./MenuContainer";
import Pin from './Pin';
import Cookies from 'universal-cookie';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function HomePage() {

    const [dataImg, setDataImg] = useState([]);

    useEffect(() => {
        const resData = async () => {
            const response = await axios.get('http://localhost:5000/post/homepage');
            setDataImg(response.data.message);
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

    const getImg = (post_id) => {
        console.log(post_id);
        window.location = "/viewpost/" + post_id;
    }

    return (

        <div className="pageHomeContainer">


        <div className="menuImage">
            {dataImg.map((item, index) => {
                if(item.post_type == 'self_created'){
                    return (
                        <div className="pics" key={index} onClick = {() => getImg(item.post_ref_id)}>
                            <img src={item.image} className="imagemenu" />
                        </div>                     
                    )
                }
            })}
        </div>
    </div>
        
        
        


    );
}

export default HomePage;
