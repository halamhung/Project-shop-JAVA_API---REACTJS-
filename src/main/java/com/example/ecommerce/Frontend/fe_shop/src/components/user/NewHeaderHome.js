import { MDBBtn, MDBCollapse, MDBContainer, MDBIcon, MDBNavbar, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import './newHeaderHome.css'
import logo from '../../../src/imgs/logoRemoveSlogan.png'
const NewHeaderHome = () => {
    const [showBasic, setShowBasic] = useState(false);
    return (
        <header>
      <MDBNavbar expand='lg' light bgColor='white'>
        <MDBContainer fluid>
          <MDBNavbarToggler
            onClick={() => setShowBasic(!showBasic)}
            aria-controls='navbarExample01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <MDBIcon fas icon='bars' />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav right className='mb-2 mb-lg-0' style={{display:"flex", alignItems:"center"}}>
              <MDBNavbarItem active>
                <MDBNavbarLink aria-current='page' href='#' style={{width:"80px", height:"50px",display:"flex", alignItems:"center"}}>
                  <img src={logo} alt="logo" />
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/product' className="navbar-link">Shop</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/' className="navbar-link">Contact</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/' className="navbar-link">About</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/login' className="navbar-link">Login</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/' className="navbar-link">Policy</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/' className="navbar-link">Terms</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/' className="navbar-link">Hiring</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/video-5ab9d.appspot.com/o/video%2FBannerHeader.jpg?alt=media&token=b020ef89-a962-4833-b1e8-c2b25f82ca74')", height: '500px' }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3 gradient-text'>Tech That Fits Your Life</h1>
              <h4 className='mb-3 gradient-text-smaller'>Smart Choice, Smarter Living</h4>
              <MDBBtn tag="a" outline size="lg" className="custom-btn">
                Let's get in
              </MDBBtn>
            </div>
          </div>
        </div>
      </div>
    </header>
    )
}


export default NewHeaderHome;