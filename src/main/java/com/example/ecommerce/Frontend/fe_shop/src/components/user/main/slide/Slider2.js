import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import AOS from "aos"
import "aos/dist/aos.css"
import CardProd from '../card/CardProd';

export default function Slider2(props) {
    useEffect(() => {
        AOS.init({
            duration: 2000,
        })
    }, [])

    const { arr } = props

    return (
        <>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    // when window width is >= 480px
                    770: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    // when window width is >= 640px
                    996: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    // when window width is >= 1024px
                    1404: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                }}
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
            >
                {
                    arr.map((item, index) => (
                        <SwiperSlide>
                            <CardProd />
                        </SwiperSlide>
                    ))
                }

            </Swiper>

        </>
    )
}