import React, { useEffect, useState } from 'react'
import HeaderAd from '../../components/admin/HeaderAd'
import FooterAd from '../../components/admin/FooterAd'
import { Button, Input, Table } from 'reactstrap'
import Navbar from '../../components/admin/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import {getAllCategory, updateCategory, addCategory, deleteCategory} from "../../redux/categorySlice"
import ReactPaginate from 'react-paginate'


export default function CategoryManager() {

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0)

  const [baseCate, setBaseCate] = useState({
    name : "",
  })

  const { category, totalPage, message, error, status} = useSelector(state => state.category);


  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
  }

  const limit = 4;




const handleUpdateCategory = (categoryId) => {
    setBaseCate()
};

const handleDeleteUser = (categoryId) => {
  dispatch(deleteCategory(categoryId))
}


  useEffect(() => {
    dispatch(getAllCategory({currentPage, limit}))
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
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
              {category && category.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <Button
                      className='btn btn-success me-2'
                      // onClick={() => handleUpdateRole(item.userId)}                    
                    >
                      Update Category
                    </Button>
                    {/* Delete user button */}
                    <Button
                      className='btn btn-danger'
                      onClick={() => handleDeleteUser(item.id)}
                    >
                      Delete Category
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
            pageCount={totalPage}  // replace with total pages from your data
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
                        
