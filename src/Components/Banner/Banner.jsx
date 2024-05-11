

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './Banner.css'

import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import { Link, useLoaderData } from 'react-router-dom';


const Banner = ({data}) => {

    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
                className="mySwiper container mx-auto"

            >
                {
                    data.slice(0,6).map((craft, idx) => (
                        <SwiperSlide
                            key={idx}
                            className='hover:shadow-xl hover:shadow-blue-300 relative'
                        >
                            <div className='absolute bottom-4 p-2  font-medium text-2xl ' >

                                <h1>{craft.item_name} </h1>
                                <div className='flex gap-2 items-center ' >
                                    <p className='btn btn-outline text-primary-content mr-52' >{craft.subcategory_Name}</p>

                                    <p
                                        className={craft.status === 'In stock' ? `font-serif  btn btn-sm btn-warning`
                                            :
                                            `font-serif  btn btn-sm `
                                        } >
                                        {craft.stockStatus}
                                    </p>
                                    <p>
                                        {craft.price}
                                    </p>

                                </div>
                            </div>

                            <Link to={`/craft-details/${craft._id}`}>

                                <img className='h-full hover:cursor-pointer' src={craft.image} />
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
};

export default Banner;