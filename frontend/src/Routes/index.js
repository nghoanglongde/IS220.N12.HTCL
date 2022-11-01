
//Layouts
import {HeaderMainpage} from '../Components/Layout';

//page
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Mainpage from "../pages/Mainpage";


//public routes
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/profile', component:Profile},
    {path: '/mainpage', component:Mainpage, layout:HeaderMainpage},

]
//private routes
const privateRoutes = [

]

export { publicRoutes,privateRoutes}