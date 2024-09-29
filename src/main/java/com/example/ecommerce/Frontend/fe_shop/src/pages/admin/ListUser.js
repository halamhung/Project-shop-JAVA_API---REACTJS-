import React, { useEffect, useState } from 'react';
import HeaderAd from '../../components/admin/HeaderAd';
import Navbar from '../../components/admin/Navbar';
import { Button, Container, Input, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { getListUser, deleteUser, updateRoleUser } from '../../redux/ListUserSlice'; // Import actions
import FooterAd from '../../components/admin/FooterAd';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function ListUser() {
  const [currentPage, setCurrentPage] = useState(0);
  const [roleUsers, setRoleUsers] = useState({}); // Lưu trạng thái role cho từng user
  const [selectedUserId, setSelectedUserId] = useState(null); // Selected user ID for role change
  const [searchTerm, setSearchTerm] = useState(''); // Giá trị tìm kiếm
  const dispatch = useDispatch();

  const { listUser, status } = useSelector(state => state.GetListUser);

  // Lấy vai trò của người dùng đã đăng nhập từ localStorage (dạng mảng)
  const roles = JSON.parse(localStorage.getItem('roles')) || [];

  const limit = 20;

  useEffect(() => {
    dispatch(getListUser({ currentPage, limit }));
  }, [currentPage, dispatch]);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
  };

  // Xử lý thay đổi role cho user cụ thể
  const handleRoleChange = (userId, role) => {
    setRoleUsers(prevRoles => ({
      ...prevRoles,
      [userId]: role // Lưu role cho user cụ thể
    }));
  };

  // Sự kiện cập nhật role user
  const handleUpdateRole = (userId) => {
    if (roles.includes('ROLE_ADMIN')) {  // Kiểm tra nếu vai trò là ROLE_ADMIN
      const selectedRole = roleUsers[userId]; // Lấy role của user cụ thể từ state
      if (selectedRole) {
        dispatch(updateRoleUser({ id: userId, role: selectedRole })); // Gửi id và role
      } else {
        alert("Please select a role to update.");
      }
    } else {
      alert("Only admins can update user roles!");
    }
  };

  // Sự kiện xóa user
  const handleDeleteUser = (userId) => {
    if (roles.includes('ROLE_ADMIN')) {  // Kiểm tra nếu vai trò là ROLE_ADMIN
      dispatch(deleteUser(userId));
    } else {
      alert("Only admins can delete users!");
    }
  };

  useEffect(() => {
    if (status === 'updated' || status === 'deleted') {
      dispatch(getListUser({ currentPage, limit }));
    }
  }, [status, currentPage, dispatch]);

  // Lọc danh sách user dựa trên từ khóa tìm kiếm
  const filteredUsers = listUser.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.roles.some(role => role.name.toLowerCase().includes(searchTerm.toLowerCase())) // Tìm theo roles
  );

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <HeaderAd />
      <div className="content1">
        <Navbar />
        <Container>
          {/* Input tìm kiếm */}
          <Container className="mb-3">
            <Input
              placeholder='Search user'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
            />
          </Container>
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
              {filteredUsers && filteredUsers.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.userId}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.roles.map(role => role.name).join(', ')}</td>
                  <td>
                    {/* Form to update role */}
                    <FormControl fullWidth>
                      <InputLabel id={`select-role-label-${item.userId}`}>Set Role</InputLabel>
                      <Select
                        labelId={`select-role-label-${item.userId}`}
                        id={`select-role-${item.userId}`}
                        value={roleUsers[item.userId] || ''} // Lấy role từ state dựa trên userId
                        label="Role"
                        onChange={(e) => handleRoleChange(item.userId, e.target.value)} // Update role for specific user
                        disabled={!roles.includes('ROLE_ADMIN')} // Disable for non-admins
                      >
                        <MenuItem value={"ROLE_ADMIN"}>ROLE_ADMIN</MenuItem>
                        <MenuItem value={"ROLE_EMPLOYEE"}>ROLE_EMPLOYEE</MenuItem>
                        <MenuItem value={"ROLE_CUSTOMER"}>ROLE_CUSTOMER</MenuItem>
                      </Select>
                    </FormControl>
                    {/* Update role button */}
                    <Button
                      className='btn btn-success'
                      onClick={() => handleUpdateRole(item.userId)}                    
                      disabled={!roles.includes('ROLE_ADMIN')} // Disable for non-admins
                    >
                      Update Role
                    </Button>
                    {/* Delete user button */}
                    <Button
                      className='btn btn-danger'
                      onClick={() => handleDeleteUser(item.userId)}
                      disabled={!roles.includes('ROLE_ADMIN')} // Disable for non-admins
                    >
                      Delete User
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={Math.ceil(10)}
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
        <FooterAd />
      </div>
    </div>
  );
}
