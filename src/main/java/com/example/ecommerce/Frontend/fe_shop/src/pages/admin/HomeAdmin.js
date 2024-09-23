import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import "./admin.css"
import FooterAd from '../../components/admin/FooterAd'
import HeaderAd from '../../components/admin/HeaderAd'

export default function HomeAdmin() {
    return (
        <>
            <div className="container-fluid position-relative d-flex p-0">
                {/* Sidebar Start */}
                <div className="sidebar pe-4 pb-3">
                    <nav className="navbar bg-secondary navbar-dark">
                        <a href="index.html" className="navbar-brand mx-4 mb-3">
                            <h3 className="text-primary">
                                <i className="fa fa-user-edit me-2" />
                                DarkPan
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
                            <a href="index.html" className="nav-item nav-link active">
                                <i className="fa fa-tachometer-alt me-2" />
                                Dashboard
                            </a>

                            <a href="widget.html" className="nav-item nav-link">
                                <i className="fa fa-th me-2" />
                                Widgets
                            </a>

                        </div>
                    </nav>
                </div>
                {/* Sidebar End */}
                {/* Content Start */}
                <div className="content">
                    {/* Navbar Start */}
                    <HeaderAd />
                    {/* Navbar End */}
                    {/* Sale & Revenue Start */}
                    <div className="container-fluid pt-4 px-4">
                        <div className="row g-4">
                            <div className="col-sm-6 col-xl-3">
                                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                    <i className="fa fa-chart-line fa-3x text-primary" />
                                    <div className="ms-3">
                                        <p className="mb-2">Today Sale</p>
                                        <h6 className="mb-0">$1234</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                    <i className="fa fa-chart-bar fa-3x text-primary" />
                                    <div className="ms-3">
                                        <p className="mb-2">Total Sale</p>
                                        <h6 className="mb-0">$1234</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                    <i className="fa fa-chart-area fa-3x text-primary" />
                                    <div className="ms-3">
                                        <p className="mb-2">Today Revenue</p>
                                        <h6 className="mb-0">$1234</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                    <i className="fa fa-chart-pie fa-3x text-primary" />
                                    <div className="ms-3">
                                        <p className="mb-2">Total Revenue</p>
                                        <h6 className="mb-0">$1234</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Sale & Revenue End */}


                    {/* Footer Start */}
                    <FooterAd />
                    {/* Footer End */}
                </div>
            </div>
        </>
    )
}
