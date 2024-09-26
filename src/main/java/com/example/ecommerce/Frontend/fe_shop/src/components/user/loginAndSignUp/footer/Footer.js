import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import logo from '../../../../imgs/logo2-removebg-preview.png'

export default function Footer() {
  return (
    <div>
        <hr style={{marginTop:"150px"}}/>
      <Container fluid style={{height:"100px",textAlign:"center", marginBottom:"20px"}}>
            <img src={logo} alt="logo" style={{height:"100%"}}/>
      </Container>
      <Container style={{marginBottom:"15px",textAlign:"center",width:"30%", display:"flex", justifyContent:"space-around", fontSize:"100%", fontWeight:"600",fontFamily:"revert", opacity:'0.9'}}>
        <Row>
            <Col lg="2" md="3" sm="4" xs="6">
            <a>About</a>
            </Col>

            <Col lg="2" md="3" sm="4" xs="6">
            <a>Services</a>
            </Col>

            <Col lg="2" md="3" sm="4" xs="6">
                <a>Press</a>
            </Col>

            <Col lg="2" md="3" sm="4" xs="6">
                <a>Careers</a>
            </Col>

            <Col lg="2" md="3" sm="4" xs="6">
                <a>FAQ</a>
            </Col>

            <Col lg="2" md="3" sm="4" xs="6"> 
                <a>Legal</a>
            </Col>
        </Row>

      </Container>
      <Container style={{textAlign:"center", paddingBottom:"20px"}}>
        <h5 style={{fontFamily:"revert",opacity:'0.9'}}>Stay in touch</h5>
        <Container style={{width:"150px", display:"flex", justifyContent:"space-around"}}>
            <i className="fa-brands fa-instagram" style={{color: "#e76e6e"}}></i>
            <i className="fa-brands fa-facebook-f" style={{color: "#0050db"}}></i>
            <i className="fa-brands fa-twitter" style={{color: "#1f6bef"}}></i>
            <i className="fa-brands fa-pinterest-p" style={{color: "#f00000"}}></i>
            <i className="fa-solid fa-globe fa-rotate-by" style={{color: "#ad56b8"}}></i>
        </Container>

      </Container>
    </div>
  )
}
