import React from 'react'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, EffectCube, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cube';

import './slider.css'
// import img from '../../../../public'
import imgS1 from '../../../../imgs/Session1LapTop1.jpg';
import imgS2 from '../../../../imgs/Session1Computer1.jpg';
import imgS3 from '../../../../imgs/Session1Network1.jpg';
import imgS4 from '../../../../imgs/Session1Phone1.jpg';
import imgS5 from '../../../../imgs/section1S5.jpg';
import imgS6 from '../../../../imgs/section1S6.avif'

export default function Slider1() {
    return (

            <div class="cube-container">
            <div class="cube">
                <div class="face front"> <img src={imgS1} alt="" /></div>
                <div class="face back"><img src={imgS2} alt="" /></div>
                <div class="face right"><img src={imgS3} alt="" /></div>
                <div class="face left"><img src={imgS4} alt="" /></div>
                <div class="face top"><img src={imgS5} alt="" /></div>
                <div class="face bottom"><img src={imgS6} alt="" /></div>
            </div>
            </div>

    )
}
