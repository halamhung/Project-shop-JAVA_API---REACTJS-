import React, { useEffect, useState } from 'react'
import FooterAd from '../../../components/admin/FooterAd'
import ReactPaginate from 'react-paginate'
import { Button, Table } from 'reactstrap'
import Navbar from '../../../components/admin/Navbar'
import HeaderAd from '../../../components/admin/HeaderAd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../../redux/categorySlice'

export default function Category() {
    const { category, totalPages } = useSelector(state => state.category)
    // const [statusEdit, setStatusEdit] = useState({ isEdit: false, id: "" })
    const [statusOrder, setStatusOrder] = useState(0)

    console.log(category)
    const dispatch = useDispatch()
    const limit = 5

    const [currentPage, setCurrentPage] = useState(0)

    const handlePageClick = (event) => {
        setCurrentPage(event.selected)
    }

    // const handle_status = (status) => {
    //     if (status === 1) {
    //         return "chua giao hang"
    //     }
    // }

    // const handle_edit = (id, item) => {
    //     setStatusEdit({ isEdit: true, id })
    //     setStatusOrder(item)
    // }

    useEffect(() => {
        dispatch(getAllCategory(currentPage))
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

                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {category && category.map((item, index) =>
                                    <tr>
                                        <th>{item.id}</th>
                                        <td>{item.name}</td>

                                        {/* {statusEdit.isEdit && item.orderId === statusEdit.id ?
                                            <Input type="text" value={statusOrder}
                                                onChange={(e) => setStatusEdit(e.target.value)}
                                            />
                                            :
                                            <td>{handle_status(item.status)}</td>
                                        } */}

                                        <td><Button color='primary'>Details</Button></td>
                                        {/* <td><Button onClick={() => handle_edit(item.orderId, item.status)} color='primary'>Update Status</Button></td> */}
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
