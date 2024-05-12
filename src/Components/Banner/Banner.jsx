import { Link } from "react-router-dom";

const Banner = () => {

    return (
        <div className="hero container mx-auto h-[600px] rounded-2xl mt-5" style={{ backgroundImage: "url(https://i.ibb.co/G9p09zs/banner.jpg)", backgroundRepeat: "no-repeat" }}>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-prose space-x-4 text-white">
                    <h1 className="mb-5 text-4xl font-bold"> "Embark on a Culinary Adventure: <span className='text-orange-300'>Cuisine Quest</span>"</h1>
                    <p className="mb-5 opacity-80">
                        Experience a culinary odyssey with Cuisine Quest. Explore diverse recipes, cooking tips, and global flavors. Your passport to gastronomic delight awaits!
                    </p>
                    <Link to={'/all-foods'}>
                        <button className="btn btn-warning border-none  hover:bg-purple-400 font-bold rounded-full">Explore Now</button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Banner;