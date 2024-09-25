import React from 'react'
import { Link } from 'react-router-dom'

export default function HeaderAd() {
    return (
        <>
            {/* Sidebar Start */}
            < div className="sidebar pe-4 pb-3" >
                <nav className="navbar bg-light navbar-light">
                    <a href="index.html" className="navbar-brand mx-4 mb-3">
                        <h3 className="text-primary">
                            <i className="fa fa-hashtag me-2" />
                            DASHMIN
                        </h3>
                    </a>
                    <div className="d-flex align-items-center ms-4 mb-4">
                        <div className="position-relative">
                            <img
                                className="rounded-circle"
                                src="img/user.jpg"
                                alt=""
                                style={{ width: 40, height: 40 }}
                            />
                            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
                        </div>
                        <div className="ms-3">
                            <h6 className="mb-0">Jhon Doe</h6>
                            <span>Admin</span>
                        </div>
                    </div>
                    <div className="navbar-nav w-100">

                        <Link to={"/admin-order"} className='nav-link'>
                            <i class="fa fa-table me-2"></i>Order
                        </Link>
                        <Link to={"/admin-order"} className='nav-link'>
                            <i class="fa fa-table me-2"></i>Order
                        </Link>
                        <Link to={"/admin-order"} className='nav-link'>
                            <i class="fa fa-table me-2"></i>Order
                        </Link>
                        <Link to={"/admin-order"} className='nav-link'>
                            <i class="fa fa-table me-2"></i>Order
                        </Link>
                        <Link to={"/admin-order"} className='nav-link'>
                            <i class="fa fa-table me-2"></i>Order
                        </Link>
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i class="far fa-file-alt me-2"></i>Pages</a>
                            <div class="dropdown-menu bg-transparent border-0">
                                <a href="signin.html" class="dropdown-item">Sign In</a>
                                <a href="signup.html" class="dropdown-item">Sign Up</a>
                                <a href="404.html" class="dropdown-item">404 Error</a>
                                <a href="blank.html" class="dropdown-item">Blank Page</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div >
        </>
    )
}
