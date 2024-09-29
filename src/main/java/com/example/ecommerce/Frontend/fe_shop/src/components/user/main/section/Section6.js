import React from 'react';
import './section6.css'
import banner from '../../../../imgs/banner.jpg'
import { Container } from 'reactstrap';
const Section6 = () => {
    return (
        <Container style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
            <h2>Event</h2>
            <img src={banner} alt="" />
        </Container>
    )
}


export default Section6;
