import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/admin/Navbar'
import HeaderAd from '../../../components/admin/HeaderAd'
import FooterAd from '../../../components/admin/FooterAd'
import { useDispatch, useSelector } from 'react-redux'
import { addCoupoun, deleteCoupon, getAllCoupon, resetStatusAndMessage, updateCoupon } from '../../../redux/couponSlice'
import ReactPaginate from 'react-paginate'
import { Alert, Button, Col, Form, FormGroup, Input, Label, Table } from 'reactstrap'


export default function Coupon() {
    const { coupon, totalPages, message, status } = useSelector(state => state.coupon)
    const [statusEdit, setStatusEdit] = useState({ isEdit: false, id: "" })
    const [showMessage, setShowMessage] = useState(false)

    const dispatch = useDispatch()
    const limit = 5

    const [currentPage, setCurrentPage] = useState(0)

    const handlePageClick = (event) => {
        setCurrentPage(event.selected)
    }

    const [coupon1, setCoupon1] = useState({
        "name": "",
        "description": "",
        "expirationDate": "",
        "status": false,
        "discountPercentage": ""
    })
    const handle_create = () => {
        
        dispatch(addCoupoun( coupon1 )).then(() => dispatch(getAllCoupon(currentPage)))
        setCoupon1({
            name: "",
            description: "",
            expirationDate: "",
            status: false,
            discountPercentage: ""
        })
    }
    const [couponEdit, setCouponEdit] = useState({
        "id":"",
        "name": "",
        "description": "",
        "expirationDate": "",
        "status": false,
        "discountPercentage": ""
    })
    const handle_edit = (item) => {
        setCouponEdit({ 
                id: item.id,
                name: item.name,
                description: item.description,
                expirationDate: item.expirationDate,
                status: item.status,
                discountPercentage: item.discountPercentage
            })
    }
    const handle_update = (id) => {
        dispatch(updateCoupon({id,couponDTO: couponEdit})).then(() => dispatch(getAllCoupon(currentPage)))
        setCouponEdit({ 
            id:"",
            name: "",
            description: "",
            expirationDate: "",
            status: false,
            discountPercentage: ""
        })
    }
    const handle_delete = (id) => {
        // console.log(id)
        dispatch(deleteCoupon(id)).then(() => dispatch(getAllCoupon(currentPage)))
    }

    console.log(couponEdit)

    useEffect(() => {
        if (status && message) {

            setShowMessage(true)
            const time = setTimeout(() => {
                setShowMessage(false)
                dispatch(resetStatusAndMessage())
            }, 6000);
            return () => clearTimeout(time)
        }

    }, [status, message])
    useEffect(() => {

        dispatch(getAllCoupon(currentPage))
    }, [currentPage])

    return (
        <div className="container-xxl position-relative bg-white d-flex p-0">
            <HeaderAd />
            <div className="content">
                {/* Navbar Start */}
                <Navbar />
                {/* Navbar End */}
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-6">
                            <Form>
                                <h3>Create coupon</h3>
                                <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={3}
                                    >
                                        Name
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            value={coupon1.name}
                                            onChange={(e)=>setCoupon1(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="with a Name"
                                            type="text"
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={3}
                                    >
                                        Expiration date
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            value={coupon1.expirationDate}
                                            onChange={(e)=>setCoupon1(prev => ({ ...prev, expirationDate: e.target.value }))}
                                            placeholder="with a Expiration date"
                                            type="date"
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={3}
                                    >
                                        Description
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            value={coupon1.description}
                                            onChange={(e)=>setCoupon1(prev => ({ ...prev, description: e.target.value }))}
                                            placeholder="with a Description"
                                            type="text"
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={3}
                                    >
                                        % Discount
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            value={coupon1.discountPercentage}
                                            onChange={(e)=>setCoupon1(prev => ({ ...prev, discountPercentage: e.target.value }))}
                                            placeholder="with a % Discount"
                                            type="number"
                                        />
                                    </Col>
                                </FormGroup>
                                <Button color='primary' onClick={() => handle_create()}>Create</Button>
                            </Form>
                        </div>
                        <div className="col-6">
                            <Form>
                                <h3>Update coupon</h3>
                                <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={3}
                                    >
                                        Name
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            value={couponEdit.name}
                                            onChange={(e)=>setCouponEdit(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="with a Name"
                                            type="text"
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={3}
                                    >
                                        Expiration date
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            value={couponEdit.expirationDate}
                                            onChange={(e)=>setCouponEdit(prev => ({ ...prev, expirationDate: e.target.value }))}
                                            placeholder="with a Expiration date"
                                            type="date"
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={3}
                                    >
                                        Description
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            value={couponEdit.description}
                                            onChange={(e)=>setCouponEdit(prev => ({ ...prev, description: e.target.value }))}
                                            placeholder="with a Description"
                                            type="text"
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={3}
                                    >
                                        % Discount
                                    </Label>
                                    <Col sm={5}>
                                        <Input
                                            value={couponEdit.discountPercentage}
                                            onChange={(e)=>setCouponEdit(prev => ({ ...prev, discountPercentage: e.target.value }))}
                                            placeholder="with a % Discount"
                                            type="number"
                                        />
                                    </Col>
                                    <Label
                                        for="exampleEmail"
                                        sm={2}
                                    >
                                        Status
                                    </Label>
                                    <Col sm={2}>
                                        <Input
                                            checked={couponEdit.status}
                                            onChange={(e)=>setCouponEdit(prev => ({ ...prev, status: e.target.checked }))}
                                            placeholder="with a % Discount"
                                            type="checkbox"
                                        />
                                    </Col>
                                </FormGroup>
                                <Button color='primary' onClick={() => handle_update(couponEdit.id)}>Update</Button>
                            </Form>
                        </div>
                        
                        {showMessage && (
                            <Alert color={status == 200 ? "success" : "danger"}>
                                {message}
                            </Alert>
                        )}
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Expiration date
                                    </th>
                                    <th>
                                        Description
                                    </th>
                                    <th>
                                        % Discount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupon && coupon.map((item, index) =>
                                    <tr>
                                        <th>{item.id}</th>
                                        <td>{item.name}</td>
                                        <td>{item.expirationDate}</td>
                                        <td>{item.description}</td>
                                        <td>{item.discountPercentage}</td>
                                        <td>
                                           {
                                            <Input
                                            checked={item.status}
                                            placeholder="with a % Discount"
                                            type="checkbox"
                                            />
                                           }
                                        </td>
                                        <td>
                                            <Button color='success me-2' onClick={() => handle_edit(item)}>Edit</Button>
                                            <Button color='danger me-2' onClick={() => handle_delete(item.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </Table>
                    </div>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={Math.ceil(totalPages)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        nextClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextLinkClassName={'page-link'}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        activeClassName={'active'}
                    />

                </div>

                {/* Footer Start */}
                <FooterAd />
                {/* Footer End */}
            </div>
        </div>
    )
}
