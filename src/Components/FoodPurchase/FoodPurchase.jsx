import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";


const FoodPurchase = () => {
    const data = useLoaderData()
    const { user } = useContext(AuthContext)
    // console.log(data.image)

    const date = new Date().toUTCString()


    const handelPurchase = (e) => {
        e.preventDefault();


        const name = e.target.name.value;
        const price = parseInt(e.target.price.value)
        const quantity = parseInt(e.target.quantity.value);
        const date = e.target.date.value;
        const displayName = e.target.displayName.value;
        const email = e.target.email.value;
        const image = data.image;
        const addedBy = data.email;



        // const purchaseCount = data.purchaseCount + 1

        // console.log(name, price, quantity, date, displayName, email)

        if (quantity === 0) {
            Swal.fire({
                title: 'Sorry!',
                text: 'Out of stock',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000

            })
            return
        }

        if (quantity > data.quantity) {
            Swal.fire({
                title: 'Sorry!',
                text: 'Quantity exceeds available stock.',
                icon: 'error',
                showConfirmButton: false,
                timer: 2000

            })
            return
        }


        const info = { name, price, quantity, date, displayName, email, image, addedBy };
        console.log(info)

        axios.post(`https://cuisine-quest-server.vercel.app/purchase`, info)
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    title: 'Success!',
                    text: 'Item Purchase succesfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000

                }).then(() => window.location.reload())
            }

            )
    }

    // console.log(data)
    return (
        <div className=" container mx-auto pt-10 w-full">
            <div className="shadow-lg p-5 border dark:bg-[#4d5975d5]">
                {/* Heading */}
                <div className="mt-5 mb-8">
                    <p className="text-center text-3xl font-semibold p-3">
                        <span className="mr-3 text-[#FF497C]">
                            <i className="bx bxs-alarm-add"></i>
                        </span>
                        <span className="dark:text-white">
                            <span className="text-[#FFBE00]">
                                PURCHASE {" "}
                            </span>
                            Your Product
                        </span>
                    </p>
                    <figure className="flex justify-center">
                        <img className="rounded-lg h-64" src={data.image} alt="" />
                    </figure>
                </div>
                {/* form */}
                <form onSubmit={handelPurchase}>
                    <div className="flex gap-8 ">
                        <div className="flex-1">
                            <label className="block mb-2 dark:text-white" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                type="text"
                                placeholder="Name"
                                id="name"
                                name="name"
                                defaultValue={data.name}
                            />

                            <label
                                className="block  mb-2 dark:text-white"
                                htmlFor="quantity"
                            >
                                Quantity
                            </label>
                            <input
                                className="w-full p-2 border rounded-md text-[#FF497C] font-bold focus:outline-[#FF497C]"
                                maxLength={5}
                                max={data.quantity}
                                min={0}
                                type="number"
                                placeholder="Quantity"
                                id="quantity"
                                name="quantity"
                                defaultValue={data.quantity}
                            />

                            <label className="block mb-2 dark:text-white" htmlFor="displayName">
                                Added_By
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                type="text"
                                placeholder="Added_By"
                                id="type"
                                name="displayName"
                                defaultValue={user.displayName}
                                disabled
                            />

                        </div>
                        {/* Right side */}
                        <div className="flex-1">
                            <label
                                className="block mb-2 dark:text-white"
                                htmlFor="price"
                            >
                                Price
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                type="text"
                                placeholder="Enter Price"
                                id="Price"
                                name="price"
                                defaultValue={data.price}
                            />

                            <label
                                className="block mb-2 dark:text-white"
                                htmlFor="Date"
                            >
                                Date
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                type="text"
                                placeholder="Date"
                                id="date"
                                name="date"
                                defaultValue={date}
                            />

                            <label className="block mb-2 dark:text-white" htmlFor="Email">
                                Email
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                type="text"
                                placeholder="Email"
                                id="type"
                                name="email"
                                defaultValue={user.email}
                                disabled
                            />

                        </div>
                    </div>

                    <input
                        className="px-4 w-full py-2 mt-4 rounded hover:bg-[#ab3154]  bg-[#FFBE00] duration-200 text-white cursor-pointer font-semibold"
                        type="submit"
                        value="Purchase"
                    />
                </form>
            </div>
        </div>
    );
};

export default FoodPurchase;