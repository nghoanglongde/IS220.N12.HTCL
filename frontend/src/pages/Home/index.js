
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


    // await axios.post('http://localhost:5000/post/save-post', {
    //     "user_save_post_id": cookie,
    //     "post_id": post_id,
    // })
    //     .then(function (response) {
    //         console.log(response);
    //         if (response.data.statuscode == 200) {
    //             Swal.fire({
    //                 text: 'Save post success',
    //                 icon: 'success',
    //             });
    //         } else {
    //             console.log(response)
    //             Swal.fire({
    //                 text: 'Error when save post to database',
    //                 icon: "error"
    //             })
    //         }
    //     })
    //     .catch(function (error) {
    //         Swal.fire({
    //             text: 'Error when save post to database',
    //             icon: "error"
    //         })
    //     }
    //     )




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

            <div className="menuImage">
                {dataImg.map((item, index) => {
                    if (item.post_type == 'self_created') {
                        return (
                            <div className="pics" key={index} onClick={() => getImg(item.image)}>
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
