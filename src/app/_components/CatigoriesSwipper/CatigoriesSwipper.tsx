"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { category } from './../../../type/catigory.type';

export default function CatigoriesSwipper({ catigories }: { catigories: category[] }) {
  return <>

    <div className='container w-[90%] mx-auto'>
      <Swiper
        spaceBetween={0}
        slidesPerView={7}
        modules={[Autoplay]}
        autoplay={{ delay: 600 }}
        breakpoints={{

          640: {
            slidesPerView: 2,

          },

          768: {
            slidesPerView: 4,

          },
          1024: {
            slidesPerView: 5,

          }
        }
        }

      >
        {catigories.map((categ: category, index: number) => {
          return <SwiperSlide key={categ._id || index}>
            <Image
              width={200}
              height={150}
              className='w-full h-[150px] object-cover'
              src={categ.image}
              alt={categ.name || "Category"}
            />
            <p>{categ.name}</p>
          </SwiperSlide>
        })}
      </Swiper>
    </div>
  </>
}
