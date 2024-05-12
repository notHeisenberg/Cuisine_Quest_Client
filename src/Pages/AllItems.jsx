import { Link } from "react-router-dom";


const AllItems = () => {

    const banner = <>
        <div className="hero h-[600px] " style={{ backgroundImage: 'url(https://i.ibb.co/cwnf55f/all-items-banner.jpg)' }}>
            <div className="hero-overlay bg-opacity-60 "></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className=" mb-5 text-5xl text-orange-400 opacity-90 font-bold">Cuisine Quest</h1>
                    <h1 className=" text-xl">
                        <Link to={'/'}>
                            <span className="text-sky-500 font-bold text-xl">Home </span>
                        </Link>
                        | All Foods
                    </h1>
                </div>
            </div>
        </div></>

    return (
        <div>
            {banner}
            this is all items
        </div>
    );
};

export default AllItems;