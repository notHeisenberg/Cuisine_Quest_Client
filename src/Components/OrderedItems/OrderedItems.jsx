import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";


const OrderedItems = () => {
    const myPurchase = useLoaderData()
    const [purchases, setPurchases] = useState([]);
    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (myPurchase.length) {
            setPurchases(myPurchase);
        }
    }, [myPurchase]);

    const handleDelete = (itemId) => {


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`https://cuisine-quest-server.vercel.app/orders/${user.email}/items/${itemId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            setPurchases(prevPurchases => prevPurchases.filter(purchase => purchase._id !== itemId))
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your  has been deleted.",
                                icon: "success",
                                timer: 2000
                            })
                        }
                    })
            }
        });


    }

    // console.log(myPurchase)
    return (

        <div className="overflow-x-auto">
            {
                purchases.length ?
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-warning ">
                                <th></th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Purchase Time</th>
                                <th>Food ownwr</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 2 */}
                            {

                                purchases?.map(purchase =>
                                    <tr key={purchase._id} className="hover ">
                                        <th><img src={purchase.image} className="w-24 h-24 rounded-full p-1 hover:p-4 " alt="" /></th>
                                        <td className="text-xl font-bold text-orange-500">{purchase.name}</td>
                                        <td className="text-lg font-bold">${purchase.price}</td>
                                        <td className="text-red-400 text-xl font-bold">{purchase.quantity}</td>
                                        <td className="text-green-500">{purchase.date}</td>
                                        <td className="text-info underline">{purchase.addedBy}</td>
                                        <td><button
                                            onClick={() => handleDelete(purchase._id)}
                                            className="absolute right-4 btn btn-ghost border-none bg-error text-white"
                                        >
                                            X
                                        </button></td>
                                    </tr>
                                )


                            }

                        </tbody>
                    </table>
                    :
                    <p className="text-center text-white bg-error rounded-2xl p-6"> No item ordered .... Order first</p>
            }
        </div >
    );
};

export default OrderedItems;