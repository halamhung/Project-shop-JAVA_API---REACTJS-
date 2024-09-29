import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import dayjs from "dayjs"
import Swal from "sweetalert2";
import {
    Button,
    ButtonGroup,
    Col,
    Container,
    Input,
    InputGroup,
    Row,
    Table,
    Form,
    FormGroup,
    Label,
    Alert
  } from "reactstrap";
import {postNewOrder, clearCart, removeCart, updateQty } from "../../../../redux/cartSlice"
import { Link, useNavigate } from "react-router-dom";

import "./carts.css"

export default function Carts() {

  const { carts, status, error} = useSelector((state) => state.carts);

  const [baseOrder, setBaseOrder] = useState({
    consignee: "",
    phoneConsignee: "",
    addressConsignee: "",
    note: "Gửi ở quầy lễ tân",
    orderDate: dayjs("2024-11-01"),
    paymentMethod: 1,
    status : 1,
    userId : 1,
  })

 
const handleChange = (e) => {
    const { name, value } = e.target;
    setBaseOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
};

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subTotal = () => {
    let sum = 0;
    carts.forEach((item) => {
      console.log("item: ", item.qty);
      console.log("item: ", item.qty);
      sum += item.qty * item.price;
    });
    return sum;
  };
  const subTotal1 = subTotal();

  const handle_clear = () => {
    Swal.fire({
      title: "Xóa Giỏ Hàng",
      text: "Xóa Giỏ Hàng Thành Công",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        dispatch(clearCart());
      }
    });
  };


  const paymentCheckout = async () => {

    const orderToPost = { ...baseOrder };
    console.log('orderToPost: ', orderToPost);

    const resultAction = await dispatch(postNewOrder(orderToPost));

    if(postNewOrder.fulfilled.match(resultAction)) {
      Swal.fire({
        title: "Thanh Toán Thành Công",
        text: "Thanh Toán Thành Công",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
    } else {
      Swal.fire({
        title: "Không thành công",
        text: "Không thành công",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
    }
    setBaseOrder((prevOrder) => ({
      ...prevOrder,
      consignee: "",
      phoneConsignee: "",
      addressConsignee: ""
    }));
  };

  return (
    <Container className="my-5 py-5 cart">
      <Row>
        <Col xl={8} lg={7} md={12} sm={12} xs={12}>
          {carts[0] == null ? (
            <>
              <div className="d-flex justify-content-center ">
                <div>
                  <p>Giỏ hàng trống</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <Table hover>
                <thead className="tableCart">
                  <tr className="tableCartHeader text-center">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          className="img-cart img-fluid"
                          // src={"/"}
                        />
                      </td>
                      <td>
                        <p className="mt-3">{item.name}</p>
                      </td>
                      <td>
                        <p className="mt-3">{item.nameProduct}</p>
                      </td>

                      <td>
                        <ButtonGroup className="mt-3">
                          <Button
                            className=" button-cart  button rounded-5 "
                            onClick={() =>
                              dispatch(
                                updateQty({ flag: false, id: item.productId })
                              )
                            }
                          >
                            <i class="fa-solid fa-minus"></i>
                          </Button>
                          <span className="mx-3">{item.qty}</span>
                          <Button
                            className=" button-cart  button rounded-5 "
                            onClick={() =>
                              dispatch(updateQty({ flag: true, id: item.productId }))
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </Button>
                        </ButtonGroup>
                      </td>
                      <td>
                        <p className="mt-3">{item.price * item.qty}</p>
                      </td>
                      <td>
                        <Button
                          className="button-cart button mt-3"
                          onClick={() => dispatch(removeCart(item.productId))}
                        >
                          X
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button className=" button-cart  button mb-3" onClick={() => handle_clear()}>
                Clear
              </Button>
            </>
          )}
        </Col>
        <Col xl={4} lg={5} md={7} sm={12}>
        <div>
              {error && (
                <Alert color="danger">
                  <ul>
                    {error.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </Alert>
              )}
            </div>
          <div className="bg-light rounded">
            <div className="p-4">
              <h1 className="display-6 mb-4">
                Cart <span className="fw-normal">Detail</span>
              </h1>
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0 me-4">Subtotal:</h5>
                <p className="mb-0">{subTotal1} ₫</p>
              </div>
              <div className="d-flex flex-column form-input">
              <FormGroup row className='d-flex align-items-center'>
                <Label sm={5}>
                  <h5>Người nhận:</h5>
                </Label>
                <Col sm={7}>
                  <Input
                    name="consignee"
                    placeholder="Nguyen Van A"
                    type="text"
                    className='ms-auto'
                    onChange={handleChange}
                    value={baseOrder.consignee}
                   />
                 </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={5}>
                  <h5> Địa chỉ </h5>
                </Label>
                <Col sm={7}>
                  <Input
                    name="addressConsignee"
                    placeholder="HCM"
                    type="text"
                    className='ms-auto'
                    value={baseOrder.addressConsignee}
                    onChange={handleChange}
                   />
                 </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={5}>
                <h5> Phone </h5>
                </Label>
                <Col sm={7}>
                  <Input
                    name="phoneConsignee"
                    placeholder="023567890"
                    type="text"
                    className='ms-auto'
                    value={baseOrder.phoneConsignee}
                    onChange={handleChange}
                   />
                 </Col>
              </FormGroup>
              </div>
              <div className="d-flex justify-content-between">
                <h5 className="mb-0 me-4">Shipping</h5>
                <div className="">
                  <p className="mb-0">Flat rate: $3.00</p>
                </div>
              </div>
              <p className="mb-0 text-end">Shipping to TP.HCM</p>
            </div>
            <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
              <h5 className="mb-0 ps-4 me-4">Total</h5>
              <p className="mb-0 pe-4">{subTotal1} ₫</p>
            </div>
            {carts[0] == null ? (
              <Button
                className="button rounded-pill  button-cart  px-4 py-3 text-uppercase mb-4 ms-4"
                type="button"
                onClick={() => paymentCheckout()}
              >
                Thanh toán
              </Button>
            ) : (
              <Button
                className="button button-cart rounded-pill px-4 py-3 text-uppercase mb-4 ms-4"
                type="button"
                onClick={() => paymentCheckout()}
              >
                Thanh toán
              </Button>
            )}
          </div>
        </Col>
      </Row>
  </Container>
  )
}
