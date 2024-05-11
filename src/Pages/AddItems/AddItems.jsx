import { useContext } from "react";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import Swal from "sweetalert2";

const AddItems = ({ update }) => {

    const { user } = useContext(AuthContext);

    const handleAddProduct = (e) => {
        e.preventDefault();

        const item_name = e.target.name.value;
        const image = e.target.image.value;
        const subcategory_Name = e.target.subcategory.value;
        const short_description = e.target.description.value;
        const price = e.target.price.value;
        const rating = parseFloat(e.target.rating.value);
        const customization = e.target.customization.value;
        const processing_time = e.target.processingTime.value;
        const stockStatus = e.target.status.value;
        const email = user.email;

        console.log(image, item_name, subcategory_Name, short_description, price, rating, customization, processing_time, stockStatus, email)

        const info = { image, item_name, subcategory_Name, short_description, price, rating, customization, processing_time, stockStatus, email };

        fetch("https://art-craft-store-server-eta.vercel.app/crafts", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Item added succesfully',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000

                    })
                }
                e.target.reset()
            })

    };


    const handleUpdateProduct = (e) => {
        e.preventDefault();


        const name = e.target.name.value;
        const image = e.target.image.value;
        const subcategory = e.target.subcategory.value;
        const description = e.target.description.value;
        const price = e.target.price.value;
        const rating = parseFloat(e.target.rating.value);
        const customization = e.target.customization.value;
        const processingTime = e.target.processingTime.value;
        const status = e.target.status.value;
        const email = user.email;

        console.log(image, name, subcategory, description, price, rating, customization, processingTime, status, email)

        const info = { image, name, subcategory, description, price, rating, customization, processingTime, status, email };

        // fetch(`https://art-craft-store-server-eta.vercel.app/crafts/$`, {
        //     method: "PUT",
        //     headers: { "Content-type": "application/json" },
        //     body: JSON.stringify(info)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data?.insertedId) {
        //             Swal.fire({
        //                 title: 'Success!',
        //                 text: 'Item Updated succesfully',
        //                 icon: 'success',
        //                 showConfirmButton: false,
        //                 timer: 2000

        //             })
        //         }
        //         e.target.reset()
        //     })

    };

    return (
        <div className="gadgetContainer pt-10">
            <div className="shadow-lg p-5 border dark:bg-[#1a2641d5]">
                {/* Heading */}
                <div className="mt-5 mb-8">
                    <p className="text-center text-3xl font-semibold">
                        <span className="mr-3 text-[#FF497C]">
                            <i className="bx bxs-alarm-add"></i>
                        </span>
                        <span className="dark:text-white">
                            <span className="text-[#FF497C]">
                                {update ? "Update " : "Add "}
                            </span>
                            Your Product
                        </span>
                    </p>
                </div>
                {/* form */}
                <form onSubmit={update ? handleUpdateProduct : handleAddProduct}>
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
                                {...(update ? {} : { required: true })}
                            />

                            <label
                                className="block mt-4 mb-2 dark:text-white"
                                htmlFor="Subcategory Name"
                            >
                                Subcategory Name
                            </label>
                            <select
                                name="subcategory"
                                id="brand"
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                type="text"
                                placeholder="Select Brand"
                                {...(update ? {} : { required: true })}
                            >
                                <option value="Embroidery" >
                                    Embroidery
                                </option>
                                <option value="Knitting & Crocheting" >
                                    Knitting & Crocheting
                                </option>
                                <option value="Quilting" >
                                    Quilting
                                </option>
                                <option value="Beadwork" >
                                    Beadwork
                                </option>
                                <option value="Tie-Dyeing" >
                                    Tie-Dyeing
                                </option>
                                <option value="Macrame" >
                                    Macrame
                                </option>
                            </select>

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
                                {...(update ? {} : { required: true })}
                            />
                            <label className="block mb-2 mt-4 dark:text-white" htmlFor="customization">
                                Customization
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                type="text"
                                placeholder="Customization"
                                id="type"
                                name="customization"
                                {...(update ? {} : { required: true })}
                            />
                            <label className="block mb-2 mt-4 dark:text-white" htmlFor="stockStatus">
                                Stock Status
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                type="text"
                                placeholder="Stock Status"
                                id="type"
                                name="status"
                                {...(update ? {} : { required: true })}
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
                                {...(update ? {} : { required: true })}
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
                                {...(update ? {} : { required: true })}
                            />

                            <label
                                className="block mt-4 mb-2 dark:text-white"
                                htmlFor="rating"
                            >
                                Rating
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                maxLength={5}
                                max={5}
                                min={0}
                                step="0.1"
                                type="number"
                                placeholder="Enter Rating"
                                id="rating"
                                name="rating"
                                {...(update ? {} : { required: true })}
                            />
                            <label className="block mb-2 mt-4 dark:text-white" htmlFor="Processing time">
                                Processing time
                            </label>
                            <input
                                className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                type="text"
                                placeholder="Processing Time"
                                id="type"
                                name="processingTime"
                                {...(update ? {} : { required: true })}
                            />
                        </div>
                    </div>

                    <input
                        className="px-4 w-full py-2 mt-4 rounded hover:bg-[#ab3154]  bg-[#FF497C] duration-200 text-white cursor-pointer font-semibold"
                        type="submit"
                        value={update ? "Update Product" : "Add Product"}
                    />
                </form>
            </div>
        </div>
    );
};

export default AddItems;