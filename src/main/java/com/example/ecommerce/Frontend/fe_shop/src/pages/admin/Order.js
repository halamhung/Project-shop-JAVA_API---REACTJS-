import React, { useEffect, useState } from 'react'
import HeaderAd from '../../components/admin/HeaderAd'
import FooterAd from '../../components/admin/FooterAd'
import { Button, Col, Form, FormGroup, Input, Label, Table } from 'reactstrap'
import Navbar from '../../components/admin/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrder, search, updateStatus } from '../../redux/orderSlice'
import ReactPaginate from 'react-paginate'

export default function Order() {

    const { orders, totalPages } = useSelector(state => state.orders)
    const [statusEdit, setStatusEdit] = useState({ isEdit: false, id: "" })
    const [statusOrder, setStatusOrder] = useState(0)

    console.log(statusOrder)
    const dispatch = useDispatch()
    const limit = 5

    const [currentPage, setCurrentPage] = useState(0)

    const handlePageClick = (event) => {
        setCurrentPage(event.selected)
    }

    const handle_status = (status) => {
        if (status === 1) {
            return "Chờ xử lý"
        }
        else if (status === 2) {
            return "Đang xử lý"
        }
        else if (status === 3) {
            return "Đã gửi hàng"
        }
        else if (status === 4) {
            return "Đã giao hàng"
        }
        else {
            return "Đã hủy"
        }
    }

    const handle_edit = (id, item) => {
        setStatusEdit({ isEdit: true, id })
        setStatusOrder(item)
    }
    const handle_save = (id) => {
        // console.log(id)
        dispatch(updateStatus({ id, status: statusOrder }))
        setStatusEdit({ isEdit: false, id: "" })
    }

    const [orderSearch, setOrderSearch] = useState({ "consignee": "", "addressConsignee": "", "phoneConsignee": 0, "orderDate": 0 })

    console.log(orderSearch)
    useEffect(() => {
        dispatch(search(orderSearch))
    }, [orderSearch])

    useEffect(() => {
        dispatch(getAllOrder(currentPage))
    }, [currentPage, dispatch])

    return (
        <div className="container-xxl position-relative bg-white d-flex p-0">
            <HeaderAd />
            <div className="content">
                {/* Navbar Start */}
                <Navbar />
                {/* Navbar End */}
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <Form>
                            <h3>Tìm kiếm đơn hàng</h3>
                            <FormGroup row>
                                <Label
                                    for="exampleEmail"
                                    sm={2}
                                >
                                    Tên người nhận
                                </Label>
                                <Col sm={4}>
                                    <Input
                                        value={orderSearch.consignee}
                                        onChange={(e) => (
                                            setOrderSearch({ ...orderSearch, consignee: e.target.value })
                                        )}
                                        type="text"
                                    />
                                </Col>
                                <Label
                                    for="exampleEmail"
                                    sm={1}
                                >
                                    Địa chỉ
                                </Label>
                                <Col sm={5}>
                                    <Input
                                        value={orderSearch.addressConsignee}
                                        onChange={(e) => (
                                            setOrderSearch({ ...orderSearch, addressConsignee: e.target.value })
                                        )}
                                        placeholder="with a placeholder"
                                        type="text"
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label
                                    for="exampleEmail"
                                    sm={1}
                                >
                                    Sđt
                                </Label>
                                <Col sm={4}>
                                    <Input
                                        value={orderSearch.phoneConsignee}
                                        onChange={(e) => (
                                            setOrderSearch({ ...orderSearch, phoneConsignee: e.target.value })
                                        )}
                                        placeholder="with a placeholder"
                                        type="number"
                                    />
                                </Col>
                                <Label
                                    for="exampleEmail"
                                    sm={1}
                                >
                                    Năm
                                </Label>
                                <Col sm={2}>
                                    <Input
                                        value={orderSearch.orderDate}
                                        onChange={(e) => (
                                            setOrderSearch({ ...orderSearch, orderDate: e.target.value })
                                        )}
                                        type="number"
                                    />
                                </Col>
                                {/* <Label
                                    for="exampleEmail"
                                    sm={2}
                                >
                                    Trạng thái
                                </Label>
                                <Col sm={2}>
                                    <Input
                                        // value={statusOrder}
                                        // onChange={(e) => setStatusOrder(e.target.value)}
                                        className='mt-2'
                                        type="select"
                                    >
                                        <option value={1}>
                                            Chờ xử lý
                                        </option>
                                        <option value={2}>
                                            Đang xử lý
                                        </option>
                                        <option value={3}>
                                            Đã gửi hàng
                                        </option>
                                        <option value={4}>
                                            Đã giao hàng
                                        </option>
                                        <option value={0}>
                                            Đã hủy
                                        </option>
                                    </Input>
                                </Col> */}
                            </FormGroup>
                        </Form>
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
                                        Order Date
                                    </th>
                                    <th>
                                        Address
                                    </th>
                                    <th>
                                        Note
                                    </th>
                                    <th>
                                        Phone
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.map((item, index) =>
                                    <tr>
                                        <th>{item.orderId}</th>
                                        <td>{item.consignee}</td>
                                        <td>{item.orderDate}</td>
                                        <td>{item.addressConsignee}</td>
                                        <td>{item.note}</td>
                                        <td>{item.phoneConsignee}</td>
                                        {
                                            statusEdit.isEdit && item.orderId === statusEdit.id ?
                                                <Input
                                                    value={statusOrder}
                                                    onChange={(e) => setStatusOrder(e.target.value)}
                                                    className='mt-2'
                                                    type="select"
                                                >
                                                    <option value={1}>
                                                        Chờ xử lý
                                                    </option>
                                                    <option value={2}>
                                                        Đang xử lý
                                                    </option>
                                                    <option value={3}>
                                                        Đã gửi hàng
                                                    </option>
                                                    <option value={4}>
                                                        Đã giao hàng
                                                    </option>
                                                    <option value={0}>
                                                        Đã hủy
                                                    </option>
                                                </Input>
                                                :
                                                <td>{handle_status(item.status)}</td>
                                        }
                                        {statusEdit.isEdit && item.orderId === statusEdit.id ?
                                            <td>
                                                <><Button color='success' className='me-2' onClick={() => handle_save(item.orderId)}>save</Button>
                                                    <Button color='danger' onClick={() => setStatusEdit({ isEdit: false, id: "" })}>cancel</Button></>
                                            </td>
                                            :
                                            <>
                                                <td><Button color='primary' className='me-2'>Details</Button>
                                                    <Button onClick={() => handle_edit(item.orderId, item.status)} color='primary'>Update
                                                    </Button>
                                                </td>
                                            </>
                                        }
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
