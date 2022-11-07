
//Layouts
import {HeaderMainpage} from '../Components/Layout';

//page
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Mainpage from "../pages/Mainpage";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup"

//public routes
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/profile', component:Profile},
    {path: '/mainpage', component:Mainpage, layout:HeaderMainpage},
    {path: '/login', component:Login},
    {path: '/signup', component:Signup},
]

//private routes
const privateRoutes = [
    
]

export { publicRoutes,privateRoutes}