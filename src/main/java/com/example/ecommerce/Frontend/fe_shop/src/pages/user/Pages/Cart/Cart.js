import React from 'react'
import {useSlice, useEffect} from "react";
import { Container } from 'reactstrap';
import Header from '../../../../components/user/Header';
import Footer from '../../../../components/user/Footer';
import Carts from '../../../../components/user/main/cart/Carts';

export default function Cart() {
  return (
        <div>
            <Header/>
             <Carts/>
            <Footer/>
        </div>
    )
}
