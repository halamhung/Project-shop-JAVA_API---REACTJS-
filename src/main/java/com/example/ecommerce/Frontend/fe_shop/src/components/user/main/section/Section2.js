
import { Col, Container, Row } from 'reactstrap';
import "./section2.css"

export default function Section2() {
  return (
    <div>
      <Container>
        <h2>Categories</h2>
                    <Row uk-grid uk-scrollspy="cls: uk-animation-fade; target: .col-6; delay: 200; repeat: true">
                        <Col lg="3" xs="6" sm="6" style={{marginBottom:"20px" }}>
                                <div class="card">
                                    <div >
                                       <h1>Laptop</h1>
                                    </div>
                                    <div class="content">
                                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="48px" viewBox="0 0 24 24" width="48px" fill="#5462ff"><g><rect fill="none" height="24" width="24" x="0"/></g><g><g><path d="M20,18c1.1,0,2-0.9,2-2V6c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6v10c0,1.1,0.9,2,2,2H0v2h24v-2H20z M4,6h16v10H4V6z"/></g></g></svg>
                                        <p>offices, gaming, workstation,... with brands DELL, HP, ASUS, ACER,... </p>
                                    </div>
                                </div>
                        </Col>
                        <Col lg="3" xs="6" sm="6" style={{marginBottom:"20px"}} >
                        <div class="card">
                                    <div >
                                       <h1>Phone</h1>
                                    </div>
                                    <div class="content">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#f5872e"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>
                                    <p>From Android: Samsung, Xiaomi, Nokia, Redmi, OPPO,... To IOS: Apple</p>
                                    </div>
                                </div>
                        </Col>
                        <Col lg="3" xs="6" sm="6" style={{marginBottom:"20px"}} >
                        <div class="card">
                                    <div >
                                       <h1>Network</h1>
                                    </div>
                                    <div class="content">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#2ef54c"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>
                                    <p>Network interface card, Router, Hub, Switch, Modem, Wireless Access Point,...</p>
                                    </div>
                                </div>
                        </Col>
                        <Col lg="3" xs="6" sm="6" style={{marginBottom:"20px"}} >
                        <div class="card">
                                    <div >
                                       <h1>PC</h1>
                                    </div>
                                    <div class="content">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#2eeef5"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"/></svg>
                                    <p>External hard drive, Memory card, Card reader, Adapter, Cable, Mouse pad... </p>
                                    </div>
                                </div>

                        </Col>
                        <Col lg="3" xs="6" sm="6" style={{marginBottom:"20px"}} >
                        <div class="card">
                                    <div >
                                       <h1>Monitors</h1>
                                    </div>
                                    <div class="content">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#FFFF55"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>
                                    <p>Liquid Crystal Display, Light-Emitting Diode, Organic Light-Emitting Diode, Quantum Dot LED,... </p>
                                    </div>
                                </div>
                        </Col>
                        <Col lg="3" xs="6" sm="6" style={{marginBottom:"20px"}} >
                        <div class="card">
                                    <div >
                                       <h1>Keyboard</h1>
                                    </div>
                                    <div class="content">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#fe74e9"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>
                                    <p>Mechanical keyboards, Membrane keyboards, Wireless keyboards, Keyboard scissor switch,...</p>
                                    </div>
                                </div>
                        </Col>
                        <Col lg="3" xs="6" sm="6" style={{marginBottom:"20px"}} >
                        <div class="card">
                                    <div >
                                       <h1>Gear</h1>
                                    </div>
                                    <div class="content">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#8C1AF6"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 6h18V4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V6zm10 6H9v1.78c-.61.55-1 1.33-1 2.22 0 .89.39 1.67 1 2.22V20h4v-1.78c.61-.55 1-1.34 1-2.22s-.39-1.67-1-2.22V12zm-2 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM22 8h-6c-.5 0-1 .5-1 1v10c0 .5.5 1 1 1h6c.5 0 1-.5 1-1V9c0-.5-.5-1-1-1zm-1 10h-4v-8h4v8z"/></svg>
                                    <p>Stream deck, sound card, Wireless keyboards, Keyboard scissor switch,...</p>
                                    </div>
                                </div>
                        </Col>
                        <Col lg="3" xs="6" sm="6" style={{marginBottom:"20px"}} >
                        <div class="card">
                                    <div >
                                       <h1>Mouse</h1>
                                    </div>
                                    <div class="content">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#FFFF55"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 9c-.04-4.39-3.6-7.93-8-7.93S4.04 4.61 4 9v6c0 4.42 3.58 8 8 8s8-3.58 8-8V9zm-2 0h-5V3.16c2.81.47 4.96 2.9 5 5.84zm-7-5.84V9H6c.04-2.94 2.19-5.37 5-5.84zM18 15c0 3.31-2.69 6-6 6s-6-2.69-6-6v-4h12v4z"/></svg>
                                    <p>Razer, Logitech, Newmen, Havit,...</p>
                                    </div>
                                </div>
                        </Col>
                    </Row>
                </Container>
    </div>
  )
}
