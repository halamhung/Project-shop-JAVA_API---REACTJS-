import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import laptop from '../../../../imgs/laptopRog.webp';
import phone from '../../../../imgs/iphone15.jpg';
import keyboard from '../../../../imgs/keyboard1.jpg'
import ssd from '../../../../imgs/ssd.jpg'
import './section4.css'

export default function Section4() {
  // const arr = [
  //     { id: 1, name: "Laptop ROG",img:laptop , fullname:"Laptop Asus ROG Strix G513Q-HN015T R7-4800H", sub:"From new X870 motherboards to OLED displays and plenty of mice and keyboards, here’s everything ROG announced at Gamescom 2024."},
  //     { id: 2, name: "IPhone 15", img:phone ,fullname:"Iphone 15 promax 15gb", sub:"Compared to the phone it replaces,it's now lighter with a titanium build, it has USB-C.Iphone 15 promax has a customisable 'action button' that I use all the time." },
  //     { id: 3, name: "Monitor", img:monitor ,fullname:"FRONTECH 20 Inch HD LED Monitor", sub:"Viewing Angle - Horizontal: 140° / Vertical: 110°. Response Time - 2ms (TR), 6ms (TF). Power supply operating on AC 180-255V 1.0A. Use port HDMI." },
  //     { id: 4, name: "Card wifi", img:cardwifi ,fullname:"PCIe Wifi 7 intel BE200", sub:"This high-performance wireless network adapter provides ultra-fast speeds of up to 1300Mbps on the 5GHz band and 600Mbps on the 2.4GHz band with newest tech of Intel."},
  //     { id: 5, name: "SSD", img:ssd ,fullname:"SSD Micron 3400 M2-PCIe Gen 4×4 512Gb", sub:"The 980 also sports sixth-generation V-NAND along with an optimised controller and firmware, which offers storage capacity in different variants. " },
  //     { id: 6, name: "Keyboard", img:keyboard ,fullname:"Das keyboard 5QS", sub:"The Das Keyboard 5QS is the second generation of the 5Q keyboard. Smart RGB mechanical with newest technical in every switch keyboard with macros to play multiple built-in RGB profiles." }
  // ]
  return (
    <Container fluid className=" py-5 mb-5">
      <h2>Deals Hot</h2>
      <Container className=" py-5">
        <Row>
          <Col lg='3' md='4' sm='6' xs='6'>
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
          <Col lg='3' md='4' sm='6' xs='6'>
            <div class="book">
              <Container>
                <h4>Iphone 15 promax 512gb</h4>
                <p>Compared to the phone it replaces,it's now lighter with a titanium build.</p>
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
          <Col lg='3' md='4' sm='6' xs='6'>
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
          <Col lg='3' md='4' sm='6' xs='6'>
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
