import React from 'react'
import "./sec.css"
import { FaCarSide, FaRetweet } from 'react-icons/fa'
import { RiSecurePaymentFill } from "react-icons/ri";
import { IoCall } from 'react-icons/io5';
import { Col, Container, Row } from 'reactstrap';


export default function Section1() {
    return (
        <Container fluid className="d featurs py-5">
            <Container className=" py-5">
                <Row className="g-4">
                    <Col xl={3} md={6} lg={6} data-aos="fade-right" data-aos-delay="1500">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="featurs-icon btn-square rounded-circle mb-5 mx-auto">
                                <a><FaCarSide size={60} className='icon-section' /></a>
                            </div>
                            <div className="featurs-content text-center">
                                <h5>Free Shipping</h5>
                                <p className="mb-0">Free on order over $300</p>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} md={6} lg={6} data-aos="fade-right" data-aos-delay="1000">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="featurs-icon btn-square rounded-circle mb-5 mx-auto">
                                <RiSecurePaymentFill size={60} className='icon-section' />
                            </div>
                            <div className="featurs-content text-center">
                                <h5>Security Payment</h5>
                                <p className="mb-0">100% security payment</p>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} md={6} lg={6} data-aos="fade-right" data-aos-delay="500">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="featurs-icon btn-square rounded-circle mb-5 mx-auto">
                                <FaRetweet size={60} className='icon-section' />
                            </div>
                            <div className="featurs-content text-center">
                                <h5>30 Day Return</h5>
                                <p className="mb-0">30 day money guarantee</p>
                            </div>
                        </div>
                    </Col>
                    <Col xl={3} md={6} lg={6} data-aos="fade-right">
                        <div className="featurs-item text-center rounded bg-light p-4">
                            <div className="featurs-icon btn-square rounded-circle mb-5 mx-auto">
                                <IoCall size={60} className='icon-section' />
                            </div>
                            <div className="featurs-content text-center">
                                <h5>24/7 Support</h5>
                                <p className="mb-0">Support every time fast</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}   