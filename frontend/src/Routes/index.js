
//Layouts
import {HeaderMainpage} from '../Components/Layout';

//page
import HomePage from "../pages/Home/index"
import Profile from "../pages/Profile";
import Mainpage from "../pages/Mainpage";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup"
import { Settings } from '@mui/icons-material';
import SettingProfile from '../pages/SettingProfile';
import CreatePost from "../pages/CreatePost/CreatePost"
import SearchPage from '../pages/SearchPage';
import Post from "../pages/Post/Post";

//public routes
const publicRoutes = [
    {path: '/login', component:Login},
    {path: '/', component:HomePage},
    {path: '/profile', component:Profile},
    {path: '/settingprofile', component:SettingProfile },
    {path: '/search/:title', component:SearchPage },
    {path: '/mainpage', component:Mainpage, layout:HeaderMainpage},
    {path: '/signup', component:Signup , layout:HeaderMainpage},
    {path: '/post', component:CreatePost },
    {path: '/viewpost/:post_id', component:Post },
]

//private routes
const privateRoutes = [
    
]

export { publicRoutes,privateRoutes}