import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AddUser,
  DeteleUser,
  UpdateUserInfo,
  FetchUser,
} from '../../redux/slices/AdminSlice';

const Usermangement = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);
 // console.log(users);
  useEffect(() => {
    if (user) {
      if (user.role !== 'admin') {
        navigate('/');
      } else {
        dispatch(FetchUser());
      }
    }
  }, [user, navigate, dispatch]);

  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer', // default
  });

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddUser(formdata)).then(() => dispatch(FetchUser()));

    // reset form
    setFormdata({
      name: '',
      email: '',
      password: '',
      role: 'customer',
    });
  };

  const handleRolechange = (userid, newrole) => {
    dispatch(UpdateUserInfo({ id: userid, role: newrole }));
  };

  const handleDelectUser = (userid) => {
    if (window.confirm('Are you sure want to delete?')) {
      dispatch(DeteleUser({ id: userid }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-xl text-red-600">Error loading users: {error}</p>}

      {/* Add New User */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add new User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formdata.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formdata.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              value={formdata.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-400 px-4 py-2 text-white rounded hover:bg-green-500"
          >
            Add User
          </button>
        </form>
      </div>

      {/* User List */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-600">
          <thead className="bg-gray-200 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-100 cursor-pointer">
                  <td className="p-4 whitespace-nowrap">{item?.name}</td>
                  <td className="p-4">{item?.email}</td>
                  <td className="p-4">
                    <select
                      value={item.role}
                      onChange={(e) => handleRolechange(item?._id, e.target.value)}
                      className="p-2 border rounded"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDelectUser(item?._id)}
                      className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-cyan-500 text-xl">
                  No User Details found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usermangement;
