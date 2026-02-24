"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import img1 from "../../../../public/images/slider-image-1.jpeg"
import img2 from "../../../../public/images/slider-image-2.jpeg"
import img3 from "../../../../public/images/slider-image-3.jpeg"
import img4 from "../../../../public/images/slider-2.jpeg"
import img5 from "../../../../public/images/blog-img-1.jpeg"
import img6 from "../../../../public/images/blog-img-2.jpeg"
import Image from 'next/image'
import 'swiper/css';
import { Autoplay } from 'swiper/modules';





export default function MainSlider() {
    return (
    <div className='container flex w-[90%] mx-auto my-3'>
        <div className='w-3/4'>
        <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{
                        delay:600
        }}
        >
        <SwiperSlide> <Image priority className='w-full h-[400px] object-cover' src={img1} alt='imgSlider'/></SwiperSlide>
        <SwiperSlide> <Image priority className='w-full h-[400px] object-cover' src={img2} alt='imgSlider'/></SwiperSlide>
        <SwiperSlide> <Image priority className='w-full h-[400px] object-cover' src={img3} alt='imgSlider'/></SwiperSlide>
        <SwiperSlide> <Image priority className='w-full h-[400px] object-cover' src={img4} alt='imgSlider'/></SwiperSlide>
    </Swiper>
        </div>
        <div className='w-1/4'>
        <Image priority className='w-full h-[200px] object-cover'    src={img5} alt='imgSlider'/>
        <Image priority className='w-full h-[200px] object-cover' src={img6} alt='imgSlider'/>
    </div>
    </div>
)
}
