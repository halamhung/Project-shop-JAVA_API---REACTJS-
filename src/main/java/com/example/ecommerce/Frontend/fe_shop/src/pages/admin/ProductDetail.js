import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/${id}`);
                setProduct(response.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    // Lấy URL của ảnh đầu tiên trong danh sách ảnh của sản phẩm
    const imageUrl = product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/200'; // URL placeholder nếu không có ảnh

    return (
    
        <section className="ftco-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mb-5 ftco-animate">
                        <a href={imageUrl} className="image-popup prod-img-bg">
                            <img src={imageUrl} className="img-fluid" alt={product.nameProduct} />
                        </a>
                    </div>
                    <div className="col-lg-6 product-details pl-md-5 ftco-animate">
                        <h3>{product.nameProduct}</h3>
                        <div className="rating d-flex">
                            {/* Hiển thị đánh giá sản phẩm (chưa có dữ liệu từ backend) */}
                            <p className="text-left mr-4">
                                <a href="#" className="mr-2">5.0</a>
                                <a href="#"><span className="fa fa-star"></span></a>
                                <a href="#"><span className="fa fa-star"></span></a>
                                <a href="#"><span className="fa fa-star"></span></a>
                                <a href="#"><span className="fa fa-star"></span></a>
                                <a href="#"><span className="fa fa-star"></span></a>
                            </p>
                            <p className="text-left mr-4">
                                <a href="#" className="mr-2" style={{ color: '#000' }}>100 <span style={{ color: '#bbb' }}>Rating</span></a>
                            </p>
                            <p className="text-left">
                                <a href="#" className="mr-2" style={{ color: '#000' }}>500 <span style={{ color: '#bbb' }}>Sold</span></a>
                            </p>
                        </div>
                        <p className="price"><span>${product.price}</span></p>
                        <p>{product.description}</p>

                        {/* Tabs */}
                        <div className="row mt-5">
                            <div className="col-md-12 nav-link-wrap">
                                <div className="nav nav-pills d-flex text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <a className="nav-link ftco-animate active mr-lg-1" id="v-pills-1-tab" data-toggle="pill" href="#v-pills-1" role="tab" aria-controls="v-pills-1" aria-selected="true">Description</a>
                                    <a className="nav-link ftco-animate mr-lg-1" id="v-pills-2-tab" data-toggle="pill" href="#v-pills-2" role="tab" aria-controls="v-pills-2" aria-selected="false">Manufacturer</a>
                                    <a className="nav-link ftco-animate" id="v-pills-3-tab" data-toggle="pill" href="#v-pills-3" role="tab" aria-controls="v-pills-3" aria-selected="false">Reviews</a>
                                </div>
                            </div>
                            <div className="col-md-12 tab-wrap">
                                <div className="tab-content bg-light" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-1" role="tabpanel" aria-labelledby="day-1-tab">
                                        <div className="p-4">
                                            <h3 className="mb-4">{product.nameProduct}</h3>
                                            <p>{product.description}</p>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="v-pills-2" role="tabpanel" aria-labelledby="v-pills-day-2-tab">
                                        <div className="p-4">
                                            <h3 className="mb-4">Manufactured By {/* Thêm tên nhà sản xuất từ backend */}</h3>
                                            <p>{/* Thêm thông tin nhà sản xuất từ backend */}</p>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="v-pills-3" role="tabpanel" aria-labelledby="v-pills-day-3-tab">
                                        {/* Hiển thị đánh giá sản phẩm (chưa có dữ liệu từ backend) */}
                                        <div className="row p-4">
                                            <div className="col-md-7">
                                                <h3 className="mb-4">23 Reviews</h3>
                                                {/* Hiển thị danh sách đánh giá */}
                                            </div>
                                            <div className="col-md-4">
                                                {/* Form đánh giá sản phẩm */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;