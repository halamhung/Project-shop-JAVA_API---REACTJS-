import React from 'react'
import "./section5.css"
import { Col, Container, Row } from 'reactstrap';


export default function Section5() {
    return (
        <Container fluid className="d featurs py-5">
            <h2>System</h2>
            <Container className=" py-5">
                <Row className="g-4">
                    <Col xl={3} md={6} lg={6} data-aos="fade-right" data-aos-delay="1500">
                            <div class="e-card playing">
                            <div class="image"></div>
                            
                            <div class="wave"></div>
                            <div class="wave"></div>
                            <div class="wave"></div>
                            <div class="infotop"><br/>      
                            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="48px" viewBox="0 0 20 20" width="48px" fill="#75FB4C"><rect fill="none" height="20" width="20"/><path d="M13.21,3.61C13.11,3.95,13,4.35,13,5.12L15.88,8h0.62v2.8l-1.95,0.43l-1.19,4.27H11.5V14H7v1.5H5.13 C4.49,13.26,3.5,9.46,3.5,8c0-1.65,1.35-3,3-3l4.9,0C11.73,4.43,12.33,3.85,13.21,3.61z M14,2c-2.17,0-3.35,1.5-3.35,1.5H6.5 C4.05,3.5,2,5.47,2,8c0,2.33,2,9,2,9h4.5v-1.5H10V17h4.5l1.25-4.5L18,12V6.5h-1.5l-2-2C14.5,4.14,15,3.52,15,3C15,2.45,14.55,2,14,2 L14,2z M11,7.5H7V6h4V7.5z M13.25,9c-0.41,0-0.75-0.34-0.75-0.75c0-0.41,0.34-0.75,0.75-0.75S14,7.84,14,8.25 C14,8.66,13.66,9,13.25,9z"/></svg>
                            <br/>
                            <h5>Free Shipping</h5>
                            <p className="mb-0">Free on order over $300</p>
                            </div>
                            </div>
                    </Col>
                    <Col xl={3} md={6} lg={6} data-aos="fade-right" data-aos-delay="1000">
                    <div class="e-card playing">
                            <div class="image"></div>
                            
                            <div class="wave"></div>
                            <div class="wave"></div>
                            <div class="wave"></div>
                            <div class="infotop"><br/>      
                            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#FFFF55"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                            <br/>
                            <h5>Security Payment</h5>
                            <p className="mb-0">100% security payment</p>
                            </div>
                            </div>
                    </Col>
                    <Col xl={3} md={6} lg={6} data-aos="fade-right" data-aos-delay="500">
                    <div class="e-card playing">
                            <div class="image"></div>
                            
                            <div class="wave"></div>
                            <div class="wave"></div>
                            <div class="wave"></div>
                            <div class="infotop"><br/>      
                            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#75FBFD"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>
                            <br/>
                            <h5>30 Day Return</h5>
                            <p className="mb-0">30 day money guarantee</p>
                            </div>
                            </div>
                    </Col>
                    <Col xl={3} md={6} lg={6} data-aos="fade-right">
                    <div class="e-card playing">
                            <div class="image"></div>
                            
                            <div class="wave"></div>
                            <div class="wave"></div>
                            <div class="wave"></div>
                            <div class="infotop"><br/>      
                            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 20 20" height="48px" viewBox="0 0 20 20" width="48px" fill="#EA3323"><g><rect fill="none" height="20" width="20" x="0"/></g><g><path d="M10,3c-3.87,0-7,3.13-7,7c0,3.87,3.13,7,7,7s7-3.13,7-7C17,6.13,13.87,3,10,3z M12.16,4.41c1.57,0.61,2.82,1.85,3.43,3.42 l-2.78,1.15c-0.3-0.83-0.96-1.49-1.79-1.79L12.16,4.41z M7.84,4.41L9,7.18c-0.85,0.3-1.51,0.96-1.82,1.81v0L4.41,7.84 C5.02,6.27,6.27,5.02,7.84,4.41z M7.83,15.59c-1.57-0.61-2.82-1.86-3.43-3.43l2.78-1.15v0c0.3,0.84,0.97,1.51,1.81,1.81L7.83,15.59 z M8,10c0-1.1,0.9-2,2-2s2,0.9,2,2c0,1.1-0.9,2-2,2S8,11.1,8,10z M12.17,15.59l-1.15-2.78c0.84-0.3,1.5-0.97,1.79-1.81l2.77,1.16 C14.98,13.74,13.74,14.98,12.17,15.59z"/></g></svg>
                            <br/>
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