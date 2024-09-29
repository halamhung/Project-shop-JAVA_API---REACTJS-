import React, { useEffect, useState } from "react";
import Footer from "../../../../components/user/Footer";
import Header from "../../../../components/user/Header";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Container,
  Input,
  Pagination,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getListProduct, getListProductbyCate } from "../../../../redux/ListProductSlice";
import {addCart, addCartAsync} from "../../../../redux/cartSlice"
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./products.css"
import SingleHeader from "../../../../components/user/SingleHeader";
import { Link } from "react-router-dom";
import {fetchCategories} from "../../../../redux/categorySlice"
export default function Product() {


  const [currentPage, setCurrentPage] = useState(0);
  const { products } = useSelector((state) => state.GetListProduct);

  // products = [...products, ]

  const {category2} = useSelector((state)=> state.category)
  console.log('category2: ', category2);


  const handle_addCart = (id) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Sản phẩm thêm vào trong giỏ hàng",
      showConfirmButton: false,
      timer: 1000,
    });
    dispatch(addCartAsync(id));
  };


  const dispatch = useDispatch();

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleCategoryClick = (categoryId) => {
    dispatch(getListProductbyCate(categoryId)); 
  };

  const limit = 6;

  useEffect(() => {
    dispatch(getListProduct({ currentPage, limit }));
  }, [currentPage, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories())
  },[dispatch])

  return (
    <>
      <Header/>
      <SingleHeader title={"Product"}/>
      <Container fluid className="py-5 fruite">
        <Container className="py-3">
          <h1 className="mb-4"><span style={{color: "#E24C6C"}}>HUB X</span> shop</h1>
          <Row className="g-4">
            <Col lg={12}>
              <Row className="g-4">
                <Col xl={3}>
                  <div className="input-group w-100 mx-auto d-flex">
                    <Input
                      type="search"
                      className="form-control p-3"
                      placeholder="keywords"
                    />
                    {/* <span id="search-icon-1" className="input-group-text p-3"><FaSearch /></span> */}
                  </div>
                </Col>
                <Col xs={7}></Col>
                <Col xl={2}>
                  <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                    <label for="fruits">Lọc:</label>
                    <select
                      id="fruits"
                      name="fruitlist"
                      className="border-0 form-select-sm bg-light me-3"
                      form="fruitform"
                    >
                      <option value="">Min - Max</option>
                      <option value="">Max - Min</option>
                      <option value="">A-Z</option>
                      <option value="">Z-A</option>
                    </select>
                  </div>
                </Col>
              </Row>
              <Row className="g-4 my-3">
                <Col lg={3}>
                  <Col lg={12}>
                    <div className="mb-3">
                      <h4>Danh mục</h4>
                       {category2 && category2.map((item,index) => (
                            <div key={index} className="my-2">
                                <button onClick={() => handleCategoryClick(item.categoryId)}>
                              <h5>{item.name}</h5>
                            </button>
                            </div>
                       ))}
                    </div>
                  </Col>
                </Col>
                <Col lg={9} className="my-5 py-5">
                  <Row className="g-4">
                    {products &&
                      products.map((item, index) => (
                        <Col lg={4} md={6} sm={12} key={index}>
                          <div className=" fruite-item">
                            <Card style={{ width: "100%" }}>
                                
                                <img alt="Sample" src={`${item.images}`} className="" />

                                <CardBody>
                                    <CardTitle tag="h5">
                                    {item.nameProduct}
                                    </CardTitle>

                                    <CardSubtitle
                                    className="mb-2 text-muted"
                                    tag="h6"
                                    >
                                    Price: {item.price}
                                    </CardSubtitle>

                                    <CardText>
                                    <div className="productRating">
                                    <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}} />
                                    <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}} />
                                    <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}} />
                                    <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}} />
                                    <FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}} />
                                    </div>
                                    </CardText>
                                    
                                    <div className="d-flex flex-row">
                                        <button class="btn1">
                                            {/* <span style={{color:"yellow"}}>Detail</span> */}
                                            <Link style={{color:"yellow"}} to={`/productdetail/${item.productId}`}>Detail</Link>
                                        </button>
                                        <button class="btn1" onClick={() => handle_addCart(item.productId)}>
                                            <span style={{color:"yellow"}}>Add Cart</span>
                                        </button>
                                    </div>
                                </CardBody>

                            </Card>
                          </div>
                        </Col>
                      ))}
                  </Row>

                  {/* Pagination */}
                  <div className="mt-5 d-flex justify-content-center">
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil(10)}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    nextClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                  />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );
}
