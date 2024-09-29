import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import colabor1 from '../../../../imgs/colabor1.jpg';
import colabor2 from '../../../../imgs/colabor2.jpeg'

const Section3 = () => {
    return (
        <Container>
        <div class="shine" style={{textAlign:"center", marginBottom:"80px"}}>COLLABORATION
        <p style={{fontSize:"20px"}}>
      <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-brands fa-react"></i>
        <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-solid fa-grip-lines"></i>
        <i className="fa-solid fa-grip-lines"></i></p>
        </div>
        <Row>
            <Col lg="6" xs="12" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                <img src={colabor1} alt="colabor1" style={{ width: '100%', height: '80%' }}/>
            </Col>
            <Col lg="6" xs="12" uk-scrollspy="cls: uk-animation-slide-top; repeat: true" style={{borderRadius:"10px"}}>
                <div>
                    <h1>Individual</h1>
                    <p> Every member of our community is a valued partner. Your contributions are the building blocks of our growth. Together, we create a community where everyone plays a vital role. Your success is our success.
                    </p>
                </div>
            </Col>
        </Row>
        <Row>
            <Col lg="6" xs="12" uk-scrollspy="cls: uk-animation-slide-bottom; repeat: true" style={{borderRadius:"10px"}}>
                <div>
                    <h1>Incorporate</h1>
                    <p>As a company dedicated to providing innovative solutions, we are always seeking collaboration with other organizations in the same industry. By partnering with industry leaders, we can leverage our collective expertise to develop cutting-edge products and deliver an unparalleled user experience.
                    </p>
                </div>
            </Col>
            <Col lg="6" xs="12" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
                <img src={colabor2} alt="colabor2" style={{ width: '100%', height: '80%' }}/>
            </Col>                       
        </Row>
    </Container>
    )
}


export default Section3;