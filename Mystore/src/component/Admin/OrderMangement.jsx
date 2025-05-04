import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FetchOrder, UpdateOrder } from '../../redux/slices/AdminOrdersSlice';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useSelector((state) => state.adminOrders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (user.role !== 'admin') {
        navigate('/');
      } else {
        dispatch(FetchOrder());
      }
    }
  }, [user, navigate, dispatch]);

  const HandleStatus = (orderId, status) => {
    dispatch(UpdateOrder({ id: orderId, status }));
  };

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h2 className='text-3xl font-bold mb-6'>Order Management</h2>

      {loading && <p className="text-blue-500 mb-4">Loading orders...</p>}
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}

      <div className='overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='min-w-full text-left text-gray-500'>
          <thead className='bg-gray-100 text-xs uppercase text-gray-600'>
            <tr>
              <th className='py-3 px-4'>Order Id</th>
              <th className='py-3 px-4'>Customer</th>
              <th className='py-3 px-4'>Total Price</th>
              <th className='py-3 px-4'>Status</th>
              <th className='py-3 px-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((item) => (
                <tr key={item?._id} className='border-b bg-gray-50 hover:bg-gray-100 cursor-pointer'>
                  <td className='p-4 font-medium whitespace-nowrap text-gray-700'>#{item._id}</td>
                  <td className='p-4'>{item.name}</td>
                  <td className='p-4'>${item.totalPrice}</td>
                  <td className='p-4'>
                    <select
                      value={item.status}
                      onChange={(e) => HandleStatus(item._id, e.target.value)}
                      className='bg-gray-50 border border-gray-400 text-gray-700 text-sm rounded-lg block p-2.5'
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className='p-4'>
                    <button
                      onClick={() => HandleStatus(item._id, "Delivered")}
                      className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50'
                      disabled={item.status === "Delivered"}
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className='p-4 text-center text-cyan-500 text-xl'>
                  No Orders Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
