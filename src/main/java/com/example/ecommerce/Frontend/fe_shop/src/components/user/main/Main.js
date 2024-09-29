import React from "react";
import { Container } from "reactstrap";
import "./Main.css";
import Section1 from "./section/Section1";
import Section3 from "./section/Section4";
import Section4 from "./section/Section5";
import Section2 from "./section/Section2";
import Section5 from "./section/Section3";
import Section6 from "./section/Section6";

export default function Main() {

  return (
    <Container fluid className=" py-5 mb-5 hero-header">
        <Section1/>
        <Section2/>
        <Section3/>
        <Section4/>
        <Section5/>    
        <Section6/>
    </Container>
  );
}
