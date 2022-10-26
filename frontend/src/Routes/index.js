import Home from "../pages/Home";
import Profile from "../pages/Profile";


//public routes
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/profile', component:Profile}

]
//private routes
const privateRoutes = [

]

export { publicRoutes,privateRoutes}