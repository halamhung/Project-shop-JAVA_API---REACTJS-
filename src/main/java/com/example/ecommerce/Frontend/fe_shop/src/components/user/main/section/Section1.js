import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import Slider1 from '../slide/Slider1'
// import "./section1.css"
import CateSec1 from '../slide/CateSec1'

export default function Section1() {
  return (
    <Container className=" py-5">
    <h2>Prestige</h2>
    <Row className="g-5 align-items-center">
      <Col md={12} lg={6} data-aos="fade-right">
        
        <h4 className="mb-3 text-secondary">Newest Technology</h4>
        <h1 className="mb-5 display-3 text-primary">
          Best of quality 
        </h1>
        <h1 className="mb-5 display-3 text-primary">
          Best of choice 
        </h1>
      <CateSec1/>

      </Col>
      <Col md={12} lg={6} data-aos="fade-left">
        <Slider1 />
      </Col>
    </Row>
  </Container>
  )
}
