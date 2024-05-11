import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">

            <div className="flex flex-col justify-center items-center gap-2 bg-slate-400 shadow-2xl shadow-slate-900 border-2 rounded-3xl w-80  h-96">
                <h1>Oppss....</h1>
                <Link to='/'><Button className="btn btn-info drop-shadow-lg ">Go back</Button></Link>
            </div>
        </div>
    );
};

export default ErrorPage