import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from 'next/image';
import { Pagination, Autoplay } from 'swiper/modules';

const BackdropSlider = ({movies}) => {
    return (
        <div className="h-[600px] md:h-[600px] lg:h-[600px] w-screen">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className='w-full h-full overflow-hidden'
            >
                {movies.map((movie, index) => (
                    <SwiperSlide
                        key={index}
                        className='relative w-full h-full'
                    >
                        <p className="text-white text-4xl md:text-5xl w-full h-full flex items-center absolute top-0 left-0 z-10 px-10 font-semibold">{movie.title}</p>
                        <Image
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            fill
                            priority
                            className="object-cover"
                            alt={`Slide ${index + 1}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default BackdropSlider