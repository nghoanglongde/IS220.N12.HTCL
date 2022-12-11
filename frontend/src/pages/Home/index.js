
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
    let { post_id } = useParams();
    const cookies = new Cookies();
    let cookie = cookies.get('user_id');
    function savePost(post_id, event) {
        if(document.getElementsByTagName("IconButton")){
            event.stopPropagation();
            console.log(post_id)
            
            axios.post('http://localhost:5000/post/save-post', {
                "post_id": post_id,
                "user_save_post_id": cookie
            })
                .then(function (response) {
                    console.log(response);
                    if (response.data.statuscode == 200) {
                        event.stopPropagation();
                        Swal.fire({
                            text: 'Save post success',
                            icon: 'success'
                        })
                    } else {
                        console.log(response)
                        Swal.fire({
                            text: 'Failed to get post detail',
                            icon: 'error'
                        })
                    }

                })
                .catch(function (error) {
                    Swal.fire({
                        text: 'error',
                        icon: 'error'
                    })
                }
                )
        }}
    return (

        <div className="pageHomeContainer">


            <div className="menuImage">
                {dataImg.map((item, index) => {
                    if (item.post_type == 'self_created') {
                        return (

                            <div className="pics" key={index} onClick={() => getImg(item.post_ref_id)}>
                                <img src={item.image} className="imagemenu" />
                                <div className='saveImage'>
                                <IconButton className='save' color="secondary" onClick={(e) => savePost(item.post_ref_id, e)}>
                                    <BookmarkBorderIcon />
                                </IconButton>
                                </div>
                            </div>
                        ) 
                    }
                })}
            </div>
        </div>





    );
}

export default HomePage;
