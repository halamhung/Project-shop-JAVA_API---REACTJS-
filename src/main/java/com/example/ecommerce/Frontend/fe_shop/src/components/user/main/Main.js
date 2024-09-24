import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import Slider1 from './slide/Slider1'


export default function Main() {
    return (
        <Container fluid className=" py-5 mb-5 hero-header">
            <Container className=" py-5">
                <Row className="g-5 align-items-center">
                    <Col md={12} lg={7} data-aos="fade-right">
                        <h4 className="mb-3 text-secondary">100% Organic Foods</h4>
                        <h1 className="mb-5 display-3 text-primary">Organic Veggies & Fruits Foods</h1>
                    </Col>
                    <Col md={12} lg={5} data-aos="fade-left">
                        <Slider1 />
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

