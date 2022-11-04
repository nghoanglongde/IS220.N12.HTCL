import "./Profile.css";
import "./menuImage.css";
import {  useEffect, useState } from "react";
import axios from "axios";




function Profile() {
    const [dataImg, setDataImg] = useState([]);
    useEffect(() => {
        const resData = async () => { 
            const response = await axios.post('http://localhost:5000/user/view-profile',
                {
                    "user_id": "634bc0f651cde90ded939af3"
                });
            setDataImg(response.data.message)
        }
        resData();
    }, []);
    console.log(dataImg)


    let data =[
        {
            id:1,
            imgSrc:"https://i.pinimg.com/474x/da/67/20/da6720a11861f4270de07a2783635bd6.jpg",
        },
        {
            id:2,
            imgSrc:"https://i.pinimg.com/474x/9e/65/a3/9e65a36516af9e1a2cb731feda534bde.jpg",
        },
        

        {
            id:3,
            imgSrc:"https://i.pinimg.com/474x/c1/d2/c6/c1d2c6d35b5f87810f3972e3d7bf894f.jpg",

        },
        {
            id:4,
            imgSrc:"https://i.pinimg.com/474x/b6/48/4c/b6484ca31c5e40a76702b191ecea2548.jpg",
        },
        {
            id:5,
            imgSrc:"https://i.pinimg.com/474x/dd/07/2c/dd072cc8ae9f37bcb17b1ce36ea83db0.jpg",
        },
        {
            id:6,
            imgSrc:"https://i.pinimg.com/474x/5c/c3/f2/5cc3f24546966bef19d45e2e56a8db2b.jpg",
        },
        

        {
            id:7,
            imgSrc:"https://i.pinimg.com/474x/9c/c1/9f/9cc19fbf7300a393fa459de8de3353d2.jpg",

        },
        {
            id:8,
            imgSrc:"https://i.pinimg.com/474x/35/78/70/35787019bf53be64436256c8c37b874b.jpg",
        },
        {
            id:9,
            imgSrc:"https://i.pinimg.com/474x/e5/88/ed/e588edf7b1b8e9e385c27b643075b264.jpg",

        },
        {
            id:10,
            imgSrc:"https://i.pinimg.com/474x/a7/fe/a5/a7fea55377535abde43cea06b23d0ff7.jpg",
        },
        


    ]
    const [model, setModel] = useState(false);
    const [temimgSrc, setTempImgSrc] = useState('');
    const getImg = (imgSrc) =>{
       setTempImgSrc(imgSrc);
       setModel(true);
    }

    return(
    <div className="pageProfileContainer"> 

        <div className="profileContainer">
            <div className="userContainer">
                <img src ="https://i.pinimg.com/564x/84/f4/f4/84f4f42e07f9a7bcc3e18eeca0fef237.jpg" className="userAvatar" /> 
            </div>
            
            <div className="usernameContainer"> 
                
                    <h1 className="username" >Ngọc Thành Bùi</h1>  
                
                <div className="bd colorbd">
                    <span>@nbi1830</span>
                </div>
                        
            </div>  
            <div className="bd"><span>0 following</span></div>
            <div className="buttonPFContainer">
                <button className="button button1">
                    Share
                </button>
                <button className="button button1">
                    Edit profile
                </button>
            </div>
        </div>
       
        <div className="buttonPFContainer">
                <button className="button button2">
                    Created
                </button>
                <button className="button button2">
                    Saved
                </button>
         </div>
         <div className={model? "model open": "model"}>
                    <img src = {temimgSrc} />
                    
         </div>
         <div className="menuImage">
            {data.map((item, index)=>{
                return(
                    <div className="pics" key={index} onClick={() => getImg(item.imgSrc)}>
                        <img src={item.imgSrc} className="imagemenu"/>
                        


                    </div>
                )


            })

            }

         </div> 

        
    </div>
     );
}

export default Profile;
