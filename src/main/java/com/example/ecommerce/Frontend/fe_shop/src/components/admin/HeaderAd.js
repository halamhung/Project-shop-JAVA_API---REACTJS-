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
                            HUBX-Flatform
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
                            <h6 className="mb-0">John Doe</h6>
                            <span>Admin</span>
                        </div>
                    </div>
                    <div className="navbar-nav w-100">

                        <Link to={"/admin-order"} className='nav-link'>
                            <i className="fa fa-table me-2"></i>Order
                        </Link>

                        <Link to={"/admin/product"} className='nav-link'>
                            <i className="fa fa-table me-2"></i>Product
                        </Link>

                        <Link to={"/listUser"} className='nav-link'>
                            <i className="fa fa-table me-2"></i>List User
                        </Link>


                        <Link to = {"/admin/category"} className='nav-link'>
                            <i className="fa-solid fa-list me-2"></i>Category
                        </Link>

                        <Link to = {"/admin/coupoun"} class='nav-link'>
                            <i className="fa-solid fa-ticket me-2"></i>
                            Coupoun
                        </Link>

                    </div>
                </nav>
            </div >
        </>
    )
}
