import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useParams } from "react-router-dom";
import priceImg from "../../../src/assets/price.png"
import originImg from "../../../src/assets/country.png"
import volumeImg from "../../../src/assets/volume.png"

const ItemDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const { loading } = useContext(AuthContext)

    const { name, image, category, quantity, price, origin, description, purchaseCount, email } = item || {};

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/item-details/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch item details');
                }
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };

        fetchItemDetails();
    }, [id]);

    if (!item) {
        return loading
    }
    return (

        <div className="container mx-auto shadow-xl border-2 border-orange-200 rounded-2xl  p-10 my-5 space-y-2 flex flex-col lg:flex-row lg:h-[500px] gap-4">
            <div className=" lg:w-1/2 ">
                <img src={image} className="lg:w-full h-full rounded-2xl" alt="" />
            </div>
            <div>
                <h1 className="text-3xl font-extrabold ">{name}</h1>
                <h1 className="text-xl font-bold">{category}</h1>
                <h1 className="opacity-80 font-semibold">{description}</h1>


                <div id='info'>
                    <div className="flex justify-between gap-4 m-2 ">
                        <div className="flex gap-4 m-2 ">
                            <div className="flex items-center gap-1">
                                <img src={priceImg} className="w-8" alt="" />
                                <h1>${price}</h1>
                            </div>
                            {
                                item.email ?
                                    <div className="flex items-center gap-1">
                                        Made By:
                                        <h1>{email} </h1>
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                        <div className="flex items-center gap-1">
                            <img src={originImg} className="w-8" alt="" />
                            <h1>{origin}</h1>
                        </div>
                    </div>
                    <Link to={'/'}>
                        <button
                            className="btn btn-warning hover:bg-purple-400 border-none text-black font-bold rounded-full">Purchase
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default ItemDetails;