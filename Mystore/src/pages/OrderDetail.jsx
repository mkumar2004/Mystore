import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchOrderDetails } from '../redux/slices/OrderSlice';
import { useParams, Link } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();

  const { orderDetails, loading, error } = useSelector((state) => state.orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchOrderDetails(id));
  }, [dispatch, id]);

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
      <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>
      {!orderDetails ? (
        <div className='border border-gray-300 shadow-md py-6'>
          <p className='text-center text-xl font-semibold text-yellow-500'>No order details found!</p>
        </div>
      ) : (
        <div className='p-4 sm:p-6 rounded-lg border border-gray-300 shadow-md'>
          {/* Order info */}
          <div className='flex flex-col sm:flex-row justify-between mb-8'>
            <div>
              <h3 className='text-lg md:text-xl font-semibold text-cyan-900'>Order Id : #{orderDetails._id}</h3>
              <p className='text-gray-600 mb-2'>{new Date(orderDetails.createdAt).toDateString()}</p>
            </div>
            <div className='flex flex-col items-start sm:items-end mt-0'>
              <span
                className={`${orderDetails.isPaid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} px-3 py-1 rounded-lg text-sm font-medium mb-2`}
              >
                {orderDetails.isPaid ? 'Approved' : 'Pending'}
              </span>
              <span
                className={`${orderDetails.isDelivered ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'} px-3 py-1 rounded-lg text-sm font-medium mb-2`}
              >
                {orderDetails.isDelivered ? 'Delivered' : 'Pending'}
              </span>
            </div>
          </div>

          {/* Customer payment info */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
            <div>
              <h3 className='font-semibold text-lg mb-2'>Payment Info</h3>
              <p className='text-blue-600'>Payment Method: {orderDetails.paymentMethod}</p>
              <p className='text-blue-600'>Status: {orderDetails.isPaid ? 'Paid' : 'Unpaid'}</p>
            </div>
            <div>
              <h3 className='font-semibold text-lg mb-2'>Shipping Info</h3>
              <p className='text-blue-600'>Shipping Method: {orderDetails.shippingMethod}</p>
              <p className='text-blue-600'>
                Address: {`${orderDetails. ShippingAddress.city}, ${orderDetails. ShippingAddress.country}`}
              </p>
            </div>
          </div>

          {/* Products */}
          <div className='overflow-x-auto'>
            <h4 className='text-lg font-semibold mb-4'>Products</h4>
            <table className='min-w-full text-gray-600 mb-4'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='py-2 px-4'>Name</th>
                  <th className='py-2 px-4'>Unit Price</th>
                  <th className='py-2 px-4'>Quantity</th>
                  <th className='py-2 px-4'>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.Orderitems.map((item) => (
                  <tr key={item.productId} className='border-b border-gray-100'>
                    <td className='py-2 px-4 flex items-center'>
                      <img src={item.image} alt={item.name} className='h-12 w-12 object-cover mr-4 rounded-lg' />
                      <Link to={`/product/${item.productId}`} className='text-blue-500 hover:underline'>
                        {item.name}
                      </Link>
                    </td>
                    <td className='py-2 px-4'>${item.price}</td>
                    <td className='py-2 px-4'>{item.quantity}</td>
                    <td className='py-2 px-4'>${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Back to orders page */}
          <Link to='/my-order' className='text-blue-500 hover:underline'>
            Back to My Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;

