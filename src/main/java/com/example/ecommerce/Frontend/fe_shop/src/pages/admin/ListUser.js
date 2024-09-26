import React, { useEffect, useState } from 'react'
import HeaderAd from '../../components/admin/HeaderAd'
import Navbar from '../../components/admin/Navbar'
import { Container, Table } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { getListUser } from '../../redux/ListUserSlice';

export default function ListUser() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useDispatch();
  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  }

  const { listUser } = useSelector(state => state.GetListUser)
  const limit = 20;

  useEffect(() => {
    dispatch(getListUser({ currentPage, limit }));
}, [currentPage, dispatch]);

  return (
    <div>
      <HeaderAd />
      <Navbar />

      <Container>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Tên account</th>
              <th>Địa chỉ</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
              listUser&&listUser.map((item,index)=>{
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.role}</td>
                    <td></td>
                  </tr>
              })
            }
        </tbody>


        </Table>
        <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
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
        />           
      </Container>
    </div>
  )
}
