import React, { useEffect, useState } from 'react'
import Header from '../../../../components/user/Header'
import Footer from '../../../../components/user/Footer'
import SingleHeader from '../../../../components/user/SingleHeader'
import "./detailpro.css"
import banner from './banner1.jpg';
import { Button, Col, Container, Input, InputGroup, Row } from 'reactstrap'
import { useParams } from 'react-router-dom'
import { getImageID_2, getProductByID } from '../../../../redux/ListProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import { addCartAsync } from '../../../../redux/cartSlice'
import Swal from 'sweetalert2'
import {fetchCategories} from "../../../../redux/categorySlice"
export default function ProductDetailUser() {
    const title = "Chi tiết sản phẩm"
    const [quantity, setQuantity] = useState(1);
    const changeQty = (flag) => {
        if (flag) {
            setQuantity(quantity + 1);
        } else {
            if (quantity > 1) {
                setQuantity(quantity - 1);
            }
        }
    }
    const { id } = useParams();
   
    const { productDetail } = useSelector(state => state.GetListProduct)
    const dispatch = useDispatch()

    const {category2} = useSelector((state)=> state.category)
    console.log('category2: ', category2);

    const [img, setImg] = useState(null);

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

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imgData = await getImageID_2(id);
        console.log('Image data: ', imgData); // For debugging
        setImg(imgData); // Set the image URL into the state
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    // Fetch the product data and image
    dispatch(getProductByID(id));
    fetchImage();
  }, [dispatch, id]);
    console.log(productDetail)

    useEffect(() => {
        dispatch(fetchCategories())
      },[dispatch])

    return (
        <>
            <Header />
            <SingleHeader title={title} />
            <Container fluid className=" py-5 mt-5">
                <Container className=" py-5">
                    <Row className=" g-4 mb-5">
                        <Col lg={8} xl={9} >
                            <Row className="g-4">
                                <Col lg={6} md={12} sm={12}>
                                    <div className="">
                                        <a href="#">
                                            <img src={img} className="img-fluid rounded" />
                                        </a>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <h4 className="fw-bold mb-3">{productDetail.nameProduct} </h4>
                                    {/* <p className="mb-3">{productDetail.category.categoryId}</p> */}
                                    <h5 className="fw-bold mb-3">{productDetail.price} đ</h5>
                                    <p className="mb-4">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.</p>
                                    <p className="mb-4">Susp endisse ultricies nisi vel quam suscipit. Sabertooth peacock flounder; chain pickerel hatchetfish, pencilfish snailfish</p>
                                    {/* <InputGroup className="quantity mb-5">
                                        <Button className="rounded-circle btnQty " onClick={() => changeQty(false)}>
                                            -
                                        </Button>
                                        <Input
                                            type="text"
                                            className="form-control form-control-sm text-center border-0"
                                            value={quantity}
                                            readOnly
                                        />
                                        <Button className="rounded-circle btnQty " onClick={() => changeQty(true)}>
                                            +
                                        </Button>
                                    </InputGroup> */}
                                    <button class="btn1" onClick={() => handle_addCart(productDetail.productId)}>
                                            <span style={{color:"yellow"}}>Add Cart</span>
                                        </button>
                                </Col>
                                <Col lg={12}>
                                    <div>
                                        <h3>Description</h3>
                                    </div>
                                    <div class="tab-content mb-5">
                                        <div class="tab-pane active" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                            <p>description</p>
                                            <div class="px-2">
                                                <div class="row g-4">
                                                    <div class="col-6">
                                                        <div class="row bg-light align-items-center text-center justify-content-center py-2">
                                                            <div class="col-6">
                                                                <p class="mb-0">CPU	</p>
                                                            </div>
                                                            <div class="col-6">
                                                                <p class="mb-0">Intel Core i7-13620H (3.6GHz~4.9GHz) 10 Cores 16 Threads</p>
                                                            </div>
                                                        </div>
                                                        <div class="row text-center align-items-center justify-content-center py-2">
                                                            <div class="col-6">
                                                                <p class="mb-0">RAM</p>
                                                            </div>
                                                            <div class="col-6">
                                                                <p class="mb-0">8GB (1 x 8GB) DDR5 5200MHz (2x SO-DIMM socket, up to 64GB SDRAM)</p>
                                                            </div>
                                                        </div>
                                                        <div class="row bg-light text-center align-items-center justify-content-center py-2">
                                                            <div class="col-6">
                                                                <p class="mb-0">Ổ cứng	</p>
                                                            </div>
                                                            <div class="col-6">
                                                                <p class="mb-0">512GB NVMe PCIe Gen 4 SSD (2 slots, Nâng cấp cần gắn thêm linh kiện tại TTBH MSI)</p>
                                                            </div>
                                                        </div>
                                                        <div class="row text-center align-items-center justify-content-center py-2">
                                                            <div class="col-6">
                                                                <p class="mb-0">VGA	 </p>
                                                            </div>
                                                            <div class="col-6">
                                                                <p class="mb-0">NVIDIA GeForce RTX 4050 Laptop GPU 6GB GDDR6</p>
                                                            </div>
                                                        </div>
                                                        <div class="row bg-light text-center align-items-center justify-content-center py-2">
                                                            <div class="col-6">
                                                                <p class="mb-0">Màn hình</p>
                                                            </div>
                                                            <div class="col-6">
                                                                <p class="mb-0">15.6" FHD (1920x1080), 144Hz, IPS-Level</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Col>

                            </Row>
                        </Col>
                        <Col lg={4} xl={3}>
                            {/* category */}
                            <Col lg={12}>
                                <div className="mb-3">
                                    <h4 className='fw-bold '>Danh mục</h4>
                                    <ul className="list-unstyled fruite-categorie">                              
                                        {category2 && category2.map((item,index) => (
                                            <div key={index} className="my-2">
                                                  <li>
                                                    <div className="d-flex justify-content-between fruite-name">
                                                        <a href="#">{item.name}</a>
                                                        <span>(5)</span>
                                                    </div>
                                                 </li>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            </Col>
                            {/* discount */}
                            {/* <Col lg={12}>
                                <div className="mb-3">
                                    <h4 className='fw-bold '>Khuyến mãi</h4 >
                                    <div class="d-flex align-items-center justify-content-start">
                                        <div class="banner rounded me-4" style={{ width: 100, height: 100 }}>
                                            <img src={banner} class="img-fluid rounded" alt="" />
                                        </div>
                                        <div>
                                            <h6 class="mb-2">Name</h6>
                                            <div class="d-flex mb-2">
                                                    <i class="fa fa-star text-secondary"></i>
                                                    <i class="fa fa-star text-secondary"></i>
                                                    <i class="fa fa-star text-secondary"></i>
                                                    <i class="fa fa-star text-secondary"></i>
                                                    <i class="fa fa-star"></i>
                                                </div>
                                            <div class="d-flex mb-2">
                                                <h5 class="fw-bold me-2">2.99 $</h5>
                                                <h5 class="text-danger text-decoration-line-through">4.11 $</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col> */}
                            {/* Banner */}
                            <Col lg={12}>
                                <div className="position-relative ">
                                    <h4 className="fw-bold mt-5 ">Banner</h4>
                                    <img src={banner} className="img-fluid w-100 rounded" alt="" />
                                    <div className="banner">
                                        <p>Hub-X</p>
                                        <p>Flatform</p>
                                        <p>Banner</p>
                                    </div>
                                </div>
                            </Col>
                        </Col>

                    </Row>
                    {/* <h1 class="fw-bold mb-0">Mùa này kó</h1> */}
                    {/* <Slider2 arr={arr} /> */}
                </Container>
            </Container>
            <Footer />
        </>
    )
}
