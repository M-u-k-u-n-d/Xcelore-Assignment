import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const response = await axios.get(import.meta.env.VITE_APP_BACKEND_URL+'/admin', {
          headers: {
            Authorization: token,
            role: role
          }
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleUpdate = (userId) => {
    localStorage.setItem('userId', userId);
    navigate('/fupdate');
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      await axios.delete(`http://localhost:5000/admin/${userId}`, {
        headers: {
          Authorization: token,
          role: role
        }
      });
      setModalMessage(`User with ID ${userId} was successfully deleted.`);
      setShowModal(true);
      setUsers(users.filter(user => user._id !== userId)); // Update the users state
    } catch (error) {
      console.error('Error deleting user:', error);
      setModalMessage(`Failed to delete user with ID ${userId}.`);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <div className='flex justify-end pb-4'>
      <TextField
        label="Search"
        variant="outlined"
       
        value={searchQuery}
        onChange={handleSearchChange}
       
      />
      </div>
      <div>
      <table className="min-w-full divide-y divide-gray-200 table-auto border-2">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.firstname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.lastname}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Button
                  onClick={() => handleUpdate(user._id)}
                  sx={{ mr: 2 }}
                >
                  Update
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {showModal && (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={showModal}
          onClose={handleCloseModal}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <ModalClose variant="plain" onClick={handleCloseModal} sx={{ m: 1 }} />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              Modal Message
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              {modalMessage}
            </Typography>
          </Sheet>
        </Modal>
      )}
    </div>
  );
};

export default GetUsers;
