import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import Slider2 from "./slide/Slider2";
import Slider1 from "./slide/Slider1"
import Banner from "./banner/Banner";
import "./Main.css";
import Section1 from "./section/Section1";
import Section3 from "./section/Section3";
import Section4 from "./section/Section4";
import Section2 from "./section/Section2";

export default function Main() {

  return (
    <Container fluid className=" py-5 mb-5 hero-header">
        <Section1/>
        <Section2/>
        <Section3/>
        <Section4/>

       <Banner/>       

    </Container>
  );
}
