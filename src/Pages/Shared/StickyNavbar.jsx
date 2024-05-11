import { Link, NavLink } from "react-router-dom";
import FancyText from '@carefully-coded/react-text-gradient';
import { AuthContext } from "../../Components/Provider/AuthProvider";
import { useContext, useState } from "react";


export function StickyNavbar() {

    const { user, logout, loading } = useContext(AuthContext)
    const [menuOpen, setMenuOpen] = useState(false);


    const Active = "font-serif btn border-2 border-blue-300 text-blue-400 bg-blue-50 hover:bg-blue-100 font-semibold rounded-xl p-2 text-xl text-light-blue-500"
    const notActive = `flex items-center hover:text-blue-500 transition-colors text-md`

    const themControler = <><label id="theme-controler" className="flex cursor-pointer gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
        <input type="checkbox" value="coffee" className="toggle theme-controller" />
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    </label></>

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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
                                <div className="navbar-end relative ">
                                    {themControler}
                                    <img
                                        src={user?.photoURL}
                                        alt="avatar" size="md" className="btn btn-ghost w-14 h-14 rounded-full border-2 border-indigo-500 p-0.5"
                                        onClick={toggleMenu}
                                    />
                                    {menuOpen && (
                                        <ul
                                            role="menu"
                                            className="absolute top-14 right-4 z-10 flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-slate-200 p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                                        >
                                            {/* My added food items */}
                                            <Link to={'/my-added-items'}>
                                                <button
                                                    role="menuitem"
                                                    className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start btn btn-ghost"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM14 8C14 8.993 13.759 9.929 13.332 10.754L11.808 9.229C12.0362 8.52269 12.0632 7.76679 11.886 7.046L13.448 5.484C13.802 6.249 14 7.1 14 8ZM8.835 11.913L10.415 13.493C9.654 13.8281 8.83149 14.0007 8 14C7.13118 14.0011 6.27257 13.8127 5.484 13.448L7.046 11.886C7.63267 12.0298 8.24426 12.039 8.835 11.913ZM4.158 9.117C3.96121 8.4394 3.94707 7.72182 4.117 7.037L4.037 7.117L2.507 5.584C2.1718 6.34531 1.99913 7.16817 2 8C2 8.954 2.223 9.856 2.619 10.657L4.159 9.117H4.158ZM5.246 2.667C6.09722 2.22702 7.04179 1.99825 8 2C8.954 2 9.856 2.223 10.657 2.619L9.117 4.159C8.34926 3.93538 7.53214 3.94687 6.771 4.192L5.246 2.668V2.667ZM10 8C10 8.53043 9.78929 9.03914 9.41421 9.41421C9.03914 9.78929 8.53043 10 8 10C7.46957 10 6.96086 9.78929 6.58579 9.41421C6.21071 9.03914 6 8.53043 6 8C6 7.46957 6.21071 6.96086 6.58579 6.58579C6.96086 6.21071 7.46957 6 8 6C8.53043 6 9.03914 6.21071 9.41421 6.58579C9.78929 6.96086 10 7.46957 10 8Z" fill="#90A4AE"></path>
                                                    </svg>
                                                    <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                                                        My added items
                                                    </p>
                                                </button>
                                            </Link>

                                            {/* Add a food item */}
                                            <Link to={'/add-item'}>
                                                <button
                                                    role="menuitem"
                                                    className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start btn btn-ghost"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" height="20px" width="20px" fill="">
                                                        {/* Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                                                        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                                    </svg>
                                                    <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                                                        Add a item
                                                    </p>
                                                </button>
                                            </Link>

                                            {/* My ordered food items */}
                                            <Link to={'/ordered-items'}>
                                                <button
                                                    role="menuitem"
                                                    className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start btn btn-ghost"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                        strokeWidth="2"
                                                        className="h-6 w-6 text-gray-900"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 011.5 10.875v-3.75zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 01-1.875-1.875v-8.25zM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 013 18.375v-2.25z"
                                                            clipRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                    <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                                                        My ordered  items
                                                    </p>
                                                </button>
                                            </Link>
                                            {/* Signout button */}
                                            <Link to={'/'}>
                                                <button
                                                    role="menuitem"
                                                    className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start btn btn-ghost"
                                                    onClick={logout}
                                                >
                                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z" fill="#90A4AE"></path>
                                                    </svg>
                                                    <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                                                        Sign Out
                                                    </p>
                                                </button>
                                            </Link>

                                        </ul>
                                    )}
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
