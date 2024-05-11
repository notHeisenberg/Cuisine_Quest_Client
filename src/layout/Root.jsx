import { Outlet, useLocation } from "react-router-dom"
import { StickyNavbar } from '../Pages/Shared/StickyNavbar';
import Footer from '../Pages/Shared/Footer';


const Root = () => {
    const location = useLocation()
    if (location.pathname !== '/') {
        document.title = `Cuisine Quest - ${location.pathname.replace('/', '')}`
    } else {
        document.title = `Cuisine Quest`
    }

    return (
        <>
            <StickyNavbar></StickyNavbar>
            <div className="min-h-[calc(100vh-280px)]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>

        </>
    );
};

export default Root;