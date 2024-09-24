import React from 'react'
import "./main.css"
import Footer from '../../components/user/Footer'
import Header from '../../components/user/Header'
import { Col, Container } from 'reactstrap'
import Main from '../../components/user/main/Main'
export default function Home() {
  return (

    <>
      <Header />
      <Main />
      <Footer />
    </>


  )
}
