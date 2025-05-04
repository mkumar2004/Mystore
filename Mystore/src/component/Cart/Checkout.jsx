import React, { useEffect, useState } from 'react';
import Paypalbutton from '../../Api/Paypalbutton';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCheckout } from '../../redux/slices/CheckoutSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((action) => action.auth);
  const { cart, loading, error } = useSelector((state) => state.cart);
  const [checkoutId, setCheckoutID] = useState(null);
  const [ShippingAddress, setShippingAddress] = useState({
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate('/');
    }
  }, [cart, navigate]);

  const handleCheckout = async(e) => {
    e.preventDefault();

    if (cart && cart.products.length > 0) {
      try {
        const response = await dispatch(
          createCheckout({
            user:user,
            checkout: cart.products,
            ShippingAddress,
            paymentMethod: 'Racerpay',
            totalPrice: cart.totalPrice,
          })
        );

      
        if (response.payload && response.payload._id) {
          setCheckoutID(response.payload._id); // Saving the checkout ID on successful checkout
        }
      } catch (err) {
        console.error('Checkout failed:', err);
      }
    }
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-7 tracking-tighter border-0 shadow-md">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full p-2 border border-gray-500 rounded shadow"
            />
          </div>

          <h3 className="text-lg text-gray-700 mb-4">Delivery</h3>

          <div className="mb-4 grid grid-cols-2 gap-4">
            {/* First name */}
            <div>
              <label className="block text-gray-700">First name</label>
              <input
                type="text"
                value={ShippingAddress.firstname}
                onChange={(e) =>
                  setShippingAddress({
                    ...ShippingAddress,
                    firstname: e.target.value,
                  })
                }
                required
                className="w-full p-2 border border-gray-500 rounded shadow"
              />
            </div>
            {/* Last name */}
            <div>
              <label className="block text-gray-700">Last name</label>
              <input
                type="text"
                value={ShippingAddress.lastname}
                onChange={(e) =>
                  setShippingAddress({
                    ...ShippingAddress,
                    lastname: e.target.value,
                  })
                }
                required
                className="w-full p-2 border border-gray-500 rounded shadow"
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={ShippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...ShippingAddress,
                  address: e.target.value,
                })
              }
              required
              className="w-full p-2 border border-gray-500 rounded shadow"
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            {/* City */}
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={ShippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...ShippingAddress,
                    city: e.target.value,
                  })
                }
                required
                className="w-full p-2 border border-gray-500 rounded shadow"
              />
            </div>
            {/* Postal Code */}
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                value={ShippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...ShippingAddress,
                    postalCode: e.target.value,
                  })
                }
                required
                className="w-full p-2 border border-gray-500 rounded shadow"
              />
            </div>
          </div>

          {/* Country */}
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              value={ShippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...ShippingAddress,
                  country: e.target.value,
                })
              }
              required
              className="w-full p-2 border border-gray-500 rounded shadow"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={ShippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...ShippingAddress,
                  phone: e.target.value,
                })
              }
              required
              className="w-full p-2 border border-gray-500 rounded shadow"
            />
          </div>

          {/* Checkout Process */}
          <div className="mt-7">
            {!checkoutId ? (
              <button type="submit" className="bg-black w-full text-white py-3 rounded" >
                Continue to Payment
              </button>
            ) : (
              <div className="mb-4 text-lg">
                <h3 className="bg-violet-800 py-3 rounded-lg text-amber-50 text-center mb-2">
                  Pay With RacerPay
                </h3>

                <Paypalbutton amount={cart.totalPrice} checkoutId={checkoutId} />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="bg-rose-100 p-6 rounded-lg">
        <h3 className="mb-4 text-lg">Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-amber-100">
              <div className="flex items-start">
                <img src={product.image} alt={product.name} className="h-24 w-20 rounded-lg object-cover mr-4" />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p>${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>

        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>

        <div className="flex justify-between items-center text-lg mt-2">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;