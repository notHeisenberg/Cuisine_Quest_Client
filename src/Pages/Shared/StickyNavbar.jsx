import { Link, NavLink } from "react-router-dom";
import FancyText from '@carefully-coded/react-text-gradient';
import { AuthContext } from "../../Components/Provider/AuthProvider";
import { useContext } from "react";
import { Avatar, Tooltip } from "@material-tailwind/react";

export function StickyNavbar() {

    const { user, logout, loading } = useContext(AuthContext)



    const Active = "font-serif btn border-2 border-blue-300 text-blue-400 bg-blue-50 hover:bg-blue-100 font-semibold rounded-xl p-2 text-xl text-light-blue-500"
    const notActive = `flex items-center hover:text-blue-500 transition-colors text-md`

    const themControler = <><label id="theme-controler" className="flex cursor-pointer gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
        <input type="checkbox" value="coffee" className="toggle theme-controller" />
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    </label></>

    const listItems = <>
        <li ><NavLink className={({ isActive }) =>
            isActive
                ? Active
                : notActive
        } to={"/"} >Home</NavLink></li>
        <li ><NavLink className={({ isActive }) =>
            isActive
                ? Active
                : notActive
        } to={"/all-foods"} >All Foods</NavLink></li>

        {user && <li ><NavLink className={({ isActive }) =>
            isActive
                ? Active
                : notActive
        } to={"/gallery"} >Gallery</NavLink></li>}


        {
            user &&
            <li ><NavLink className={({ isActive }) =>
                isActive
                    ? Active
                    : notActive
            } to={"/my-items"} >My Items</NavLink></li>
        }

    </>

    return (

        <>
            {
                loading ?
                    <div className=" text-center">
                        <span className="loading loading-dots w-8 text-primary"></span>
                        <span className="loading loading-dots w-12 text-secondary"></span>
                        <span className="loading loading-dots w-16 text-accent"></span>
                        <span className="loading loading-dots w-20 text-info"></span>
                    </div>
                    :
                    <div className="navbar h-[90px] sticky top-0 z-10 shadow-lg"
                    >
                        <div className="navbar-start">
                            <div className="dropdown dropdown-hover">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow w-52 bg-transparent ">
                                    {listItems}
                                </ul>
                            </div>
                            <Link to={'/'}>
                                <FancyText
                                    gradient={{ from: '#4A00FF', to: '#00D7C0', type: 'linear' }}
                                    animate
                                    animateDuration={500}
                                    className="animate__animated animate__zoomInRight text-2xl mr-4 h-20 p-5 lg:h-auto cursor-pointer  font-bold btn btn-ghost"
                                >
                                    Cuisine Quest
                                </FancyText>
                            </Link>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className=" flex justify-center items-center gap-4 px-1">
                                {listItems}
                            </ul>
                        </div>
                        {
                            user ?
                                <div className="navbar-end">
                                    {themControler}
                                    <Tooltip
                                        content={user?.displayName}
                                        className="border z-20 border-blue-200 text-blue-500 font-semibold bg-slate-200 p-2 drop-shadow-lg"
                                        animate={{
                                            mount: { scale: 1, y: 0 },
                                            unmount: { scale: 0, y: 25 },
                                        }}
                                    >
                                        <Avatar src={user?.photoURL} alt="avatar" size="md" className="btn btn-ghost w-12 rounded-full border-2 border-blue-300 p-0.5" />

                                    </Tooltip>
                                    <Link to={'/'} className="btn btn-sm btn-outline text-red-500" on onClick={logout} to="/">Logout</Link>
                                </div>
                                :
                                <div className="navbar-end">
                                    {themControler}
                                    <Link to={"/login"} className="btn btn-sm btn-primary mr-2 ">Login</Link>
                                    <Link to={"/signup"} className="btn btn-sm btn-accent">Signup</Link>
                                </div>
                        }
                    </div >
            }



        </>


    );
}
