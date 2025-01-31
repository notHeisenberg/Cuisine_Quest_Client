import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from "../Pages/Home/Home";


import Login from '../Pages/Login/Login';
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from '../Routes/PrivateRoute';
import AllItems from "../Pages/AllItems";
import Gallery from "../Components/Gallery/Gallery";
import FoodPurchase from "../Components/FoodPurchase/FoodPurchase";
import MyAddedItems from "../Components/MyAddedItems/MyAddedItems";
import AddItems from "../Components/AddItems/AddItems";
import OrderedItems from "../Components/OrderedItems/OrderedItems";
import ItemDetails from "../Components/ItemDetails/ItemDetails";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
                loader: () => fetch('https://cuisine-quest-server.vercel.app/items')
            },
            {
                path: `/item-details/:id`,
                element: <ItemDetails></ItemDetails>,
            },
            {
                path: "/all-foods",
                element: <AllItems></AllItems>,
                loader: () => fetch('https://cuisine-quest-server.vercel.app/items')

            },
            {
                path: "/gallery",
                element: <PrivateRoute><Gallery></Gallery></PrivateRoute>
            },
            {
                path: "/food-purchase/:id",
                element: <PrivateRoute><FoodPurchase></FoodPurchase></PrivateRoute>,
                loader: ({ params }) => fetch(`https://cuisine-quest-server.vercel.app/item/${params.id}`)
            },
            {
                path: "/my-added-items",
                element: <PrivateRoute><MyAddedItems></MyAddedItems></PrivateRoute>
            },
            {
                path: "/add-item",
                element: <PrivateRoute><AddItems></AddItems></PrivateRoute>
            },
            {
                path: "/ordered-items/:id",
                element: <PrivateRoute><OrderedItems></OrderedItems></PrivateRoute>,
                // loader: ({ params }) => fetch(`https://cuisine-quest-server.vercel.app/purchases/${params.id}`, { credentials: "include" })
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