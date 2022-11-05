
import { Add, Chat, Home, Notifications, Person } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import './Home.css';
import MenuContainer from "./MenuContainer";
import Pin from './Pin';
import Cookies from 'universal-cookie';
import axios from 'axios';

function HomePage() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const resData = async () => {
            const response = await axios.get('http://localhost:5000/post/homepage');
            setData(response.data.message)
        }
        resData();
        const allIcon = document.querySelectorAll(".iconContainer");

        function setMenuActive() {
            allIcon.forEach((n) => n.classList.remove("active"));
            this.classList.add("active");
        }

        allIcon.forEach(n => n.addEventListener('click', setMenuActive));
    }, []);
    console.log(data);

    return (
        <div className="App">
            <div className="menuContainer">
                <div className="subMenu">
                    <div>
                        <MenuContainer icon={<Home />} />
                        <MenuContainer icon={<Add />} />
                    </div>
                    <div>
                        <MenuContainer icon={<Notifications />} />
                        <MenuContainer icon={<Chat />} />
                        <MenuContainer icon={<Person />} />
                    </div>
                </div>
            </div>

            <main>

                <div className="mainContainer">
                    {data.map((item, index)=>{
                        const li_size = ['small', 'medium', 'large']
                        const rand_size = Math.floor(Math.random() * li_size.length)
                        return(
                            <Pin pinSize={li_size[rand_size]} data_img={item.image} />
                        )
                    })}
                </div>
            </main>
        </div>
    );
}

export default HomePage;
