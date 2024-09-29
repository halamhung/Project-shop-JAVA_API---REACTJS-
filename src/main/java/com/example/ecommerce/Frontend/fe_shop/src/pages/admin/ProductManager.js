// ProductManager.js
import React, { useEffect, useState } from 'react';
import HeaderAd from '../../components/admin/HeaderAd';
import FooterAd from '../../components/admin/FooterAd';
import {Button, Table, Input, FormGroup, Label} from 'reactstrap';
import Navbar from '../../components/admin/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct, updateProduct, deleteProduct } from '../../redux/productSlice';
import ReactPaginate from 'react-paginate';
import { fetchCategories } from '../../redux/productSlice';
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductManager() {
    const { products, totalPages, status, error } = useSelector(state => state.products);
    const [editingProduct, setEditingProduct] = useState(null);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0); // Khởi tạo currentPage là 0
    const [Category, setCategories] = useState([]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected); // Cập nhật currentPage dựa trên event.selected
    };
    const { categories } = useSelector(state => state.products);

    //hàm lọc
    const [filters, setFilters] = useState({
        id: '',
        priceSort: 'none' // 'asc' (thấp đến cao), 'desc' (cao xuống thấp)
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };
    const filterProducts = (products) => {
        let filteredProducts = [...products];

        // Lọc theo ID
        if (filters.id) {
            filteredProducts = filteredProducts.filter(product => product.productId.toString().includes(filters.id));
        }

        // Lọc theo giá
        if (filters.priceSort === 'asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (filters.priceSort === 'desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        return filteredProducts;
    };



    useEffect(() => {
        dispatch(getAllProduct(currentPage));

        const fetchCategoriesData = async () => {
            try {
                const response = await dispatch(fetchCategories());
                setCategories(response.payload);
                console.log(categories); // Kiểm tra categories
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategoriesData();
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
            [name]: parsedValue
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
    const handleLogin = async (credentials) => {
        try {
            const response = await axios.post('/api/users/login', credentials); // Thay /api/users/login bằng endpoint login của bạn

            // Lưu trữ token (nếu sử dụng token-based authentication)
            const token = response.data.token; // Giả sử backend trả về token trong response.data.token
            localStorage.setItem('token', token);

            // Chuyển hướng đến trang ProductManager hoặc thực hiện các hành động khác sau khi đăng nhập thành công
        } catch (error) {
            // Xử lý lỗi đăng nhập
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {};

                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }

                const response = await axios.get('/api/product', { headers }); // Thay /api/product bằng endpoint của bạn
                // Xử lý dữ liệu sản phẩm
            } catch (error) {
                // Xử lý lỗi
                if (error.response.status === 401) {
                    // Xử lý lỗi 401 (Unauthorized) - có thể chuyển hướng đến trang đăng nhập
                }
            }
        };

        fetchProducts();
    }, []);


    if (status === "loading") {
        return <div>Loading...</div>;
    } else if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container-xxl position-relative bg-white d-flex p-0">
            <HeaderAd />
            <div className="content1">
                <Navbar />
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <FormGroup>
                                <Label for="idFilter">ID:</Label>
                                <Input
                                    type="text"
                                    name="id"
                                    id="idFilter"
                                    value={filters.id}
                                    onChange={handleFilterChange}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup>
                                <Label for="priceSort">Sắp xếp theo giá:</Label>
                                <Input
                                    type="select"
                                    name="priceSort"
                                    id="priceSort"
                                    value={filters.priceSort}
                                    onChange={handleFilterChange}
                                >
                                    <option value="none">Không sắp xếp</option>
                                    <option value="asc">Thấp đến cao</option>
                                    <option value="desc">Cao xuống thấp</option>
                                </Input>
                            </FormGroup>
                        </div>

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

                            {filterProducts(products).map((product, index) => (
                                <tr key={product.productId}>
                                    <td>{product.productId}</td>
                                    <td>
                                        {editingProduct && editingProduct.productId === product.productId ? (
                                            <Input type="text" name="nameProduct" value={editingProduct.nameProduct}
                                                   onChange={handleInputChange}/>
                                        ) : (
                                            <Link
                                                to={`/product/${product.productId}`}>
                                                {product.nameProduct}
                                            </Link>
                                        )}
                                    </td>
                                    <td>
                                        {editingProduct && editingProduct.productId === product.productId ? (
                                            <Input type="number" name="price" value={editingProduct.price}
                                                   onChange={handleInputChange}/>
                                        ) : (
                                            `${product.price.toLocaleString('vi-VN')} ₫`
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
                                            <Input
                                                type="select"
                                                name="categoryId"
                                                value={editingProduct.categoryId}
                                                onChange={handleInputChange}
                                            >
                                                {categories.map(category => (
                                                    <option key={category.categoryId} value={category.categoryId}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </Input>
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
                                                value={editingProduct.status}
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
                                                <Button color="primary"
                                                        onClick={() => handleEditStart(product)}>Update</Button>
                                                <Button color="danger" onClick={() => handleDelete(product.productId)}>Delete
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
                        pageCount={Math.ceil(totalPages)} // Sử dụng Math.ceil để làm tròn lên tổng số trang
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
                        forcePage={currentPage} // Không cần trừ 1 ở đây
                    />
                </div>

                {/* Footer Start */}
                <FooterAd />
                {/* Footer End */}
            </div>
        </div>
    );
}