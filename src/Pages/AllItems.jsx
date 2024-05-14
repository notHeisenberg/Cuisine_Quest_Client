import { Link, useLoaderData } from "react-router-dom";
import priceImg from "../../src/assets/price.png"
import volumeImg from "../../src/assets/volume.png";
import { useEffect, useState } from "react";
import axios from "axios";


const AllItems = () => {
    const items = useLoaderData()
    // const [searchBy, setSearchBy] = useState(null)
    const [searchResults, setSearchResults] = useState([]);



    // useEffect(() => {
    //     if (searchBy !== null || searchBy !== undefined) {
    //         const response = axios.get(`https://cuisine-quest-server.vercel.app/items/${searchBy}`)
    //         console.log(response.data)
    //         setSearchResults(response.data)
    //     }
    // }, [searchBy])
    // console.log(searchBy)
    const handleSearch = (e) => {
        // console.log(e.target.value)
        if (e.keyCode == 13) {

            const searchby = e.target.value
            axios.get(`https://cuisine-quest-server.vercel.app/items/item/${searchby}`)
                .then(res =>
                    setSearchResults(res.data))
                .catch(err => {
                    console.error(err);
                    setSearchResults([]);
                });
            // setSearchResults(res.data)
            e.target.value = ""
        }
    }



    const handleClear = (e) => {
        const inputField = e.target.parentElement.querySelector('input');
        inputField.value = ""
    }
    const handleSearchIcon = (e) => {
        const inputField = e.target.parentElement.querySelector('input');

        const searchby = inputField.value
        axios.get(`https://cuisine-quest-server.vercel.app/item/${searchby}`)
            .then(res =>
                setSearchResults(res.data))
            .catch(err => {
                console.error(err);
                setSearchResults([]);
            });
        inputField.value = ""
    }

    const banner = <>
        <div className="hero h-[600px] mb-5" style={{ backgroundImage: 'url(https://i.ibb.co/cwnf55f/all-items-banner.jpg)' }}>
            <div className="hero-overlay bg-opacity-60 "></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className=" mb-5 text-5xl text-orange-400 opacity-90 font-bold">Cuisine Quest</h1>
                    <h1 className=" text-xl">
                        <Link to={'/'}>
                            <span className="btn btn-ghost text-green-400 font-bold text-xl">Home </span>
                        </Link>
                        | All Foods
                    </h1>
                </div>
            </div>
        </div></>

    const search = <>
        <label className="input input-warning border-2 flex items-center gap-2 container mx-auto">
            <input onKeyUp={handleSearch} type="text" className="grow text-orange-500 font-bold uppercase" placeholder="Search" />
            <img onClick={handleClear} className=" w-7 h-7 rounded-lg  opacity-50 bg-red-100 hover:opacity-100 " src="https://img.icons8.com/ios-glyphs/30/multiply.png" alt="multiply" />
            <svg onClick={handleSearchIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 opacity-70 hover:opacity-100 hover:h-8 hover:w-8 text-orange-500"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>
    </>

    return (
        <div className="space-y-4">
            {banner}
            {search}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container mx-auto">

                {(searchResults.length > 0 ? searchResults : items).map((item) => (

                    <div key={item._id} className="card h-[600px] glass shadow-lg shadow-orange-200">
                        <figure className="h-1/2 p-4 hover:p-0 hover:shadow-xl shadow-orange-400"><img src={item.image} className="w-full h-full rounded-lg hover:shadow-xl shadow-orange-400" alt="car!" /></figure>
                        <div className="h-1/2 p-4 border rounded-sm border-warning border-t-0 ">
                            <h2 className="card-title">{item.name}</h2>
                            <h2 className="font-semibold mb-2">{item.category}</h2>
                            <div className="flex justify-between mb-4">
                                <div className="flex items-center gap-1 text-xl font-bold">
                                    <img src={priceImg} className="w-8" alt="" />
                                    <h1>${item.price}</h1>
                                </div>
                                <div className="flex items-center gap-1 text-xl font-bold">
                                    <img src={volumeImg} className="w-8" alt="" />
                                    <h1>{item.quantity} items</h1>
                                </div>
                            </div>
                            <div className="card-actions justify-start">
                                <Link
                                    to={`/item-details/${item._id}`}
                                >
                                    <button className="btn btn-warning">View details</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                ))
                }
            </div>
            <div className={searchResults.length > 0 ? `text-center  ` : `text-center hidden`}>
                <button onClick={() => setSearchResults([])} className="btn btn-warning ">View All Items</button>
            </div>
        </div>
    );
};

export default AllItems;