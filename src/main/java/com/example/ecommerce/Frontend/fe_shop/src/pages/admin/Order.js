import React from 'react'
import HeaderAd from '../../components/admin/HeaderAd'
import FooterAd from '../../components/admin/FooterAd'
import { Table } from 'reactstrap'
import Navbar from '../../components/admin/Navbar'

export default function Order() {
    return (
        <div className="container-xxl position-relative bg-white d-flex p-0">
            <HeaderAd />
            <div className="content">
                {/* Navbar Start */}
                <Navbar />
                {/* Navbar End */}
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        First Name
                                    </th>
                                    <th>
                                        Last Name
                                    </th>
                                    <th>
                                        Username
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        1
                                    </th>
                                    <td>
                                        Mark
                                    </td>
                                    <td>
                                        Otto
                                    </td>
                                    <td>
                                        @mdo
                                    </td>
                                </tr>

                            </tbody>
                        </Table>
                    </div>
                </div>
                {/* Footer Start */}
                <FooterAd />
                {/* Footer End */}
            </div>
        </div>
    )
}
