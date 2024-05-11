import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from "../Pages/Home/Home";


import Login from '../Pages/Login/Login';
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from '../Routes/PrivateRoute';
import AllItems from "../Pages/AllItems";
import Gallery from "../Components/Gallery/Gallery";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: () => fetch('https://art-craft-store-server-eta.vercel.app/crafts')
            },
            {
                path: "/all-foods",
                element: <AllItems></AllItems>
            },
            {
                path: "/gallery",
                element: <PrivateRoute><Gallery></Gallery></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },

        ]
    },
]);

export default router;