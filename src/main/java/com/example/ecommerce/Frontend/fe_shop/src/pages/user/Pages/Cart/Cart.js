import React from 'react'
import {useSlice, useEffect} from "react";
import Header from '../../../../components/user/Header';
import Footer from '../../../../components/user/Footer';
import Carts from '../../../../components/user/main/cart/Carts';

export default function Cart() {
  return (
    <>
        <Header/>
        <Carts/>
        <Footer/>
    </>
  )
}
