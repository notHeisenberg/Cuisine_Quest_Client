import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import axios from "axios";


const AddItems = () => {

    const { user } = useContext(AuthContext);


    const handleAddProduct = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const image = e.target.image.value;
        const catagory = e.target.Catagory.value;
        const description = e.target.description.value;
        const price = parseInt(e.target.price.value)
        const quantity = parseInt(e.target.quantity.value);
        const displayName = e.target.displayName.value;
        const origin = e.target.origin.value;
        const email = e.target.email.value

        const purchaseCount = 0;

        console.log(name, image, catagory, quantity, price, origin, description, purchaseCount, displayName, email)

        const info = { name, image, catagory, quantity, price, origin, description, purchaseCount, email };

        axios.post('http://localhost:5000/items', info)
            .then(res => {
                console.log(res.data)
                    if (res.data?.insertedId) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Item added succesfully',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000

                        })
                    }
                    e.target.reset()
            }
            )


    };

    return (
        <div className="gadgetContainer pt-10">
            <div className="shadow-lg p-5 border dark:bg-[#4d5975d5]">
                {/* Heading */}
                <div className="mt-5 mb-8">
                    <p className="text-center text-3xl font-semibold">
                        <span className="mr-3 text-[#FF497C]">
                            <i className="bx bxs-alarm-add"></i>
                        </span>
                        <span className="dark:text-white">
                            <span className="text-[#FFBE00]">
                                Add {" "}
                            </span>
                            Your Product
                        </span>
                    </p>
                </div>
                {/* form */}
                <form onSubmit={handleAddProduct}>
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
                            />

                            <label
                                className="block mt-4 mb-2 dark:text-white"
                                htmlFor="Catagory Name"
                            >
                                Catagory Name
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                type="text"
                                placeholder="Catagory"
                                id="type"
                                name="Catagory"
                            />

                            <label
                                className="block mt-4 mb-2 dark:text-white"
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
                            />




                            <label className="block mb-2 mt-4 dark:text-white" htmlFor="displayName">
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

                            <label className="block mb-2 mt-4 dark:text-white" htmlFor="email">
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
                        {/* Right side */}
                        <div className="flex-1">
                            <label className="block mb-2 dark:text-white" htmlFor="image">
                                Image
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                type="text"
                                placeholder="Enter Image URL"
                                id="image"
                                name="image"
                            />
                            <label className="block mb-2 mt-4 dark:text-white" htmlFor="Origin">
                                Origin
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                type="text"
                                placeholder="Origin"
                                id="type"
                                name="origin"
                            />

                            <label
                                className="block mt-4 mb-2 dark:text-white"
                                htmlFor="quantity"
                            >
                                Quantity
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                maxLength={5}
                                min={0}
                                type="number"
                                placeholder="Quantity"
                                id="quantity"
                                name="quantity"
                            />

                            <label className="block mb-2 mt-4 dark:text-white" htmlFor="type">
                                Short description
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                type="text"
                                placeholder="Short description"
                                id="type"
                                name="description"
                            />

                        </div>
                    </div>

                    <input
                        className="px-4 w-full py-2 mt-4 rounded hover:bg-[#ab3154]  bg-[#FFBE00] duration-200 text-white cursor-pointer font-semibold"
                        type="submit"
                        value="Add Product"
                    />
                </form>
            </div>
        </div>
    );
};

export default AddItems;