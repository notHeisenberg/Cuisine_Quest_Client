import { Link } from "react-router-dom";
import './Gallery.css'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const Gallery = () => {
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
    const handleAddFeedback = (e) => {
        e.preventDefault();
        const displayName = e.target.displayName.value;
        const email = user.email
        const feedbackImage = e.target.image.value;
        const feedBack = e.target.feedback.value;

        console.log(displayName, email, feedbackImage, feedBack)

        const info = { displayName, email, feedbackImage, feedBack };

        axios.put(`http://localhost:5000/item/feedback/${selectedItem._id}`, info)
            .then(res => {
                console.log(res.data)
                if (res.data?.upsertedCount > 0) {
                    setItem(prevItems =>
                        prevItems.map(item => (item._id === selectedItem._id ? selectedItem : item))
                    );
                    setIsModalOpen(false)
                    Swal.fire({
                        title: "Feedback recorded",
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
                    })
                }
            })
    };


    const banner = <>
        <div className="hero h-[600px] mb-5" style={{ backgroundImage: 'url(https://i.ibb.co/k2KL7dP/galary-banner.jpg)' }}>
            <div className="hero-overlay bg-opacity-60 "></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className=" mb-5 text-5xl text-orange-400 opacity-90 font-bold">Cuisine Quest</h1>
                    <h1 className=" text-xl">
                        <Link to={'/'}>
                            <span className="btn btn-ghost text-green-400 font-bold text-xl">Home </span>
                        </Link>
                        | Gallery
                    </h1>
                </div>
            </div>
        </div></>


    const { user } = useContext(AuthContext)
    useEffect(() => {
        fetch(`http://localhost:5000/items/user/${user?.email}`)
            .then(res => res.json())
            .then(data => setItem(data))
    }, [user])

    return (

        <div className="relative">
            {banner}
            <div className=" grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {
                    items.map(item => (
                        <div key={item._id} className="card ">
                            <figure className="card-image-container h-full">
                                <img className="card-image rounded-xl w-fit h-fit" src={item.image} alt="Shoes" />
                                <div className="card-body w-full ">
                                    <h2 className="card-title">{item.name}</h2>
                                    <p>{item.category}</p>
                                    <div className="card-actions justify-end">
                                        <button onClick={() => handleOpenModal(item)} className="btn btn-warning">Add</button>
                                    </div>
                                </div>
                            </figure>
                        </div>
                    ))
                }
            </div>
            {
                isModalOpen && (
                    <div className=" gadgetContainer pt-10 fixed top-12 w-full">
                        <div className="shadow-lg p-5 border dark:bg-[#4d5975d5]">
                            {/* Heading */}
                            <div className="mt-5 mb-8">
                                <p className="text-center text-3xl font-semibold">
                                    <span className="mr-3 text-[#FF497C]">
                                        <i className="bx bxs-alarm-add"></i>
                                    </span>
                                    <span className="dark:text-white">
                                        <span className="text-[#FFBE00]">
                                            ADD {" "}
                                        </span>
                                        Your Feedback
                                    </span>
                                    <button onClick={handleCloseModal} className="absolute right-4 btn btn-ghost border-none bg-[#FFBE00] text-white">
                                        X
                                    </button>
                                </p>
                            </div>
                            {/* form */}
                            <form onSubmit={handleAddFeedback}>
                                <div className="flex gap-8 ">
                                    <div className="flex-1">
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

                                        <label className="block mb-2 mt-4 dark:text-white" htmlFor="feedback">
                                            Feedback
                                        </label>

                                        <textarea
                                            className="textarea textarea-bordered textarea-lg w-full max-w-xs focus:outline-[#FF497C]"
                                            placeholder="Feedback"
                                            id="feedback"
                                            name="feedback"
                                        ></textarea>


                                    </div>
                                    {/* Right side */}
                                    <div className="flex-1">
                                        <label className="block mb-2 dark:text-white" htmlFor="image">
                                            Feedback Image
                                        </label>
                                        <input
                                            className="w-full p-2 border rounded-md focus:outline-[#FF497C]"
                                            type="text"
                                            placeholder="Feedback Image URL"
                                            id="image"
                                            name="image"
                                        // defaultValue={selectedItem.image}
                                        />


                                    </div>
                                </div>

                                <input
                                    className="px-4 w-full py-2 mt-4 rounded hover:bg-[#ab3154]  bg-[#FFBE00] duration-200 text-white cursor-pointer font-semibold"
                                    type="submit"
                                    value="ADD"
                                />
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Gallery;