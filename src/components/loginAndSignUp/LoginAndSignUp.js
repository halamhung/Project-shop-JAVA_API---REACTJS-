import React from 'react'
import './loginAndSignUp.css'
import { Col, Container, Row } from 'reactstrap'
import logo from '../../imgs/logo.png'

export default function LoginAndSignUp() {
  return (
    <div className='wrapper' style={{background:'aqua'}}>
       
            <Row>
                <Col lg='4' >
                    <Container>
                        <img src={logo} alt="logo" />
                    </Container>
                </Col >
                <Col lg='8' xs='12' style={{textAlign:"center"}}>
                    <form>
                        <div>
                            <h3 style={{fontWeight:'bold'}}>Log in</h3>
                            <input type='email' placeholder='Email' name='email'/> <br/>
                            <input type='password' placeholder='Password' name='password' autoComplete='off'/> <br/>
                            <input className='submitForm' type='submit' />
                        </div>
              
                    </form>
                </Col>
            </Row>

    </div>

  )
}
