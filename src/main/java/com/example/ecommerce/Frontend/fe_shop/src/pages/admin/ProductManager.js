// ProductManager.js
import React, { useEffect, useState } from 'react';
import HeaderAd from '../../components/admin/HeaderAd';
import FooterAd from '../../components/admin/FooterAd';
import { Button, Table, Input, FormGroup, Label } from 'reactstrap';
import Navbar from '../../components/admin/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct, updateProduct, deleteProduct } from '../../redux/productSlice';
import ReactPaginate from 'react-paginate';
import { fetchCategories } from '../../redux/productSlice';
import {Link} from "react-router-dom";

export default function ProductManager() {
    const { products, totalPages, status, error } = useSelector(state => state.products);
    const [editingProduct, setEditingProduct] = useState(null);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const [Category, setCategories] = useState([]); // Initialize as an
    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };
    const { categories } = useSelector(state => state.products); //
    useEffect(() => {
        dispatch(getAllProduct(currentPage));

        // Fetch categories when the component mounts
        const fetchCategoriesData = async () => {
            try {
                const response = await dispatch(fetchCategories());
                setCategories(response.payload); // Update categories state
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategoriesData();
    }, [currentPage, dispatch]);



    useEffect(() => {
        dispatch(getAllProduct(currentPage));
        dispatch(fetchCategories()); // Gọi action fetchCategories
    }, [currentPage, dispatch]);

        const handleEditStart = (product) => {
        setEditingProduct({ ...product });

    };

    const handleEditCancel = () => {
        setEditingProduct(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const parsedValue = name === 'status' || name === 'categoryId' ? parseInt(value, 10) : value;

        setEditingProduct(prevProduct => ({
            ...prevProduct,
            [name]: parsedValue // Correctly update categoryId
        }));
    };

    const handleSaveEdit = () => {
        dispatch(updateProduct({ id: editingProduct.productId, updatedProduct: editingProduct }))
            .then(() => {
                setEditingProduct(null);
                dispatch(getAllProduct(currentPage));
            })
            .catch(error => {
                console.error("Lỗi khi cập nhật sản phẩm:", error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            dispatch(deleteProduct(id))
                .then(() => {
                    dispatch(getAllProduct(currentPage));
                })
                .catch(error => {
                    console.error("Lỗi khi xóa sản phẩm:", error);
                });
        }
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
                                    <td>{product.productId}</td>
                                    <td>
                                        {editingProduct && editingProduct.productId === product.productId ? (
                                            <Input type="text" name="nameProduct" value={editingProduct.nameProduct}
                                                   onChange={handleInputChange}/>
                                        ) : (
                                            <Link
                                                to={`/product/${product.productId}`}> {/* Sử dụng Link để tạo liên kết */}
                                                {product.nameProduct}
                                            </Link>
                                        )}
                                    </td>
                                    <td>
                                        {editingProduct && editingProduct.productId === product.productId ? (
                                            <Input type="number" name="price" value={editingProduct.price}
                                                   onChange={handleInputChange}/>
                                        ) : (
                                            product.price
                                        )}
                                    </td>
                                    <td>
                                        {editingProduct && editingProduct.productId === product.productId ? (
                                            <Input type="text" name="description" value={editingProduct.description}
                                                   onChange={handleInputChange}/>
                                        ) : (
                                            product.description
                                        )}
                                    </td>
                                    <td>
                                        {editingProduct && editingProduct.productId === product.productId ? (
                                            <select
                                                name="categoryId"
                                                value={editingProduct.categoryId}
                                                onChange={handleInputChange}
                                            >
                                                {categories.map(category => (
                                                    <option key={category.categoryId} value={category.categoryId}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            product.category ? product.category.name : 'Chưa có danh mục'
                                        )}
                                    </td>
                                    <td>
                                        {editingProduct && editingProduct.productId === product.productId ? (
                                            <Input type="number" name="quantity" value={editingProduct.quantity}
                                                   onChange={handleInputChange}/>
                                        ) : (
                                            product.quantity
                                        )}
                                    </td>

                                    <td>
                                        {editingProduct && editingProduct.productId === product.productId ? (
                                            <Input
                                                type="select"
                                                name="status"
                                                value={editingProduct.status} // No need to convert to string
                                                onChange={handleInputChange}
                                            >
                                                <option value={0}>Hết hàng</option>
                                                <option value={1}>Còn hàng</option>
                                                <option value={2}>Tạm ngưng bán</option>
                                            </Input>
                                        ) : (
                                            product.status === 0 ? 'Hết hàng' : (product.status === 1 ? 'Còn hàng' : 'Tạm ngưng bán')
                                        )}
                                    </td>
                                    <td>
                                        {editingProduct && editingProduct.productId === product.productId ? (
                                            <>
                                                <Button color="success" onClick={handleSaveEdit}>Lưu</Button>
                                                <Button color="secondary" onClick={handleEditCancel}>Hủy</Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button color="primary" onClick={() => handleEditStart(product)}>Chỉnh
                                                    sửa</Button>
                                                <Button color="danger" onClick={() => handleDelete(product.productId)}>Xóa
                                                </Button>
                                            </>
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