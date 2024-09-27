import React from 'react'
import { Container } from 'reactstrap'
import Slider2 from '../slide/Slider2'

export default function Section3() {
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
    <Container fluid className=" py-5 mb-5">
    <h2>Deals Hot</h2>
    <Container className=" py-5">
      <h1> Trái cây đeii</h1>
      <Slider2 arr={arr} />
    </Container>
  </Container>
  )
}
