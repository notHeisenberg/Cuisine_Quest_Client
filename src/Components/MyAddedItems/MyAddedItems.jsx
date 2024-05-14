import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Components/Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
window.Swal = Swal;
import priceImg from "../../../src/assets/price.png"
import originImg from "../../../src/assets/country.png"
import volumeImg from "../../../src/assets/volume.png"
import axios from "axios";

const MyAddedItems = () => {
    const [items, setItem] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenModal = (item) => {
        // console.log(item)
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdateProduct = (e) => {
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

        const info = { name, image, catagory, quantity, price, origin, description, purchaseCount };

        axios.patch(`https://cuisine-quest-server.vercel.app/items/${selectedItem._id}`, info)
            .then(res => {
                console.log(res.data)
                if (res.data?.modifiedCount > 0) {
                    setItem(prevItems =>
                        prevItems.map(item => (item._id === selectedItem._id ? selectedItem : item))
                    );
                    setIsModalOpen(false)
                    Swal.fire({
                        title: "Item Updated succesfully",
                        width: 600,
                        padding: "3em",
                        color: "#716add",
                        background: "#fff url(/images/trees.png)",
                        backdrop: `
                          rgba(0,0,123,0.4)
                          url("/images/nyan-cat.gif")
                          left top
                          no-repeat
                        `
                    }).then(() => {
                        window.location.reload();
                    });
                }
            })

        e.target.reset()
    };


    const handleDelete = (_id) => {
        console.log(_id);
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

                axios.delete(`https://cuisine-quest-server.vercel.app/items/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            setItem(prevItems =>
                                prevItems.filter(item => item._id !== _id)
                            );
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your craft has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

    const { user } = useContext(AuthContext)
    useEffect(() => {
        fetch(`https://cuisine-quest-server.vercel.app/items/user/${user?.email}`)
            .then(res => res.json())
            .then(data => setItem(data))
    }, [user])

    return (
        <div className="container mx-auto relative ">
            <h2>Total items: {items.length}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {items.map(item => (
                    <div key={item._id} className="card glass bg-base-100 shadow-xl">
                        <figure className="h-1/2 p-2"><img className="w-full h-full rounded-lg" src={item.image} alt={item.item_name} /></figure>
                        <div className="p-4 ">
                            <div className="space-y-2">
                                <h2 className="card-title">{item.name}</h2>
                                <h2 className="font-semibold">{item.category}</h2>
                                <p className="opacity-60 font-semibold">{item.description}</p>
                                <div className="flex justify-between md:flex-col md:items-center lg:flex-row ">
                                    <div className="flex items-center gap-1 text-xl font-bold my-2">
                                        <img src={priceImg} className="w-8" alt="" />
                                        <h1>${item.price}</h1>
                                    </div>

                                    <span className="badge badge-ghost badge-lg  bg-slate-200 my-2">
                                        <div className="flex items-center gap-1 text-xl  font-bold 
                                        ">
                                            <img src={volumeImg} className="w-8" alt="" />
                                            <h1>{item.quantity} items</h1>
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2 md:flex-col lg:flex-row ">
                                <Link to={`/item-details/${item._id}`}>
                                    <button className="btn  btn-info md:w-full lg:w-fit">View details</button>
                                </Link>
                                <button onClick={() => handleOpenModal(item)} className="btn btn-warning md:w-full lg:w-fit">Edit</button>
                                <button onClick={() => handleDelete(item._id)} className="btn btn-error md:w-full lg:w-fit">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {
                isModalOpen && (
                    <div className=" gadgetContainer pt-10 fixed top-12 container">
                        <div className="shadow-lg p-5 border dark:bg-[#4d5975d5]">
                            {/* Heading */}
                            <div className="mt-5 mb-8">
                                <p className="text-center text-3xl font-semibold">
                                    <span className="mr-3 text-[#FF497C]">
                                        <i className="bx bxs-alarm-add"></i>
                                    </span>
                                    <span className="dark:text-white">
                                        <span className="text-[#FFBE00]">
                                            Update {" "}
                                        </span>
                                        Your Product
                                    </span>
                                    <button onClick={handleCloseModal} className="absolute right-4 btn btn-ghost border-none bg-[#FFBE00] text-white">
                                        X
                                    </button>
                                </p>
                            </div>
                            {/* form */}
                            <form onSubmit={handleUpdateProduct}>
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
                                            defaultValue={selectedItem.name}
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
                                            defaultValue={selectedItem.catagory}
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
                                            defaultValue={selectedItem.price}
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
                                            defaultValue={selectedItem.image}
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
                                            defaultValue={selectedItem.origin}
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
                                            defaultValue={selectedItem.quantity}
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
                                            defaultValue={selectedItem.description}
                                        />

                                    </div>
                                </div>

                                <input
                                    className="px-4 w-full py-2 mt-4 rounded hover:bg-[#ab3154]  bg-[#FFBE00] duration-200 text-white cursor-pointer font-semibold"
                                    type="submit"
                                    value="Update Product"
                                />
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default MyAddedItems;