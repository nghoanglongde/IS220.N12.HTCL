import "./Profile.css";
import "./menuImage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';



function Profile() {
    const [dataImg, setDataImg] = useState([]);
    useEffect(() => {
        const cookies = new Cookies();
        let cookie = cookies.get('user_id');
        console.log(cookie);
        const resData = async () => {
            const response = await axios.post('http://localhost:5000/user/view-profile',
                {
                    "user_id": cookie
                });
            setDataImg(response.data.message)
        }
        resData();
    }, []);
    console.log(dataImg);

    const [model, setModel] = useState(false);
    const [temimgSrc, setTempImgSrc] = useState('');
    const getImg = (imgSrc) => {
        setTempImgSrc(imgSrc);
        setModel(true);
    }

    // const [userImg, setUserImg] = useState();
    // setUserImge(localstorage.get('image'))

    return (
        <div className="pageProfileContainer">

            <div className="profileContainer">
                <div className="userContainer">
                    <img src="https://i.pinimg.com/564x/84/f4/f4/84f4f42e07f9a7bcc3e18eeca0fef237.jpg" className="userAvatar" />
                </div>

                <div className="usernameContainer">

                    <h1 className="username" >Ngọc Thành Bùi</h1>

                    <div className="bd colorbd">
                        <span>@nbi1830</span>
                    </div>

                </div>
                <div className="bd"><span>0 following</span></div>
                <div className="buttonPFContainer">
                    <div className="ContainerButton">
                        <button className="buttonProfile button1">
                            <div className="textButton">Share</div>
                        </button>
                    </div>
                    <div className="ContainerButton">
                        <button className="buttonProfile button1">
                        <div className="textButton">Edit profile</div>
                    </button>
                    </div>
                    
                </div>
            </div>

            <div className="buttonPFContainer">
                <div className="ContainerButton">
                    <button className="buttonProfile button2">
                        <div className="textButton">Created</div>
                    </button>
                </div>
                <div className="ContainerButton">
                    <button className="buttonProfile button2">
                        <div className="textButton">Saved</div>
                    </button>
                </div>
            </div>
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

export default Profile;
