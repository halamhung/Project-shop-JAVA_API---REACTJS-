import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Input, Row } from 'reactstrap'
import "./footer.css"
import logo from '../../imgs/logo2-removebg-preview.png'

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false);

    // Show or hide the button based on scroll position
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // This ensures smooth scrolling
        });
    };

    useEffect(() => {
        // Add scroll event listener
        window.addEventListener('scroll', toggleVisibility);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);
    return (
        // <footer className="footer spad">
        //     <div className="container">
        //         <div className="row">
        //             <div className="col-lg-3 col-md-6 col-sm-6">
        //                 <div className="footer__about">
        //                     <div className="footer__about__logo">
        //                         <a href="./index.html">
        //                             <img src="img/logo.png" alt="" />
        //                         </a>
        //                     </div>
        //                     <ul>
        //                         <li>Address: 60-49 Road 11378 New York</li>
        //                         <li>Phone: +65 11.188.888</li>
        //                         <li>Email: hello@colorlib.com</li>
        //                     </ul>
        //                 </div>
        //             </div>
        //             <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
        //                 <div className="footer__widget">
        //                     <h6>Useful Links</h6>
        //                     <ul>
        //                         <li>
        //                             <a href="#">About Us</a>
        //                         </li>
        //                         <li>
        //                             <a href="#">About Our Shop</a>
        //                         </li>
        //                         <li>
        //                             <a href="#">Secure Shopping</a>
        //                         </li>
        //                         <li>
        //                             <a href="#">Delivery infomation</a>
        //                         </li>
        //                         <li>
        //                             <a href="#">Privacy Policy</a>
        //                         </li>
        //                         <li>
        //                             <a href="#">Our Sitemap</a>
        //                         </li>
        //                     </ul>
        //                     <ul>
        //                         <li>
        //                             <a href="#">Who We Are</a>
        //                         </li>
        //                         <li>
        //                             <a href="#">Our Services</a>
        //                         </li>
        //                         <li>
        //                             <a href="#">Projects</a>
        //                         </li>
        //                         <li>
        //                             <a href="#">Contact</a>
        //                         </li>
        //                         <li>
        //                             <a href="#">Innovation</a>
        //                         </li>
        //                         <li>
        //                             <a href="#">Testimonials</a>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //             <div className="col-lg-4 col-md-12">
        //                 <div className="footer__widget">
        //                     <h6>Join Our Newsletter Now</h6>
        //                     <p>Get E-mail updates about our latest shop and special offers.</p>
        //                     <form action="#">
        //                         <input type="text" placeholder="Enter your mail" />
        //                         <button type="submit" className="site-btn">
        //                             Subscribe
        //                         </button>
        //                     </form>
        //                     <div className="footer__widget__social">
        //                         <a href="#">
        //                             <i className="fa fa-facebook" />
        //                         </a>
        //                         <a href="#">
        //                             <i className="fa fa-instagram" />
        //                         </a>
        //                         <a href="#">
        //                             <i className="fa fa-twitter" />
        //                         </a>
        //                         <a href="#">
        //                             <i className="fa fa-pinterest" />
        //                         </a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="row">
        //             <div className="col-lg-12">
        //                 <div className="footer__copyright">
        //                     <div className="footer__copyright__text">
        //                         <p>
        //                             {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
        //                             Copyright © All rights reserved | This template is made with{" "}
        //                             <i className="fa fa-heart" aria-hidden="true" /> by{" "}
        //                             <a href="https://colorlib.com" target="_blank">
        //                                 Colorlib
        //                             </a>
        //                             {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
        //                         </p>
        //                     </div>
        //                     <div className="footer__copyright__payment">
        //                         <img src="img/payment-item.png" alt="" />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </footer>
        <>
            <Container fluid className=" text-white-50 footer pt-5 mt-5">
                <Container className="py-5">
                    <div className="pb-4 mb-4" >
                        <Row className='g-5' style={{display:"flex", alignItems:"center"}}>
                            <Col lg="3">
                                <img src={logo} alt="logo" style={{width:"180px", height:"100px"}}/>
                            </Col>
                            <Col lg="6">
                                <div className=" mx-auto" style={{ position: 'relative' }}>
                                    <Input className="form-control border-0 w-100 py-3 px-4 rounded-pill" type='email' placeholder='Your Email' />
                                    <button type="submit" className="btn-sub-now border-0 border-secondary py-3 px-4 rounded-pill text-white "
                                        style={{ position: "absolute", top: 0, right: 0 }} >Subscribe Now</button>
                                </div>
                            </Col>
                            <Col lg="3">
                                {/* <div className="d-flex justify-content-end pt-3">
                                    <a className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><FaTwitter size={23} /></a>
                                    <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><FaFacebook size={23} /></a>
                                    <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href=""><FaYoutube size={23} /></a>
                                    <a className="btn btn-outline-secondary btn-md-square rounded-circle" href=""><FaLinkedin size={23} /></a>
                                </div> */}
                            </Col>
                        </Row>
                    </div>
                    <Row className='my-2 g-5'>
                        {/* <div class="col-lg-3 col-md-6"> */}
                        <Col lg={3} md={6}>
                            <div className="footer-item">
                                <h4 className="text-light mb-3">Why People Like us!</h4>
                                <p className="mb-4">typesetting, remaining essentially unchanged. It was
                                    popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.</p>
                                <a href="" className="btn py-2 px-4 rounded-pill ">Read More</a>
                            </div>
                        </Col>
                        <Col lg={3} md={6}>
                            <div className="d-flex flex-column text-start footer-item">
                                <h4 className="text-light mb-3">Shop Info</h4>
                                <a className="btn-link" href="">About Us</a>
                                <a className="btn-link" href="">Contact Us</a>
                                <a className="btn-link" href="">Privacy Policy</a>
                                <a className="btn-link" href="">Terms & Condition</a>
                                <a className="btn-link" href="">Return Policy</a>
                                <a className="btn-link" href="">FAQs & Help</a>
                            </div>
                        </Col>
                        <Col lg={3} md={6}>
                            <div className="d-flex flex-column text-start footer-item">
                                <h4 className="text-light mb-3">Account</h4>
                                <a className="btn-link" href="">My Account</a>
                                <a className="btn-link" href="">Shop details</a>
                                <a className="btn-link" href="">Shopping Cart</a>
                                <a className="btn-link" href="">Wishlist</a>
                                <a className="btn-link" href="">Order History</a>
                                <a className="btn-link" href="">International Orders</a>
                            </div>
                        </Col>
                        <Col lg={3} md={6}>
                            <div className="footer-item">
                                <h4 className="text-light mb-3">Contact</h4>
                                <p>Address: 1429 Netus Rd, NY 48247</p>
                                <p>Email: Example@gmail.com</p>
                                <p>Phone: +0123 4567 8910</p>
                                <p>Payment Accepted</p>
                                {/* <img src={payment} class="img-fluid" alt="" /> */}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>

            {isVisible &&
                (
                    <Button className="btn btn-primary border-3 rounded-circle back-to-top"
                        onClick={() => scrollToTop()}
                    >
                        <i className="fa-regular fa-circle-up fa-lg"></i>
                    </Button>
                )
            }
        </>

    )
}
