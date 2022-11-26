
//Layouts
import {HeaderMainpage} from '../Components/Layout';

//page
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Mainpage from "../pages/Mainpage";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup"
import { Settings } from '@mui/icons-material';
import SettingProfile from '../pages/SettingProfile';
import CreatePost from "../pages/CreatePost/CreatePost"
//public routes
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/profile', component:Profile},
    {path: '/settingprofile', component:SettingProfile },
    {path: '/mainpage', component:Mainpage, layout:HeaderMainpage},
    {path: '/login', component:Login , layout:HeaderMainpage},
    {path: '/signup', component:Signup , layout:HeaderMainpage},
    {path: '/post', component:CreatePost },
]

//private routes
const privateRoutes = [
    
]

export { publicRoutes,privateRoutes}