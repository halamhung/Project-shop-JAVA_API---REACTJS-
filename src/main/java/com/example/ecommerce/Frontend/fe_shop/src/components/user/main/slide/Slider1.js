import React from 'react'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, EffectCube, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cube';

import './slider.css'
// import img from '../../../../public'
import imgS1 from '../img/hero-img-1.png'
import imgS2 from '../img/hero-img-2.jpg'

export default function Slider1() {
    const swiper = useSwiper()
    return (
        <>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube, Autoplay]}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: true,
                }}
                // onAutoplayTimeLeft
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                effect={'cube'}
                grabCursor={true}
                cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                }}
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    // when window width is >= 480px
                    770: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    // when window width is >= 640px
                    996: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    // when window width is >= 1024px
                    1404: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                }}
            >
                <SwiperSlide><img src={imgS1} /></SwiperSlide>
                <SwiperSlide><img src={imgS2} /></SwiperSlide>

            </Swiper>
        </>
    )
}
