import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/slices/CartSlice';

const OrderConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate('/my-order');
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDate = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl text-emerald-700 text-center mb-8 font-bold">
        Thank You For Your Order!
      </h1>

      {checkout && (
        <div className="p-6 rounded-lg border-4 border-gray-200 shadow-md">
          <div className="flex justify-between mb-12">
            <div>
              <h2 className="text-xl font-semibold">Order Id: {checkout._id}</h2>
              <p className="text-gray-700">
                Order Date: {new Date(checkout.createdAt).toDateString()}
              </p>
            </div>
            <div>
              <p className="text-emerald-700 text-sm -mr-4">
                Estimated Delivery: {calculateEstimatedDate(checkout.createdAt)}
              </p>
            </div>
          </div>

          {/* Order items */}
          {checkout.checkout?.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                className="h-16 w-16 mr-4 object-cover rounded-lg"
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
              <div>
                <p className="text-md font-semibold">{item.name}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-md font-semibold text-blue-500">Price: ${item.price *item.quantity }</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}

          {/* Payment Info */}
          <div className="grid grid-cols-2 gap-4 mt-10 ml-20">
            <div>
              <h4 className="text-lg text-blue-700 font-semibold mb-2">Payment</h4>
              <p className="text-blue-500">{checkout.paymentMethod}</p>
            </div>
            <div>
              <h4 className="text-lg text-blue-700 font-semibold mb-2">Delivery</h4>
              <p className="text-blue-700">{checkout.ShippingAddress?.address}</p>
              <p className="text-blue-700">{checkout.ShippingAddress?.city}</p>
              <p className="text-blue-700">{checkout.ShippingAddress?.country}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirm;
