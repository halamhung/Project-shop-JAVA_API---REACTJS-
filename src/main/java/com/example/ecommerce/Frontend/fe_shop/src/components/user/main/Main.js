import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import Slider2 from "./slide/Slider2";
import Slider1 from "./slide/Slider1"
import Banner from "./banner/Banner";
import "./Main.css";

export default function Main() {
    const arr = [
        { id: 1, name: "img1" },
        { id: 1, name: "img1" },
        { id: 1, name: "img1" },
        { id: 1, name: "img1" },
        { id: 1, name: "img1" },
        { id: 1, name: "img1" },
        { id: 1, name: "img1" },
        { id: 1, name: "img1" },
    ]
  return (
    <Container fluid className=" py-5 mb-5 hero-header">
      <Container className=" py-5">
        <Row className="g-5 align-items-center">
          <Col md={12} lg={7} data-aos="fade-right">
            <h4 className="mb-3 text-secondary">100% Organic Foods</h4>
            <h1 className="mb-5 display-3 text-primary">
              Organic Veggies & Fruits Foods
            </h1>
          </Col>
          <Col md={12} lg={5} data-aos="fade-left">
            <Slider1 />
          </Col>
        </Row>
      </Container>
      
      <Container fluid className=" py-5 mb-5">
        <Container className=" py-5">
          <h1> Trái cây đeii</h1>
          <Slider2 arr={arr} />
        </Container>
      </Container>

       <Banner/>       

    </Container>
  );
}
