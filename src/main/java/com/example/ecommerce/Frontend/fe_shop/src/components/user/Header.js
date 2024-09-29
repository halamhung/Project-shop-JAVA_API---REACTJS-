import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Collapse, Container, DropdownToggle, Input, Nav, Navbar, NavbarToggler, NavItem,  UncontrolledDropdown } from 'reactstrap'
import "./header.css"
import { useSelector } from 'react-redux'
import logo from '../../imgs/logoRemoveSlogan.png'

export default function Header() {

    const { carts } = useSelector((state) => state.carts || { carts: [] });

    const [isShadow, setIsShadow] = useState(false);
    const [topOffset, setTopOffset] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    useEffect(() => {
        const handleScroll = () => {
            const width = window.innerWidth;
            const scrollTop = window.scrollY;

            if (width < 990) {
                setTopOffset(0)
                if (scrollTop > 60) {
                    setIsShadow(true);
                } else {
                    setIsShadow(false);
                }
            } else {
                if (scrollTop > 60) {
                    setIsShadow(true);
                    setTopOffset(-60);
                } else {
                    setIsShadow(false);
                    setTopOffset(0);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setTopOffset]);

    // const info = JSON.parse(localStorage.getItem("login"))
    return (
        <>
            <Container className={`fixed-top ${isShadow ? 'shadow ' : ''}`} style={{ top: topOffset, }} fluid>

                <Container className="topbar  d-none d-lg-block">
                    <div className="d-flex justify-content-between">
                        <div className="top-info ps-2">
                            <small className="me-3"> <a href='/' className="text-white">123 Hai Bà Trưng, TP. HCM</a></small>
                            <small className="me-3"><a href='/' className="text-white"> mouseloverices@Example.com</a></small>
                        </div>
                        <div className="top-link pe-2">
                            <a href="/" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
                            <a href="/" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
                            <a href="/" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
                        </div>
                    </div>
                </Container>

                <Container className=' px-0'>
                    <Navbar className='navbar navbar-expand-xl'  style={{display:"flex", alignItems:"end"}}>
                        <div style={{width:"60px", height:"60px", display:"flex", alignItems:"center"}}>
                            <img src={logo} alt="logo" />
                        </div>
                        <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar className="d-flex align-items-center ">
                            <Nav className="m-auto" navbar >
                                <NavItem>
                                    <Link className='nav-link' to={"/"}>Home</Link>
                                </NavItem>
                                <NavItem>
                                    <Link className='nav-link' to={"/product"}>
                                        Product
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to={"/contact"} className='nav-link'>
                                        Contact
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link to={"/"} className='nav-link'>
                                        News
                                    </Link>
                                </NavItem>
                            </Nav>
                            <Nav className="m-auto d-flex align-items-center" navar>
                                <NavItem className='d-flex justify-content-center me-1'>
                                    <Input placeholder='Tìm kiếm' className='rounded-5 w-100 '
                                    // value={keyword} onChange={(e) => setKeyword(e.target.value)}
                                    // onKeyDown={(e) => {
                                    //     if (e.key == "Enter") {
                                    //         if (keyword == "") {
                                    //             dispatch(fetchProducts(currentPage))
                                    //             // navigate('/product')
                                    //         } else {
                                    //             handle_search()
                                    //         }
                                    //     }
                                    // }}
                                    />
                                    {/* <Button className="btn-search btn border border-success btn-md-square rounded-circle bg-white ">
                        <FaSearch className='my-auto iconR' size={18} />
                    </Button> */}
                                </NavItem>

                                <UncontrolledDropdown nav inNavbar >
                                    <DropdownToggle nav caret className='drop-down' >
                                        <Link className="ms-5 my-auto userIcon"><i className="fa-solid fa-user"></i></Link>
                                    </DropdownToggle>
                                    {/* <DropdownMenu right>
                                        {
                                            info ?
                                                <>
                                                    <DropdownItem><NavLink className={"drop-down-link"}>Hello, {info.name}</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink to={"*"} className={"drop-down-link"}>Thông tin user</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink onClick={handle_logout} className={"drop-down-link"}>Đăng xuất</NavLink></DropdownItem>
                                                </>
                                                :
                                                <>
                                                    <DropdownItem><NavLink to={"/login"} className={"drop-down-link "}>Đăng nhập</NavLink></DropdownItem>
                                                    <DropdownItem><NavLink to={"/sign-up"} className={"drop-down-link"}>Đăng ký</NavLink></DropdownItem>
                                                </>
                                        }
                                    </DropdownMenu> */}
                                   
                                </UncontrolledDropdown>

                                <NavItem>
                                    <div className='shopping-cart me-5 '>
                                        <Link to={"/cart"} className="position-relative"><i className="fa-brands fa-shopify"></i></Link>
                                        {carts.length !== 0 ? (
                                        <div className="position-absolute itemCurrent text-center">
                                            {carts.length}
                                        </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Container>

            </Container>
        </>
    )
}
