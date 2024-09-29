import React from 'react';
import './section6.css'
import banner from '../../../../imgs/banner.jpg'
import { Container } from 'reactstrap';
const Section6 = () => {
    return (
        <Container style={{display:"flex", flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
            <div class="shine" style={{textAlign:"center", marginBottom:"80px"}}>EVENT
            <p style={{fontSize:"20px"}}>
      <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-brands fa-react"></i>
        <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-solid fa-grip-lines"></i></p>
            </div>
            <img src={banner} alt="" />
        </Container>
    )
}


export default Section6;
