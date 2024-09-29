import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import laptop from '../../../../imgs/laptopRog.webp';
import phone from '../../../../imgs/iphone15.jpg';
import keyboard from '../../../../imgs/keyboard1.jpg'
import ssd from '../../../../imgs/ssd.jpg'
import './section4.css'

export default function Section4() {
  return (
    <Container fluid className=" py-5 mb-5">
      <h2>Deals Hot</h2>
      <Container className=" py-5">
        <Row uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 100; repeat:true">
          <Col lg='3' md='4' sm='6' xs='6' uk-scrollspy-class="uk-animation-slide-top">
            <div class="book">
              <Container>
                <h4>ROG Strix G513Q-HN015T R7-4800H</h4>
                <p>From new X870 motherboards to OLED displays and plenty of mice and keyboards.</p>
                <div data-tooltip="Price:-$20" class="button">
                  <div class="button-wrapper">
                    <div class="text">Buy Now</div>
                  </div>
                </div>
              </Container>
              <div class="cover">
                <img src={laptop} alt='' />
              </div>
            </div>
          </Col>
          <Col lg='3' md='4' sm='6' xs='6' uk-scrollspy-class="uk-animation-slide-bottom">
            <div class="book">
              <Container>
                <h4>Iphone 15 promax 512gb</h4>
                <p>Compared to the phone it replaces, it's now lighter with upgraded system and titanium build.</p>
                <div data-tooltip="Price:-$20" class="button">
                  <div class="button-wrapper">
                    <div class="text">Buy Now</div>
                  </div>
                </div>
              </Container>
              <div class="cover">
                <img src={phone} alt='' />
              </div>
            </div>
          </Col>
          <Col lg='3' md='4' sm='6' xs='6' uk-scrollspy-class="uk-animation-slide-top">
            <div class="book">
              <Container>
                <h4>SSD Micron 3400 M2-PCIe</h4>
                <p>The 980 also sports sixth-generation V-NAND along with an optimised controller and firmware.</p>
                <div data-tooltip="Price:-$20" class="button">
                  <div class="button-wrapper">
                    <div class="text">Buy Now</div>
                  </div>
                </div>
              </Container>
              <div class="cover">
                <img src={ssd} alt='' />
              </div>
            </div>
          </Col>
          <Col lg='3' md='4' sm='6' xs='6' uk-scrollspy-class="uk-animation-slide-bottom">
            <div class="book">
              <Container>
                <h4>Das keyboard 5QS</h4>
                <p> Smart RGB mechanical with newest technical keyboard with macros to play multiple built-in RGB profiles.</p>
                <div data-tooltip="Price:-$20" class="button">
                  <div class="button-wrapper">
                    <div class="text">Buy Now</div>
                  </div>
                </div>
              </Container>
              <div class="cover">
                <img src={keyboard} alt='' />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
