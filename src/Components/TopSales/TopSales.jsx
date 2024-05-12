
import priceImg from "../../../src/assets/price.png"
import volumeImg from "../../../src/assets/volume.png"
import originImg from "../../../src/assets/country.png"
import { Link } from "react-router-dom";


const TopSales = ({ item }) => {
    // console.log(item)

    // const { name, image, category, quantity, price, origin,description,purchaseCount } = item || {};
    const { _id, name, image, category, quantity, price, origin, description } = item || {};

    return (

        <div className="container mx-auto shadow-xl border-2 border-orange-200 rounded-2xl  p-10 mb-3 space-y-2">
            <img src={image} className="w-full h-[300px] rounded-2xl" alt="" />
            <h1 className="text-3xl font-bold ">{name}</h1>
            <h1 className="text-xl font-semibold ">{category}</h1>

            <hr className=" border-gray-600" />

            <div className="flex justify-between gap-4 m-2 ">
                <div className="flex gap-4 m-2 ">
                    {/* <div className="flex items-center gap-1">
                        <img src={volumeImg} className="w-5" alt="" />
                        <h1>{quantity} items</h1>
                    </div> */}
                    <div className="flex items-center gap-1">
                        <img src={priceImg} className="w-5" alt="" />
                        <h1>${price}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <img src={originImg} className="w-8" alt="" />
                    <h1>{origin}</h1>
                </div>
            </div>
            <Link
                to={`/item-details/${_id}`}
            >
                <button
                    className="btn btn-warning hover:bg-purple-400 border-none text-black font-bold rounded-full">View details</button>
            </Link>
        </div>
    )

};

export default TopSales;