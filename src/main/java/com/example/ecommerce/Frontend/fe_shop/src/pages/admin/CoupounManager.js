import React, { useEffect, useState } from 'react'
import HeaderAd from '../../components/admin/HeaderAd'
import FooterAd from '../../components/admin/FooterAd'
import { Button, Input, Table } from 'reactstrap'
import Navbar from '../../components/admin/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import {getAllCoupon, updateCoupon, addCoupoun, deleteCoupon} from "../../redux/couponSlice"
import ReactPaginate from 'react-paginate'


export default function CategoryManager() {

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0)

  const [baseCoupon, SetBaseCoupon] = useState({
    name : "",
  })

  const { coupouns, totalPage, message, error, status} = useSelector(state => state.coupon);


  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
  }

  const limit = 2;




const handleUpdateCoupoun = (couponId) => {
   
};

const handleDeleteCoupoun = (couponId) => {
  dispatch(deleteCoupon(couponId))
}


  useEffect(() => {
    dispatch(getAllCoupon({currentPage, limit}))
  }, [currentPage])

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
                  <th>id</th>
                  <th>Coupoun Name</th>
                  <th>Coupoun Description</th>
                  <th>Coupoun Status</th>
                  <th>discountPercentage</th>
                  <th>expirationDate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {coupouns && coupouns.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>{item.discountPercentage}</td>
                  <td>{item.expirationDate}</td>
                  <td>
                    <Button
                      className='btn btn-success me-2'
                      // onClick={() => handleUpdateRole(item.userId)}                    
                    >
                      Update coupouns
                    </Button>
                    {/* Delete user button */}
                    <Button
                      className='btn btn-danger'
                      onClick={() => handleDeleteCoupoun(item.id)}
                    >
                      Delete coupouns
                    </Button>
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
            pageCount={Math.ceil(10)}  // replace with total pages from your data
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
          />
        </div>
        <FooterAd />
      </div>
    </div>
  );
}
                        
