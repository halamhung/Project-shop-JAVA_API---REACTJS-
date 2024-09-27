import React, { useEffect, useState } from 'react';
import HeaderAd from '../../components/admin/HeaderAd';
import FooterAd from '../../components/admin/FooterAd';
import { Button, Table, Input } from 'reactstrap';
import Navbar from '../../components/admin/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../redux/productSlice';
import ReactPaginate from 'react-paginate';

export default function ProductManager() {
    const { products, totalPages, status, error } = useSelector(state => state.products);
    const [statusEdit, setStatusEdit] = useState({ isEdit: false, id: "" });
    const [productStatus, setProductStatus] = useState(0);

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1); // React Paginate starts from page 0
    };

    const handleStatusChange = (event) => {
        setProductStatus(parseInt(event.target.value, 10));
    };

    const handleEdit = (id, status) => {
        setStatusEdit({ isEdit: true, id });
        setProductStatus(status);
    };

    const handleUpdateStatus = (id) => {
        // Implement your API call to update product status here
        // You'll likely need to dispatch another action to update the Redux store
        console.log(`Updating product ${id} to status ${productStatus}`);
        setStatusEdit({ isEdit: false, id: "" }); // Reset edit mode
    };

    useEffect(() => {
        dispatch(getAllProduct(currentPage));
    }, [currentPage, dispatch]);

    if (status === "loading") {
        return <div>Loading...</div>;
    } else if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container-xxl position-relative bg-white d-flex p-0">
            <HeaderAd />
            <div className="content">
                <Navbar />
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <Table striped>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products && products.map((product, index) => (
                                <tr key={product.productId}>
                                    <th>{product.productId}</th>
                                    <td>{product.nameProduct}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>{product.category}</td> {/* Assuming you have category name */}
                                    <td>{product.quantity}</td>
                                    <td>
                                        {statusEdit.isEdit && product.productId === statusEdit.id ? (
                                            <Input
                                                type="select"
                                                value={productStatus}
                                                onChange={handleStatusChange}
                                            >
                                                <option value={1}>Còn hàng</option>
                                                <option value={0}>Hết hàng</option>
                                            </Input>
                                        ) : (
                                            product.status === 1 ? 'Còn hàng' : 'Hết hàng'
                                        )}
                                    </td>
                                    <td>
                                        <Button color='primary' onClick={() => handleEdit(product.productId, product.status)}>
                                            {statusEdit.isEdit && product.productId === statusEdit.id ? 'Save' : 'Edit'}
                                        </Button>
                                        {statusEdit.isEdit && product.productId === statusEdit.id && (
                                            <Button color='secondary' onClick={() => setStatusEdit({ isEdit: false, id: "" })}>
                                                Cancel
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={totalPages}
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
                        forcePage={currentPage - 1}
                    />
                </div>

                {/* Footer Start */}
                <FooterAd />
                {/* Footer End */}
            </div>
        </div>
    );
}