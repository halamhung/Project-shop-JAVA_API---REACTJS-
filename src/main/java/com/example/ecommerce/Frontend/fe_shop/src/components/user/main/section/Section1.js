import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Slider1 from '../slide/Slider1'
import "./section1.css"
import CateSec1 from '../slide/CateSec1'

export default function Section1() {
  return (
    <Container className="py-5 section1">
    <div className="shine" style={{textAlign:"center", marginBottom:"80px"}}>PRESTIGE
      <p style={{fontSize:"20px"}}>
      <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-brands fa-react"></i>
        <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-solid fa-grip-lines"></i></p>
    </div>
    
    <Row className="g-5 align-items-center">
      <Col md={12} lg={6}>
        
        <h4 className="mb-3 text-secondary">Newest Technology</h4>
        <h1 className="mb-5 display-3 text-primary">
          Best of quality - Best of choice
        </h1>
        <CateSec1/>
      </Col>
      <Col md={12} lg={6}>
        <Slider1 />
      </Col>
    </Row>
  </Container>
  )
}
