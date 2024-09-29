import React, { useEffect, useState } from 'react'
import FooterAd from '../../../components/admin/FooterAd'
import ReactPaginate from 'react-paginate'
import { Alert, Button, Form, FormGroup, Input, Label, Table } from 'reactstrap'
import Navbar from '../../../components/admin/Navbar'
import HeaderAd from '../../../components/admin/HeaderAd'
import { useDispatch, useSelector } from 'react-redux'
import { createCategory, deleteCategory, getAllCategory, resetStatusAndMessage, updateCategory } from '../../../redux/categorySlice'


export default function Category() {
    const { category, totalPages, message, status } = useSelector(state => state.category)
    // const [statusEdit, setStatusEdit] = useState({ isEdit: false, id: "" })
    const [showMessage, setShowMessage] = useState(false)

    const dispatch = useDispatch()
    const limit = 5

    const [currentPage, setCurrentPage] = useState(0)

    const handlePageClick = (event) => {
        setCurrentPage(event.selected)
    }

    const [name, setName] = useState("")
    const handle_create = () => {
        setName("")
        dispatch(createCategory({ name })).then(() => dispatch(getAllCategory(currentPage)))
    }
    const [cateEdit, setCateEdit] = useState({ id: "", name: "" })
    const handle_edit = (id, name) => {
        setCateEdit({ id: id, name: name })
    }
    const handle_update = (id) => {
        dispatch(updateCategory({ id, name: cateEdit.name })).then(() => dispatch(getAllCategory(currentPage)))
        setCateEdit({ id: "", name: "" })
    }
    const handle_delete = (id) => {
        dispatch(deleteCategory(id)).then(() => dispatch(getAllCategory(currentPage)))
    }

    console.log(cateEdit.id)

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

        dispatch(getAllCategory(currentPage))
    }, [currentPage])

    return (
        <div className="container-xxl position-relative bg-white d-flex p-0">
            <HeaderAd />
            <div className="content-fluid">
                {/* Navbar Start */}
                <Navbar />
                {/* Navbar End */}
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-6">
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                        Create category
                                    </Label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="with a placeholder"
                                        type="text"
                                    />
                                </FormGroup>
                                <Button color='primary' onClick={() => handle_create(name)}>Create</Button>
                            </Form>
                        </div>
                        <div className="col-6">
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                        Update category
                                    </Label>
                                    <Input
                                        value={cateEdit.name}
                                        onChange={(e) => setCateEdit(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="with a placeholder"
                                        type="text"
                                    />
                                </FormGroup>
                                <Button color='primary' onClick={() => handle_update(cateEdit.id)}>Save</Button>
                            </Form>
                        </div>
                        {showMessage && (
                            <Alert color={status == 200 ? "danger" : "success"}>
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

                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {category && category.map((item, index) =>
                                    <tr>
                                        <th>{item.id}</th>
                                        <td>{item.name}</td>
                                        <td>
                                            <Button color='success me-2' onClick={() => handle_edit(item.id, item.name)}>Edit</Button>
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
